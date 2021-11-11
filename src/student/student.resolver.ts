import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateStudentDTO } from './dto/create-student.input';
import { UpdateStudentDTO } from './dto/update-student.input';
import { Student } from './entities/student.entity';
import { StudentService } from './student.service';

@Resolver(() => Student)
export class StudentResolver {
    constructor(private studentService: StudentService) {};

    @Mutation(() => Boolean, { name: "createStudents" })
    create(@Args('createStudents', { type: () => [CreateStudentDTO] }) createStudents: CreateStudentDTO[]) {
        return this.studentService.create(createStudents);
    }

    @Query(() => [Student], { name: "getAllStudents" })
    findAll() {
        return this.studentService.findAll();
    }

    @Mutation(() => Student, { name: "updateStudent" })
    updateStudent(@Args('updateStudent') updateStudent: UpdateStudentDTO) : Promise<Student> {
        return this.studentService.updateStudent(updateStudent.id, updateStudent);
    }

    @Mutation(() => Student, { name: "removeStudent" })
    removeStudent(@Args('id', { type: () => Int }) id: number) : Promise<Student> {
        return this.studentService.removeStudent(id);
    }
}
