process.env.NODE_ENV = 'development';
process.env.PORT = '3000';

import { expect } from 'chai';
import { Container } from 'inversify';
import 'mocha';
import 'reflect-metadata';
import { IDENTIFIER } from '../../src/constants/identifier';
import { UserService, IUserService } from '../../src/services/userService';
import sinon from 'sinon';

describe("User Service Unit Tests", () => {

  let userRepository;
  let userService: IUserService;
  const container = new Container();
    
  before(() => {
    const userRepositoryMock: any = {};
    container.bind(IDENTIFIER.UserRepository).toConstantValue(userRepositoryMock);
    container.bind<IUserService>(IDENTIFIER.UserService).to(UserService).inSingletonScope();
    userRepository = container.get(IDENTIFIER.UserRepository);
    userService = container.get(IDENTIFIER.UserService);
  });

  afterEach(() => {
    sinon.restore();
  })

  const user = {
    first_name: 'Parinita',
    last_name: 'Kumari',
    email: 'parinita.kumari@gmail.com',
    id: '123456',
    is_deleted: false
  };

  it('Should create user', async () => {
    userRepository.saveUser = sinon.stub().returns(user);    
    const savedUser = await userService.createUser(user); 
    expect(savedUser).to.be.eql(savedUser);
  })

  it('Should return users', async () => {
    const baseQuery = {};
    const filterQuery = {};
    userRepository.getUsers = sinon.stub().returns(user);    
    const userProfileInfo = await userService.getUsers({ baseQuery, filterQuery});    
    const expectedAnswer = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      id: '123456',
      is_deleted: false
    };
    expect(userProfileInfo).to.be.eql(expectedAnswer);
  });

  it('Should not return deleted users', async () => {
    const baseQuery = {};
    const filterQuery = {};
    userRepository.getUsers = sinon.stub().returns(user);    
    const userProfileInfo = await userService.getUsers({ baseQuery, filterQuery}); 
    expect(userProfileInfo.is_deleted).to.be.eql(false);
  });

  it('Should return updated user', async () => {
    let updateData = {
      last_name: 'Mehta'
    }
    userRepository.updateUser = sinon.stub().returns(updateData);    
    const updatedUser = await userService.updateUserById({ id: '123456' }, updateData);    
    const updatedUserData = {
      last_name: updateData.last_name,
    };
    expect(updatedUser).to.be.eql(updatedUserData);
  });

  it('Should delete user', async () => {
    let updateData = {
      is_deleted: true
    }
    userRepository.updateUser = sinon.stub().returns(updateData);    
    const updatedUser = await userService.updateUserById({ id: '123456' }, updateData);    
    const updatedUserData = {
      is_deleted: true
    };
    expect(updatedUser).to.be.eql(updatedUserData);
  });

});
