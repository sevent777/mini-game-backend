import { Configuration } from '@app/entity';
import { ApiProperty } from '@nestjs/swagger';

export class DailyTestInfo {
  @ApiProperty({
    type: [Configuration],
  })
  testInfo: Configuration;
}
