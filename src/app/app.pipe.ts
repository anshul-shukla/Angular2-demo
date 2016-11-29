import { Pipe, PipeTransform } from '@angular/core';
import {DatePipe, DecimalPipe} from '@angular/common';

@Pipe({
  name: 'app'
})
export class AppPipe implements PipeTransform {
 transform(value, args:string[]) : any {
    let keys = [];
    for (let key in value) {
      keys.push({key: key, value: value[key]});
    }
    return keys;
  }

}

@Pipe({
  name: 'fromDateFilter'
})
export class FromDatePipe {

  transform(dateList:any,a:any,b:any) {
   if(dateList && dateList.length){
   	return dateList.filter(object => {
      if( (+(new Date(b)) > +(new Date(object.start_date))) && (+(new Date(object.start_date)) > +(new Date(a)) ) && ( +(new Date(a))  < +(new Date(object.end_date))) && ( +(new Date(object.end_date))  < +(new Date(b)) )){
      	return true;
      }else{
      	return false;
      }
    });
   }
    
  }

}

@Pipe({
  name: 'format'
})
export class Format implements PipeTransform  {
  
  datePipe: DatePipe = new DatePipe();
  decimalPipe: DecimalPipe = new DecimalPipe();
  
  transform(input:string, args:any): any {
    var format = '';
    var parsedFloat = 0;
    var pipeArgs = args.split(':');
    for(var i = 0; i < pipeArgs.length; i++){
      pipeArgs[i] = pipeArgs[i].trim(' ');
    }
    
    switch(pipeArgs[0].toLowerCase()) {
      case 'text':
        return input;
      case 'decimal':
      case 'number':
        parsedFloat = !isNaN(parseFloat(input)) ? parseFloat(input) : 0;
        format = pipeArgs.length > 1 ? pipeArgs[1] : null;
        return this.decimalPipe.transform(parsedFloat, format);
      case 'percentage':
        parsedFloat = !isNaN(parseFloat(input)) ? parseFloat(input) : 0;
        format = pipeArgs.length > 1 ? pipeArgs[1] : null;
        return this.decimalPipe.transform(parsedFloat, format) + '%';
      case 'date':
      case 'datetime':
      	input = Date.parse(input);
        var date = !isNaN(parseInt(input)) ? parseInt(input) : new Date(input);
        format = 'MMM d, y';
        if(pipeArgs.length > 1)
        {
            format = '';
            for(var i = 1; i < pipeArgs.length; i++){
                format += pipeArgs[i];
            }
        }
        return this.datePipe.transform(date, format);
      default:
        return input;
    }
  }
}

@Pipe({name: 'orderBy', pure: false})
export class OrderBy implements PipeTransform {

	value:string[] =[];

	static _orderByComparator(a:any, b:any):number{
        
        if(a === null || typeof a === 'undefined') a = 0;
        if(b === null || typeof b === 'undefined') b = 0;

		if((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))){
			//Isn't a number so lowercase the string to properly compare
			if(a.toLowerCase() < b.toLowerCase()) return -1;
			if(a.toLowerCase() > b.toLowerCase()) return 1;
		}
		else{
			//Parse strings as numbers to compare properly
			if(parseFloat(a) < parseFloat(b)) return -1;
			if(parseFloat(a) > parseFloat(b)) return 1;
		}

		return 0; //equal each other
	}

    transform(input:any, config:string = '+'): any{

    	//make a copy of the input's reference
    	this.value = [...input];
    	var value = this.value;
        
        if(!Array.isArray(value)) return value;

        if(!Array.isArray(config) || (Array.isArray(config) && config.length == 1)){
            var propertyToCheck:string = !Array.isArray(config) ? config : config[0];
            var desc = propertyToCheck.substr(0, 1) == '-';
            
            //Basic array
            if(!propertyToCheck || propertyToCheck == '-' || propertyToCheck == '+'){
                return !desc ? value.sort() : value.sort().reverse();
            }
            else {
                var property:string = propertyToCheck.substr(0, 1) == '+' || propertyToCheck.substr(0, 1) == '-'
                    ? propertyToCheck.substr(1)
                    : propertyToCheck;

                return value.sort(function(a:any,b:any){
                    return !desc 
                        ? OrderBy._orderByComparator(a[property], b[property]) 
                        : -OrderBy._orderByComparator(a[property], b[property]);
                });
            }
        }
        else {
            //Loop over property of the array in order and sort
            return value.sort(function(a:any,b:any){
                for(var i:number = 0; i < config.length; i++){
                    var desc = config[i].substr(0, 1) == '-';
                    var property = config[i].substr(0, 1) == '+' || config[i].substr(0, 1) == '-'
                        ? config[i].substr(1)
                        : config[i];

                    var comparison = !desc 
                        ? OrderBy._orderByComparator(a[property], b[property]) 
                        : -OrderBy._orderByComparator(a[property], b[property]);
                    
                    //Don't return 0 yet in case of needing to sort by next property
                    if(comparison != 0) return comparison;
                }

                return 0; //equal each other
            });
        }
    }
}
