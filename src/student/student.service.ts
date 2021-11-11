import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDTO } from './dto/create-student.input';
import { UpdateStudentDTO } from './dto/update-student.input';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentService {
    constructor(@InjectRepository(Student) private studentRepository: Repository<Student>) {};
    
    async create(createStudents: CreateStudentDTO[]) : Promise<boolean> {
        try {
            await this.studentRepository.save(createStudents); // Insert
            return true;
        } catch (error) {
            return false;
        }
    }

    async findAll() : Promise<Student[]> {
        return this.studentRepository.find(); // SELECT * students
    }

    async updateStudent(id: number, updateStudent: UpdateStudentDTO) : Promise<Student> {
        const student = await this.studentRepository.findOne({ where: {id} });
        if (!student) {
            throw new NotFoundException(`No student found with id: ${id}`);
        }
        return await this.studentRepository.save({
            ...student, 
            ...updateStudent
        });
    }

    async removeStudent(id: number) : Promise<Student> {
        const student = await this.studentRepository.findOne({ where: {id} });
        if (!student) {
            throw new NotFoundException(`No student found with id: ${id}`);
        }
        return await this.studentRepository.remove(student);
    }
}
