import { IVehicle } from "./Vehicle";

type IVehicleLight = Pick<IVehicle, "plate" | "make" | "model" | "year"> & {
  vehicleId: string;
};

interface IClient {
  fullName: string;
  phone: string;
  email?: string | null;
  docId?: string | null;
  vehicles: IVehicleLight[];
}

export type { IClient, IVehicleLight };
