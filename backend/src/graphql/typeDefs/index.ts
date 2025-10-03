import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import path from "path";

const typesArray = loadFilesSync(path.join(__dirname, "./"), {
  ignoreIndex: true,
  extensions: ["graphql"],
  recursive: true,
});

export const typeDefs = mergeTypeDefs(typesArray);
