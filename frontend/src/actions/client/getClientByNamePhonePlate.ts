export const getClientByNamePhonePlate = async (query: string) => {
  const r = await fetch(
    `http://localhost:3001/api/client/search?query=${encodeURIComponent(query)}`
  ).then((r) => r.json());
  if (!r.ok) {
    // limpiar y enfocar al siguiente
    alert(r.error || "Error al buscar");
  }

  return r;
};
