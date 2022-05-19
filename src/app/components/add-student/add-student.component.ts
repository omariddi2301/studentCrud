import { Component, Inject, OnInit,  } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'


@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
subs$ !:Subscription;
userGender:any[]=[
  {name:'Male'},
  {name: 'Female'}
];

addStudent!:FormGroup;
ActionBtn:string = 'Save';
Heading:string = 'Register New Student';

  constructor(private fb:FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public getData:any,
    private dialogRef:MatDialogRef<AddStudentComponent>) { }

  ngOnInit(): void {

    this.addStudent = this.fb.group({
      name: [''],
      gender: [''],
      email: [''],
      phone: [''],
      course: [''],
      regNo: ['']
    });

    if(this.getData){

      this.ActionBtn='Update';
      this.Heading='Update Student Records';

      this.addStudent.controls['name'].setValue(this.getData.name);
      this.addStudent.controls['gender'].setValue(this.getData.gender);
      this.addStudent.controls['email'].setValue(this.getData.email);
      this.addStudent.controls['phone'].setValue(this.getData.phone);
      this.addStudent.controls['course'].setValue(this.getData.course);
      this.addStudent.controls['regNo'].setValue(this.getData.regNo);
    }

   }

   sendForm(){
  if(!this.getData){

    if(this.addStudent.valid){
    this.subs$ = this.api.postStudent(this.addStudent.value).subscribe({
      next:(res)=>{
           alert("Data Added sucessuflly");
           this.addStudent.reset();
           this.dialogRef.close('save');

      },
      error:(error)=>{

     alert("Error during sending data  " + error.string);
      }
    });
  }
}
  else{
   this.update();
  }
}

update(){
   this.api.putStudent(this.addStudent.value, this.getData.id).subscribe({
    next:(res)=>{
      alert('Student Updated Sucessfully');
      this.addStudent.reset();
      this.dialogRef.close('update');
    },
    error:(err)=>{
      alert('Error While Update Data' + err.string);
    }
  });
}

}
