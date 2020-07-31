import {Pipe, PipeTransform} from '@angular/core';
import {TimeAgoPipe} from 'time-ago-pipe';

@Pipe({
    name: 'TimeAgoExtendsPipe',
    pure: false
})
export class TimeAgoExtendsPipe extends TimeAgoPipe {
  transform(value: string): string {
    return super.transform(value);
  }
}