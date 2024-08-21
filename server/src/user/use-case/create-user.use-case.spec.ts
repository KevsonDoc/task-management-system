import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserUserCase } from './create-user.use-case';
import { ForbiddenException } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { faker } from '@faker-js/faker';
import { CreateUserDto } from '../dto/create-user.dto';
import * as uuid from 'uuid';

const userEntity: UserEntity = new UserEntity({
  id: uuid.v4(),
  email: faker.internet.email(),
  name: faker.person.fullName(),
  password: faker.internet.password(),
});

describe('CreateUserUserCase', () => {
  let createUserUserCase: CreateUserUserCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateUserUserCase],
    }).compile();

    createUserUserCase = module.get<CreateUserUserCase>(CreateUserUserCase);
  });

  it('should be defined', () => {
    expect(createUserUserCase).toBeDefined();
  });

  it('should be created user', async () => {
    const createUserDto: CreateUserDto = {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: faker.internet.password(),
    };

    const result = await createUserUserCase.execute(createUserDto);

    expect(result).toStrictEqual(userEntity);
  });

  it('should throw an expectation if the user already exists', () => {
    jest
      .spyOn(createUserUserCase, 'execute')
      .mockRejectedValueOnce(
        new ForbiddenException(['Já existe um usupario com esse e-mail']),
      );

    const createUserDto: CreateUserDto = {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: faker.internet.password(),
    };

    expect(createUserUserCase.execute(createUserDto)).rejects.toThrow();
  });
});
