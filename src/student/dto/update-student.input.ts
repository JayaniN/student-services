import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UpdateStudentDTO {
    @Field(type => Int)
    id: number;

    @Field()
    name: string;

    @Field(type => Date)
    dateOfBirth: Date;

    @Field()
    email: string
}