export interface IVehicle {
  clientId: string;
  plate: string;
  make?: string | null;
  model?: string | null;
  year?: string | null;
  notes: string;
}
