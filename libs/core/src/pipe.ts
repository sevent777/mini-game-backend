import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class TimestampToDatePipe implements PipeTransform<string | number, Date | undefined> {
  transform(value: string | number) {
    if (value === void 0) {
      return void 0;
    }
    const timestamp = parseInt(value as string, 10);
    return new Date(timestamp);
  }
}
