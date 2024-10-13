import { ApolloClient, InMemoryCache } from "@apollo/client";
import { STR_TOKEN } from "./common";

const apollo = new ApolloClient({
  uri: import.meta.env.VITE_APP_GRAPHQL_ENDPOINT,//"http://localhost:4000",
  cache: new InMemoryCache(),
  headers: {
    authorization: sessionStorage.getItem(STR_TOKEN) || "",
  },
});

export default apollo;