import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../userservice.service';
import { User } from 'modules/user';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent implements OnInit {
 public users:User [];
 public message;
 public flag = true;
 saveData = new User();

 constructor(private _userservice:UserserviceService){}
 ngOnInit() {
  this._userservice.getUser().subscribe(data=>{
    this.users = data;
    console.log(this.users);
  },
  (error:HttpErrorResponse)=>{
    console.log('Something went wrong !\nMessage: ',error.message);
  }); 
}
 OnSubmit(id,name,company,description) { 
  let dupCount = 0;
  let typeErrorID = 0;
  let EmptyErrorID = 0;

  if(id==='0'||id==''){
    EmptyErrorID = 1;
  }
    for(let i=0;i<this.users.length;i++){
      if(this.users[i].id===id){
        dupCount = 1;
        console.log('Duplicate Found. UserID: ',this.users[i].id);
        continue;
    }
  }
 
  if(dupCount==0&&EmptyErrorID==0){
  this.saveData.id = id;
  this.saveData.name = name;
  this.saveData.company = company;
  this.saveData.description = description;
    this._userservice.saveUser(this.saveData).subscribe(
      data => {
        this.flag = false;
        console.log('Success',data);
      this.message = `The User with ID : ${id} has been successfully submitted.`;
    },
      error => {
        this.flag = false;
        console.log('Error',error);
        this.message = `Something went Wrong!
        User submission for ID :${id} is terminated.Please try again`
      });
  }
  else
  if(EmptyErrorID===1){
    this.message = 'Please enter a valid ID';
  }
  else
    {
    this.message = `The User : ${id} already exists.`;
  }
  
} 
} 

