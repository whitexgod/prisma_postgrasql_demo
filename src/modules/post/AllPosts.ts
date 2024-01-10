import { Query, Resolver } from "type-graphql";
import { Post } from "../../entity/Post";
import { prisma } from "../../server";

@Resolver()
export class AllPostsResolver {
  @Query(() => [Post])
  async allPosts() {
    const allPosts = await prisma.post.findMany();
    return allPosts;
  }
}
