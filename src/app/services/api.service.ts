import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
 url:string = "http://localhost:3000/students";

  postStudent(data:any){
    return this.http.post<any>(this.url,data);
  }

  getStudent(){
    return this.http.get<any>(this.url)
  }
  putStudent(data:any, id:number){
    return this.http.put<any>(this.url+'/'+ id, data);
  }

  delete(id:number){
    return this.http.delete<any>("http://localhost:3000/students/"+id);
  }

}
