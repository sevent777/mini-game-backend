import { DBName } from '@app/constant';
import { DetectiveUser } from '@app/entity';
import { UserInfoProvider, UserService } from '@app/user';
import { Provider } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class DetectiveUserService extends UserService {
  constructor(
    @InjectRepository(DetectiveUser, DBName.detective)
    protected readonly userRepository: Repository<DetectiveUser>,
    protected readonly userInfoProvider: UserInfoProvider,
    protected readonly jwtService: JwtService
  ) {
    super(userRepository, userInfoProvider, jwtService);
  }

  getCurrentUser() {
    return this.userRepository.findOne({
      where: {
        id: this.userInfoProvider.userID,
      },
    });
  }
}

export const DetectiveUserProvider: Provider = {
  provide: UserService,
  useClass: DetectiveUserService,
};
