import { Configuration } from '@app/entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { pick } from 'lodash';
import { Repository } from 'typeorm';

@Injectable()
export class CmsService {
  constructor(
    @InjectRepository(Configuration)
    private readonly configurationRepository: Repository<Configuration>
  ) {}

  getList(): Promise<Configuration[]> {
    return this.configurationRepository.find();
  }

  createConfig(configInfo: Partial<Configuration>): Promise<Configuration> {
    const config = new Configuration();
    Object.assign(config, configInfo);
    return this.configurationRepository.save(config);
  }

  async updateConfig(configInfo: Partial<Configuration>): Promise<Configuration> {
    const config = await this.configurationRepository.findOne({
      where: [
        {
          id: configInfo.id,
        },
      ],
    });

    if (!config) {
      throw new NotFoundException();
    }

    Object.assign(config, pick(configInfo, ['content', 'effectiveTime', 'type', 'name']));
    return this.configurationRepository.save(config);
  }
}
