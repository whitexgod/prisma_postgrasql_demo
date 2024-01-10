import { User } from "../../entity/User";
import { Query, Resolver } from "type-graphql";
import { prisma } from "../../server";

@Resolver()
export class UsersResolver {
  @Query(() => [User])
  async users() {
    const users = await prisma.user.findMany();
    return users;
  }
}
