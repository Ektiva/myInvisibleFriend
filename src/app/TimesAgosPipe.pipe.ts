import {Pipe, PipeTransform} from '@angular/core';
import {TimeAgoPipe} from 'time-ago-pipe';

@Pipe({
    name: 'TimesAgosPipe',
    pure: false
})
export class TimesAgosPipe extends TimeAgoPipe {
  transform(value: string): string {
    return super.transform(value);
  }
}