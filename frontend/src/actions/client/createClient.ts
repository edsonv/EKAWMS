import { IClient, IVehicle } from "@/types";

export const createClient = async (
  client: Omit<IClient, "vehicles">,
  vehicle: Omit<IVehicle, "notes" | "clientId">
) => {
  const r = await fetch("http://localhost:3001/api/client/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ client, vehicle }),
  }).then((r) => r.json());
  if (!r.ok) {
    // limpiar y enfocar al siguiente
    alert(r.error || "Error al guardar");
  }

  return r;
};
