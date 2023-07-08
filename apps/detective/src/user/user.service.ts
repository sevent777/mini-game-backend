import { DBName } from '@app/constant';
import { DetectiveUser } from '@app/entity';
import { UserService } from '@app/user';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class DetectiveUserService extends UserService {
  constructor(
    @InjectRepository(DetectiveUser, DBName.detective)
    protected readonly userRepository: Repository<DetectiveUser>
  ) {
    super(userRepository);
  }
}
