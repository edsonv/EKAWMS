import { Client } from "../../models/client";
import { Vehicle } from "../../models/vehicle";

export const clientResolver = {
  Query: {
    clients: async () => {
      try {
        const clients = await Client.find().limit(50);

        return clients;
      } catch (error: any) {
        throw new Error(error);
      }
    },
    client: async (_: any, { id: clientId }: { id: string }) => {
      try {
        const client = await Client.findById(clientId);

        if (!client) {
          throw new Error("Cliente no encontrado");
        }

        return client;
      } catch (error: any) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    createClientAndVehicle: async (_: any, { client, vehicle }) => {
      if (!client.fullName || !client.phone || !vehicle.plate) {
        throw new Error("Faltan campos obligatorios");
      }
      try {
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

        const veh = await Vehicle.create({
          clientId: cli._id,
          plate: vehicle.plate,
          make: vehicle.make || null,
          model: vehicle.model || null,
          year: vehicle.year || null,
          notes: vehicle.notes || null,
        });

        await Client.updateOne(
          { _id: cli._id, "vehicles.plate": { $ne: veh.plate } },
          {
            $push: {
              vehicles: {
                vehicleId: veh._id,
                plate: veh.plate,
                make: veh.make,
                model: veh.model,
                year: veh.year,
              },
            },
          },
        );

        const createdClient = await Client.findById(cli._id);
        return createdClient;
      } catch (error: any) {
        throw new Error(error);
      }
    },
    // addVehicleToClient: async (_: any, { clientId, vehicle }) => {
    //   if (!clientId || !vehicle.plate) {
    //     throw new Error("Faltan campos obligatorios");
    //   }
    //   try {
    //     const cli = await Client.findById(clientId);
    //     if (!cli) {
    //       throw new Error("Cliente no encontrado");
    //     }

    //     const existingVehicle = await Vehicle.findOne({ plate: vehicle.plate });
    //     if (existingVehicle) {
    //       throw new Error("Ya existe un vehículo con esa placa");
    //     }

    //     const veh = await Vehicle.create({
    //       clientId: cli._id,
    //       plate: vehicle.plate,
    //       make: vehicle.make || null,
    //       model: vehicle.model || null,
    //       year: vehicle.year || null,
    //       notes: vehicle.notes || null,
    //     });

    //     await Client.updateOne(
    //       { _id: cli._id, "vehicles.plate": { $ne: veh.plate } },
    //       {
    //         $push: {
    //           vehicles: {
    //             vehicleId: veh._id,
    //             plate: veh.plate,
    //             make: veh.make,
    //             model: veh.model,
    //             year: veh.year,
    //           },
    //         },
    //       },
    //     );

    //     const updatedClient = await Client.findById(cli._id);
    //     return updatedClient;
    //   } catch (error: any) {
    //     throw new Error(error);
    //   }
    // },
  },
};
