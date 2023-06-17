import { Configuration } from '@app/entity';
import { ConfigurationType } from '@app/entity/configuration-type';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isNumber, pick } from 'lodash';
import { Repository } from 'typeorm';

export enum ConfigPath {
  dailyDetective = 'dailyDetective',
}

@Injectable()
export class ConfigService {
  constructor(
    @InjectRepository(Configuration)
    private readonly configurationRepo: Repository<Configuration>,
    @InjectRepository(ConfigurationType)
    private readonly configurationTypeRepo: Repository<ConfigurationType>
  ) {}

  getTypeList(): Promise<ConfigurationType[]> {
    return this.configurationTypeRepo.find({
      relations: ['configs'],
    });
  }

  getList(): Promise<Configuration[]> {
    return this.configurationRepo.find();
  }

  createOrUpdateConfigType(configTypeInfo: Partial<ConfigurationType>): Promise<ConfigurationType> {
    return this.configurationTypeRepo.save(configTypeInfo);
  }

  async createOrUpdateConfig(configInfo: Partial<Configuration>) {
    const existingConfig = await this.findConfig(configInfo.id);
    const config = existingConfig ?? new Configuration();
    Object.assign(config, pick(configInfo, ['name', 'content', 'effectiveTime', 'configType']));
    return this.configurationRepo.save(config);
  }

  async findConfigType(id: number): Promise<ConfigurationType> {
    if (!id) {
      return;
    }
    const config = await this.configurationTypeRepo.findOne({
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
    const config = await this.configurationRepo.findOne({
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

  async getConfigs(path: ConfigPath): Promise<Configuration[]> {
    const configs = await this.configurationRepo.find({
      where: [
        {
          configType: {
            path,
          },
        },
      ],
    });
    if (!configs.length) {
      throw new NotFoundException();
    }
    return configs;
  }

  async deleteConfig(id: number) {
    if (!isNumber(id)) {
      throw new BadRequestException();
    }
    return this.configurationRepo.delete({
      id,
    });
  }
}
