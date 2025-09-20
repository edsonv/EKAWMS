import express from "express";
import { Client } from "../models/client";
import { Vehicle } from "../models/vehicle";

export const quick = express.Router();

quick.post("/create/client-vehicle", async (req, res) => {
  try {
    const { client, vehicle } = req.body || {};
    if (!client?.name || !vehicle?.plate) {
      return res
        .status(400)
        .json({ ok: false, error: "Faltan campos obligatorios" });
    }

    // 1) Cliente (find or create)
    const phone0 = (client.phones?.[0] || "").trim();
    const findClient = phone0
      ? { name: client.name.trim(), phones: { $in: [phone0] } }
      : { name: client.name.trim() };
    let cli = await Client.findOne(findClient);
    if (!cli) {
      cli = await Client.create({
        name: client.name.trim(),
        phones: client.phones || [],
      });
    }

    // 2) Vehículo (placa única)
    const veh = await Vehicle.create({
      clientId: cli._id,
      plate: vehicle.plate.trim(),
      brand: vehicle.brand || null,
      model: vehicle.model || null,
      year: vehicle.year || null,
    });

    // 3) Cache ligero (best-effort)
    await Client.updateOne(
      { _id: cli._id, "vehicles.vehicleId": { $ne: veh._id } },
      {
        $push: {
          vehicles: {
            vehicleId: veh._id,
            plate: veh.plate,
            model: veh.model,
            year: veh.year,
          },
        },
      },
    );

    return res.json({ ok: true, client: cli, vehicle: veh });
  } catch (e: any) {
    if (e?.code === 11000) {
      return res
        .status(409)
        .json({ ok: false, error: "Placa duplicada (índice único)" });
    }
    return res
      .status(500)
      .json({ ok: false, error: e.message || "Error interno" });
  }
});
