import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions,Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AppService {
	data: Object;

  constructor(private http: Http) { }

   getData = () => {
   		 return http.get('data.json');
   }
    

}
