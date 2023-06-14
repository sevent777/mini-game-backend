import { Configuration } from '@app/entity';
import { ConfigurationType } from '@app/entity/configuration-type';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { pick } from 'lodash';
import { Repository } from 'typeorm';

@Injectable()
export class CmsService {
  constructor(
    @InjectRepository(Configuration)
    private readonly configurationRepository: Repository<Configuration>,
    @InjectRepository(ConfigurationType)
    private readonly configurationTypeRepository: Repository<ConfigurationType>
  ) {}

  getTypeList(): Promise<ConfigurationType[]> {
    return this.configurationTypeRepository.find({
      relations: ['configs'],
    });
  }

  getList(): Promise<Configuration[]> {
    return this.configurationRepository.find();
  }

  createOrUpdateConfigType(configTypeInfo: Partial<ConfigurationType>): Promise<ConfigurationType> {
    return this.configurationTypeRepository.save(configTypeInfo);
  }

  async createOrUpdateConfig(configInfo: Partial<Configuration>) {
    const existingConfig = await this.findConfig(configInfo.id);
    const config = existingConfig ?? new Configuration();
    Object.assign(config, pick(configInfo, ['name', 'content', 'effectiveTime', 'configType']));
    console.log('config :>> ', config);
    console.log('configInfo :>> ', configInfo);
    return this.configurationRepository.save(config);
  }

  async findConfigType(id: number): Promise<ConfigurationType> {
    if (!id) {
      return;
    }
    const config = await this.configurationTypeRepository.findOne({
      where: [
        {
          id,
        },
      ],
    });

    if (!config) {
      throw new NotFoundException();
    }
    return config;
  }

  async findConfig(id: number): Promise<Configuration> {
    if (!id) {
      return;
    }
    const config = await this.configurationRepository.findOne({
      where: [
        {
          id,
        },
      ],
    });

    if (!config) {
      throw new NotFoundException();
    }
    return config;
  }
}
