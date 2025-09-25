import express from "express";
import { Client } from "../models/client";
import { Vehicle } from "../models/vehicle";

export const client = express.Router();

client.post("/create", async (req, res) => {
  try {
    const { client, vehicle } = req.body || {};
    if (!client?.fullName || !client?.phone || !vehicle?.plate) {
      return res
        .status(400)
        .json({ ok: false, error: "Faltan campos obligatorios" });
    }

    // 1) Cliente (find or create)
    let cli = await Client.findOne({
      $or: [
        { fullName: client.fullName },
        { phone: client.phone },
        { "vehicles.plate": vehicle.plate },
      ],
    });

    if (!cli) {
      cli = await Client.create({
        fullName: client.fullName,
        phone: client.phone,
        email: client.email || null,
        docId: client.docId || null,
      });
    }

    // 2) Vehículo (placa única)
    const veh = await Vehicle.create({
      clientId: cli._id,
      plate: vehicle.plate,
      make: vehicle.make || null,
      model: vehicle.model || null,
      year: vehicle.year || null,
      notes: vehicle.notes || null,
    });

    // 3) Cache ligero (best-effort)
    await Client.updateOne(
      { _id: cli._id, "vehicles.plate": { $ne: veh.plate } },
      {
        $push: {
          vehicles: {
            plate: veh.plate,
            make: veh.make,
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
client.post("/clients", async (req, res) =>
  res.json(await Client.create(req.body)),
);
client.get("/clients", async (req, res) =>
  res.json(await Client.find().limit(50)),
);
client.post("/vehicles", async (req, res) =>
  res.json(await Vehicle.create(req.body)),
);
client.get("/vehicles", async (req, res) =>
  res.json(await Vehicle.find().limit(50)),
);
