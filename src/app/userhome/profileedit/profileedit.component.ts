import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendserviceService } from 'src/app/backendservice.service';

@Component({
  selector: 'app-profileedit',
  templateUrl: './profileedit.component.html',
  styleUrls: ['./profileedit.component.scss']
})
export class ProfileeditComponent {

  uid:any;
  // static flag:boolean=true
  Profiledataarray: any[]=[];
  // ProfileEditForm: FormGroup;

  constructor(private fb:FormBuilder,private router:Router,private backendservice:BackendserviceService,private route:ActivatedRoute){
this.uid=localStorage.getItem("uid")

  }

  ProfileEditForm=this.fb.group({
    pid:[''],
    firstname:[''],
    lastname:[''],
    uid:[''],
    dob:[''],
    phno:[''],
    address:[''],
    pin:[''],
    idno:[''],
    dlno:[''],
    email:[''],
    education:[''],
    passno:[''],
    bano:[''],
    country:[''],
    state:['']
  })

  ngOnInit(): void {
    
    let uid=localStorage.getItem("uid")
    
    this.backendservice.viewprofiledata(uid).subscribe((data: any) => {
      this.Profiledataarray = data;
      if(this.Profiledataarray==null)
      {
    this.router.navigate(['/userhome/profileinsert'])
      }
      this.ProfileEditForm.setValue({
       pid:data.pid,
        uid:localStorage.getItem("uid"),
        firstname: data.firstname,
        lastname: data.lastname,
        dob:data.dob,
        phno:data.phno,
        address:data.address,
        pin:data.pin,
        idno:data.idno,
        dlno:data.dlno,
        email:data.email,
        education:data.education,
        passno:data.passno,
        bano:data.bano,
        country:data.country,
        state:data.state

    });
    
  });
  
  }

  OnSubmit()
  {
      this.backendservice.updateprofiledata(this.ProfileEditForm.value)
      this.router.navigate(['/userhome/profile']);
  }
}
