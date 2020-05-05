import { Component, OnInit } from '@angular/core';
import { BackendServiceService } from 'service/backend-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display-calories',
  templateUrl: './display-calories.component.html',
  styleUrls: ['./display-calories.component.css']
})
export class DisplayCaloriesComponent implements OnInit {

  error: boolean = false;
  errorMessage: String = "";
  dataLoading: boolean = false;
  private querySubscription;
  savedChanges: boolean = false;
  calorieList = new Array();
  totalCalories: number = 0; 
  
  constructor(private bService: BackendServiceService, private _route: Router) { }

  ngOnInit(): void {
  }

  display(formData)
  {
    //console.log(formData);
    /*let newUser = new UserComponent();
    newUser.setName(formData.fullName);
    newUser.setPhone(formData.phone);
    newUser.setPhone(formData.email);
    newUser.setPhone(formData.target);*/
      
    this.dataLoading = true;
    this.querySubscription = this.bService.displayService(formData).subscribe(
      (res) => {
        if (res["errorCode"] > 0) {
          this.error = false;
          this.errorMessage = "";
          this.dataLoading = false;
          this.savedChanges = true;
          console.log("Query Error");
        } else {
          this.error = true;
          this.errorMessage =res["errorMessage"];
          this.calorieList = res["data"];
          this.dataLoading = false;
          console.log("Query Success");
          
          for(var i = 0; i < res["data"].length; i++)
          { 
              this.totalCalories += parseInt(this.calorieList[i].calorie, 10);
              
              
              console.log("Calories: " + this.totalCalories);  
          }
        }
      },
      (error) => {
        this.error = true;
        this.errorMessage = error.message;
        this.dataLoading = false;
        console.log("Connection Error");

      },
      
      () => {
          this.dataLoading = false;
      }
    );    
   }
}


