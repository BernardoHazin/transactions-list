import "module-alias/register";
import { setupApolloServer } from "@/main/graphql/apollo-server";

setupApolloServer()
  .listen()
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
