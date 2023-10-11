import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {

  li:any;
  lis=[];
  constructor(private http : HttpClient,private router:Router){
     
}
ngOnInit(): void {
  this.http.get('http://localhost:3000/employees')
  .subscribe(Response => {

    // If response comes hideloader() function is called
    // to hide that loader
    if(Response){ 
      hideloader();
    }
    console.log(Response)
    this.li=Response;
    this.lis=this.li;
  });
  function hideloader(){
    document.getElementById('loading').style.display = 'none';}
}
logout(){
localStorage.clear();
this.router.navigate(['login']);
}
}
