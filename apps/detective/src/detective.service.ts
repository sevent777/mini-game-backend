import { DBName } from '@app/constant';
import { AnswerRecord, Configuration } from '@app/entity';
import { UserService } from '@app/user';
import { Inject, Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Repository } from 'typeorm';

import { SubmitAnswerInfo } from './dto';
import { DetectiveUserService } from './user/user.service';

@Injectable()
export class DetectiveService {
  constructor(
    @InjectRepository(AnswerRecord, DBName.detective)
    private readonly answerRecordRepo: Repository<AnswerRecord>,
    @InjectEntityManager(DBName.detective) private readonly entityManager: EntityManager,
    @Inject(UserService) protected readonly userService: DetectiveUserService
  ) {}

  async findAnswerRecord(testID: number): Promise<AnswerRecord> {
    return this.answerRecordRepo.findOne({
      where: { userID: this.userService.userID, testID },
    });
  }

  async createOrFindRecord(testID: number): Promise<AnswerRecord> {
    const existingRecord = await this.findAnswerRecord(testID);
    if (existingRecord) {
      return existingRecord;
    }
    return this.answerRecordRepo.create({ userID: this.userService.userID, testID });
  }

  async submitAnswer(testID: number, info: SubmitAnswerInfo) {
    const record = await this.createOrFindRecord(testID);
    return this.entityManager.transaction(async (transactionalEntityManager) => {
      Object.assign(record, info);
      await transactionalEntityManager.save(record);
      const curUser = await this.userService.getCurrentUser();
      curUser.totalScore += info.score;
      await transactionalEntityManager.save(curUser);
    });
  }

  async convertTestList(configs: Configuration[]) {
    const testIDList = configs.map(({ id }) => id);
    const records = await this.answerRecordRepo.find({
      where: { userID: this.userService.userID, testID: In(testIDList) },
    });
    return configs.map((item) => {
      const record = records.find((record) => record.testID === item.id);
      return {
        ...item,
        finished: !!record,
        submitContent: record ? record.content : null,
      };
    });
  }
}
