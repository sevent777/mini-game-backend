import { DBName } from '@app/constant';
import { AnswerRecord, Configuration } from '@app/entity';
import { UserInfoProvider } from '@app/user';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { SubmitAnswerInfo } from './dto';

@Injectable()
export class DetectiveService {
  constructor(
    @InjectRepository(AnswerRecord, DBName.detective)
    private readonly answerRecordRepo: Repository<AnswerRecord>,
    private userInfoProvider: UserInfoProvider
  ) {}

  async findAnswerRecord(testID: number): Promise<AnswerRecord> {
    return this.answerRecordRepo.findOne({
      where: { userID: this.userInfoProvider.userID, testID },
    });
  }

  async createOrFindRecord(testID: number): Promise<AnswerRecord> {
    const existingRecord = await this.findAnswerRecord(testID);
    if (existingRecord) {
      return existingRecord;
    }
    return this.answerRecordRepo.create({ userID: this.userInfoProvider.userID, testID });
  }

  async submitAnswer(testID: number, info: SubmitAnswerInfo) {
    const record = await this.createOrFindRecord(testID);
    Object.assign(record, info);
    return this.answerRecordRepo.save(record);
  }

  async convertTestList(configs: Configuration[]) {
    const testIDList = configs.map(({ id }) => id);
    const records = await this.answerRecordRepo.find({
      where: { userID: this.userInfoProvider.userID, testID: In(testIDList) },
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
