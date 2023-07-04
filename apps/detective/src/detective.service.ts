import { DBName } from '@app/constant';
import { AnswerRecord } from '@app/entity';
import { UserInfoProvider } from '@app/user';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SubmitAnswerInfo } from './dto';

@Injectable()
export class DetectiveService {
  constructor(
    @InjectRepository(AnswerRecord, DBName.detective)
    private readonly answerRecordRepo: Repository<AnswerRecord>,
    private userInfoProvider: UserInfoProvider
  ) {}

  async submitAnswer(questionID: number, info: SubmitAnswerInfo) {
    const record = this.answerRecordRepo.create({
      userID: this.userInfoProvider.userID,
      ...info,
    });
    return this.answerRecordRepo.save(record);
  }
}
