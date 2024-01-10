import { Resolver, Query, Mutation, Arg } from "type-graphql";
import * as bcrypt from "bcryptjs";
import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";
import { prisma } from "../../server";

@Resolver()
export class RegisterResolver {
  @Query(() => String)
  async hello() {
    return "Hello World";
  }

  @Mutation(() => User)
  async register(
    @Arg("input") { name, email, age, gender, password }: RegisterInput
  ): Promise<User> {
    const hashPassword = await bcrypt.hash(password, 12);

    const user = prisma.user.create({
      data: {
        email,
        name,
        age,
        gender,
        password: hashPassword,
      },
    });

    return user;
  }
}
