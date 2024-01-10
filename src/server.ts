import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import { PrismaClient } from "@prisma/client";
import { buildSchema } from "type-graphql";
import { RegisterResolver } from "./modules/user/Register";
import { UsersResolver } from "./modules/user/Users";
import { LoginResolver } from "./modules/user/Login";
import { CreatePostResolver } from "./modules/post/CreatePost";
import { UserPostsResolver } from "./modules/post/UserPosts";
import { AllPostsResolver } from "./modules/post/AllPosts";
import { DeletePostResolver } from "./modules/post/deletePost";

export const prisma = new PrismaClient();

const main = async () => {
  const schema = await buildSchema({
    resolvers: [
      RegisterResolver,
      UsersResolver,
      LoginResolver,
      CreatePostResolver,
      AllPostsResolver,
      UserPostsResolver,
      DeletePostResolver,
    ],
    authChecker: ({ context: { req } }) => {
      if (req.headers.app === "ADMIN") {
        return true;
      }
      return false;
    },
  });

  const apolloServer = new ApolloServer({
    schema,
    playground: true,
    context: ({ req }) => ({ req }),
  });

  const app = Express();

  apolloServer.applyMiddleware({ app });

  const PORT = 4000;

  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}/graphql`);
  });
};

main();
