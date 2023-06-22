import { Configuration } from '@app/entity';
import { ApiProperty } from '@nestjs/swagger';

export class DetectiveTestInfo extends Configuration {
  @ApiProperty()
  finished: boolean;
}
export class DailyTestInfo {
  @ApiProperty({
    type: DetectiveTestInfo,
  })
  testInfo: DetectiveTestInfo;
}

export class DetectiveTestList {
  @ApiProperty({
    type: [DetectiveTestInfo],
  })
  list: DetectiveTestInfo[];
}
