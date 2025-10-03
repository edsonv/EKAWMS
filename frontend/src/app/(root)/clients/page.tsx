import { GET_CLIENTS } from "@/actions/client/GET_CLIENTS";
import { getClient } from "@/ApolloClient/Apollo-RSC";
import { IClient } from "@/types";
import Link from "next/link";

type GetClientsData = {
  clients: Pick<IClient, "_id" | "fullName" | "phone">[];
};

const Clients = async () => {
  const { data } = await getClient().query<GetClientsData>({
    query: GET_CLIENTS,
  });
  const clients = data?.clients ?? [];
  console.log(clients);

  return (
    <>
      <h1>Clients list</h1>
      <div className="flex flex-col">
        <input type="text" className="border rounded" placeholder="Search" />
        {clients.map((c) => {
          return (
            <Link href={`/client/${c._id}`} key={c._id}>
              {c.fullName} - {c.phone}
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Clients;
