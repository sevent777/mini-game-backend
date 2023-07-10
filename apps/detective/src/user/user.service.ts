import { DBName } from '@app/constant';
import { DetectiveUser } from '@app/entity';
import { UserService } from '@app/user';
import { Provider } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class DetectiveUserService extends UserService {
  constructor(
    @InjectRepository(DetectiveUser, DBName.detective)
    protected readonly userRepository: Repository<DetectiveUser>
  ) {
    console.log('init DetectiveUserService :>> ');
    super(userRepository);
  }
}

export const DetectiveUserProvider: Provider = {
  provide: UserService,
  useClass: DetectiveUserService,
};
