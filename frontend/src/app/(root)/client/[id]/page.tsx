import { GET_CLIENT_BY_ID } from "@/actions/client/GET_CLIENT_BY_ID";
import { getClient } from "@/ApolloClient/Apollo-RSC";

const Client = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const client = await getClient().query({
    query: GET_CLIENT_BY_ID,
    variables: { clientId: id },
  });

  return (
    <>
      <h1>{JSON.stringify(client)}</h1>
    </>
  );
};

export default Client;
