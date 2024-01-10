import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { prisma } from "../../server";
import { Post } from "../../entity/Post";

@Resolver()
export class CreatePostResolver {
  @Query(() => String)
  async hello() {
    return "Hello World";
  }

  @Mutation(() => Post)
  async createPost(
    @Arg("title") title: string,
    @Arg("authorId") authorId: string
  ) {
    const post = prisma.post.create({
      data: {
        title,
        authorId,
      },
    });

    return post;
  }
}
