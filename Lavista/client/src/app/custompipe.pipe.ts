import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'custompipes',
  pure : true
})
export class CustompipePipe implements PipeTransform {

  transform(params: any, ...args: any[]): any {
    if(params.length>20){
    return params.substr(0,80)+'....Click View Detail>';
  }
else{
  return params;
}}


}