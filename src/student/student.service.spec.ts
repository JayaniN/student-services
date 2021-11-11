import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateStudentDTO } from './dto/create-student.input';
import { UpdateStudentDTO } from './dto/update-student.input';
import { Student } from './entities/student.entity';
import { StudentService } from './student.service';

describe('StudentService', () => {
  let service: StudentService;

  let createStdDto = new CreateStudentDTO();
  createStdDto.name = 'test-name';
  createStdDto.email = 'test-mail';
  createStdDto.dateOfBirth = new Date('2000-02-25');

  let fakeStudent: Student = {
    id: 1000,
    name: 'fake-std',
    email: 'fake-mail',
    dateOfBirth: new Date('2005-10-02')
  };

  let fakeId = 1001;
  let updateStdDto = new UpdateStudentDTO();
  updateStdDto.name = 'update-name';
  updateStdDto.email = 'update-mail';

  const mockStudentRepository = {
    find: jest.fn().mockImplementation(() => Promise.resolve([fakeStudent])),
    findOne: jest.fn().mockImplementation(() => {
      return { ...updateStdDto };
    }),
    save: jest.fn().mockImplementation((student) => Promise.resolve({...updateStdDto})),
    remove: jest.fn().mockImplementation((student) => student),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        {
          provide: getRepositoryToken(Student), // we didn't create std repository, so to tell that we're looking for the std repository use getRepositoryToken
          useValue: mockStudentRepository,
        }
      ],
    }).compile();

    service = module.get<StudentService>(StudentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create new student records and return true', async () => {
    expect(await service.create([createStdDto])).toEqual(true);
  });

  it('should get all student records', async () => {
    expect(await service.findAll()).toEqual([fakeStudent]);
  });

  it('should update student record and return with id', async () => {
    expect(await service.updateStudent(fakeId, updateStdDto)).toEqual({...updateStdDto});
  });

  it('should remove student record', async () => {
    expect(await service.removeStudent(fakeId)).toEqual({...updateStdDto});
  })

});