import { Arg, Query, Resolver } from "type-graphql";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { prisma } from "../../server";

function generateAccessToken(id: string, email: string) {
  const payload = {
    id: id,
    email: email,
  };

  const secret = "your-secret-key";
  const options = { expiresIn: "1d" };

  return jwt.sign(payload, secret, options);
}

@Resolver()
export class LoginResolver {
  @Query(() => String)
  async login(@Arg("email") email: string, @Arg("password") password: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      const valid = await bcrypt.compare(password, user.password);
      if (valid) {
        return generateAccessToken(user.id, user.email);
      }
    }

    return null;
  }
}
