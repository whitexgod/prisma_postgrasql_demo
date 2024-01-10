import { InputType, Field } from "type-graphql";
import { Length, IsEmail } from "class-validator";

@InputType()
export class RegisterInput {
  @Field()
  @Length(3, 50)
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  age: number;

  @Field()
  gender: string;

  @Field()
  password: string;
}
