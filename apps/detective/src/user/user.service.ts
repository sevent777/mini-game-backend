import { DBName } from '@app/constant';
import { ExtendedRequest } from '@app/core';
import { DetectiveUser } from '@app/entity';
import { UserService } from '@app/user';
import { Inject, Injectable, Provider, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable({
  scope: Scope.REQUEST,
})
export class DetectiveUserService extends UserService {
  constructor(
    @Inject(REQUEST) protected request: ExtendedRequest,
    @InjectRepository(DetectiveUser, DBName.detective)
    protected readonly userRepository: Repository<DetectiveUser>,
    protected readonly jwtService: JwtService
  ) {
    super(request, userRepository, jwtService);
  }

  getCurrentUser() {
    return this.userRepository.findOne({
      where: {
        id: this.userID,
      },
    });
  }
}

export const DetectiveUserProvider: Provider = {
  provide: UserService,
  useClass: DetectiveUserService,
};
