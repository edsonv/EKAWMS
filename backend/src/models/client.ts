import { model, Schema, Types } from "mongoose";

const ClientVehicleLight = new Schema(
  {
    vehicleId: { type: Types.ObjectId, ref: "Vehicle" },
    plate: String,
    model: String,
    year: Number,
  },
  { _id: false },
);

export const ClientSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    phones: [{ type: String, trim: true }],
    email: { type: String, default: null },
    docId: { type: String, default: null },
    vehicles: [ClientVehicleLight],
  },
  { timestamps: true },
);

ClientSchema.index({ name: 1 });
ClientSchema.index({ phones: 1 });

export const Client = model("Client", ClientSchema);


