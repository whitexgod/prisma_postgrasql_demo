import { prisma } from "../../server";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class DeletePostResolver {
  @Query(() => String)
  async hello() {
    return "hello world";
  }

  @Mutation(() => String)
  async deletePost(@Arg("id") id: string) {
    const deleteUser = await prisma.post.delete({
      where: {
        id,
      },
    });
    console.log(deleteUser)
    return "Post deleted Successfully"
  }
}
