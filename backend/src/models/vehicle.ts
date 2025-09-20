import { model, Schema, Types } from "mongoose";

const VehicleSchema = new Schema(
  {
    clientId: { type: Types.ObjectId, ref: "Client", required: true },
    plate: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    brand: { type: String, default: null },
    model: { type: String, default: null },
    year: { type: Number, default: null },
    notes: { type: String, default: "" },
  },
  { timestamps: true },
);

VehicleSchema.index({ clientId: 1 });

export const Vehicle = model("Vehicle", VehicleSchema);
