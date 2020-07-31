import {Pipe, PipeTransform} from '@angular/core';
import {TimeAgoPipe} from 'time-ago-pipe';

@Pipe({
    name: 'TimesAgoPipe',
    pure: false
})
export class TimesAgoPipe extends TimeAgoPipe {
  transform(value: string): string {
    return super.transform(value);
  }
}