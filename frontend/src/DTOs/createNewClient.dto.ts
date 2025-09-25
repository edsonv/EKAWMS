import { IClient, IVehicle } from "@/types";

type NewClientDTO = Omit<IClient, "vehicles"> &
  Omit<IVehicle, "clientId" | "notes">;

export type { NewClientDTO };
