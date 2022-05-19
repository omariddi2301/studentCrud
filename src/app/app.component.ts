import { Component, OnInit, ViewChild, OnDestroy, inject, Inject} from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { AddStudentComponent } from './components/add-student/add-student.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { ApiService } from './services/api.service';
import { Subscription } from 'rxjs';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CrudApp';
  subs$ !:Subscription;

   displayedColumns: string[] = ['id', 'name', 'gender','phone', 'email',  'course','regNo','edit','delete'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

constructor(public dialog: MatDialog,
    private api: ApiService,

  ){}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

openDialog(){
  this.dialog.open(AddStudentComponent,{
     width:'30%',
  }).afterClosed().subscribe(val=>
    {
      if(val==='save'){
        this.getStudent();
      }
    });
}
getStudent(){
  return this.subs$ = this.api.getStudent().subscribe({
    next:(res)=>{
      // console.log(res);
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
    error:(err)=>{
      console.log(err.string)
    }
  });
}

editStudent(row:any){
  this.dialog.open(AddStudentComponent,{
    width:'30%',
    data:row
 }).afterClosed().subscribe(val=>
  {
    if(val==='update'){
      this.getStudent();
    }
  });;
}

deleteStudent(id:number){
   this.api.delete(id).subscribe({
      next:()=>{
        alert('Student Deleted');
        this.getStudent();
      },
      error:(err)=>{
        alert('Error While Delete Data '+err.string);
      }
  });
}

ngOnInit(): void {
this.getStudent();
}

ngOnDestroy():void{
 this.subs$ && this.subs$.unsubscribe();
}


}
