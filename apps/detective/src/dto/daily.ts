import { Configuration } from '@app/entity';
import { ApiProperty } from '@nestjs/swagger';

export class DetectiveTestInfo extends Configuration {
  @ApiProperty()
  finished: boolean;

  @ApiProperty()
  submitContent: object;
}
export class DailyTestInfo {
  @ApiProperty()
  testInfo: DetectiveTestInfo;
}

export class DetectiveTestList {
  @ApiProperty({
    type: [DetectiveTestInfo],
  })
  list: DetectiveTestInfo[];
}
