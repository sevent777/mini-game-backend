import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsObject } from 'class-validator';

export class SubmitAnswerInfo {
  @ApiProperty()
  @IsNumber()
  score: number;

  @ApiProperty()
  @IsNumber()
  duration: number;

  @ApiProperty({
    additionalProperties: { type: 'object' },
  })
  @IsObject()
  content: object;
}
