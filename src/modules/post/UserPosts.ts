import { prisma } from "../../server";
import { Post } from "../../entity/Post";
import { Arg, Query, Resolver } from "type-graphql";

@Resolver()
export class UserPostsResolver {
  @Query(() => [Post])
  async userPosts(@Arg("email") email: string) {
    const userPosts = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        posts: true,
      },
    });
    console.log(userPosts);
    return userPosts?.posts;
  }
}
