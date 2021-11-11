import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateStudentDTO {
    @Field()
    name: string;

    @Field(type => Date)
    dateOfBirth: Date;

    @Field()
    email: string
}