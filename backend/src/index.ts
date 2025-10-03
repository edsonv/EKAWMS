import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { makeExecutableSchema } from "@graphql-tools/schema";
import * as dotenv from "dotenv";
import { connectMongo } from "./db";
import { resolvers } from "./graphql/resolvers";
import { typeDefs } from "./graphql/typeDefs";

dotenv.config();

const PORT = Number(process.env.PORT || 3001);
const MONGO_URI = process.env.MONGO_URI as string;

const schema = makeExecutableSchema({ typeDefs, resolvers });
// const app = express();
const server = new ApolloServer({ schema });

// app.use(cors());
// app.use(express.json());
// app.use("/api/client", client);

async function main() {
  await connectMongo(MONGO_URI);
  // app.listen(PORT, () =>
  //   console.log(`[api] listening on http://localhost:${PORT}`),
  // );
  const { url } = await startStandaloneServer(server, {
    // context: async ({ req }) => ({ req }),
    listen: { port: PORT },
  });

  console.log(`[graphql] listening on ${url}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
