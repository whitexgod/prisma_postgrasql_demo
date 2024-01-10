import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class Post {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  body: string;

  @Field(() => ID)
  authorId: string;
}
