import { model, Schema } from "mongoose";

const ClientVehicleLight = new Schema(
  {
    plate: String,
    make: String,
    model: String,
    year: Number,
  },
  { _id: false },
);

export const ClientSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },
    email: { type: String, default: null },
    docId: { type: String, default: null },
    vehicles: [ClientVehicleLight],
  },
  { timestamps: true },
);

ClientSchema.index({ name: 1 });
ClientSchema.index({ phone: 1 });

export const Client = model("Client", ClientSchema);
