process.env.NODE_ENV = 'development';
process.env.PORT = '3000';

import { expect } from 'chai';
import { Container } from 'inversify';
import 'mocha';
import 'reflect-metadata';
import { IDENTIFIER } from '../../src/constants/identifier';
import { HobbyService, IHobbyService } from '../../src/services/hobbyService';
import sinon from 'sinon';
import { PASSION_LEVEL } from '../../src/constants/passionLevel';
import { ObjectId } from 'bson';
import { IUserService, UserService } from '../../src/services/userService';

describe("hobby Service Unit Tests", () => {

  let hobbyRepository;
  let hobbyService: IHobbyService;
  const container = new Container();
    
  before(() => {
    const hobbyRepositoryMock: any = {};
    container.bind(IDENTIFIER.HobbyRepository).toConstantValue(hobbyRepositoryMock);
    container.bind<IHobbyService>(IDENTIFIER.HobbyService).to(HobbyService).inSingletonScope();
    container.bind<IUserService>(IDENTIFIER.UserService).to(UserService).inSingletonScope();
    
    hobbyRepository = container.get(IDENTIFIER.HobbyRepository);
    hobbyService = container.get(IDENTIFIER.HobbyService);
  });

  afterEach(() => {
    sinon.restore();
  })

  const hobby = {
    id: '123456',
    name: "Painting",
    from: 2017,
    user: new ObjectId("625542e910a0e076c2a02033"),
    passion_level: PASSION_LEVEL.HIGH,
    is_deleted: false
  };

  it('Should create hobby', async () => {
    hobbyRepository.savehobby = sinon.stub().returns(hobby);    
    const savedhobby = await hobbyService.addHobby(hobby); 
    expect(savedhobby).to.be.eql(hobby);
  })

  it('Should return updated hobby', async () => {
    let updateData = {
      from: 2018
    }
    hobbyRepository.updatehobby = sinon.stub().returns(updateData);    
    const updatedhobby = await hobbyService.updateHobby({ id: '123456' }, updateData);    
    expect(updatedhobby).to.be.eql(updateData);
  });

});
