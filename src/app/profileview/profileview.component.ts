import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-profileview',
  templateUrl: './profileview.component.html',
  styleUrls: ['./profileview.component.css']
})
export class ProfileviewComponent implements OnInit {
  profileview :any[]=[];
  constructor(private router: Router) { }

  ngOnInit() {
    var res=localStorage.getItem("userDetails");
    this.profileview=JSON.parse(res);
    console.log(this.profileview);
  }

  // editProfile(){
  //   this.router.navigateByUrl('register/edit')
  // }

}
