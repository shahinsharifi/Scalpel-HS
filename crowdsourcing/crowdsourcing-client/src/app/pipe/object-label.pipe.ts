import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectLabel'
})
export class ObjectLabelPipe implements PipeTransform {

  transform(value: any): any {
    if(value && value.indexOf('_') > -1){
        return value.substring(value.indexOf('_') + 1 , value.length);
    }
    return value;
  }

}
