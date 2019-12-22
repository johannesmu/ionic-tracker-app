import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeformat'
})
export class TimePipe implements PipeTransform {

  transform(time: any): any {
    let timeString:string = '';
    if( time < 60 ) {
      timeString = `${time} s`;
    }
    else if( time >= 60 && time < 3600 ) {
      let min = Math.floor( time/60 );
      let sec = (time % 60).toFixed(2);
      timeString = `${min} m ${sec} s`;
    }
    return timeString;
  }

}
