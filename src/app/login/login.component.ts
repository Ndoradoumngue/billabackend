import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import swal from 'sweetalert2';

import { AuthModule } from '../auth/auth.module';
import { CommonDataModule } from '../common-data/common-data.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  public apiLink: any;
  public loginEmailAddress: any;
  public loginPassword: any;
  public loginErrorMessage: any;

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService, public http: HttpClient, private router: Router, private auth: AuthModule, private afAuth: AngularFireAuth, private commonData: CommonDataModule) {

  	this.apiLink = "http://localhost:8000";

  	this.testUserLogin();

  }

  showLoading(loadingMessage: string) {

  	swal({
	  // title: "Sweet!",
	  text: ""+loadingMessage,
	  allowOutsideClick: false,
	  showCancelButton: false,
	  showConfirmButton: false,
	  imageUrl: 'assets/img/loading-liquid.gif'
	});

  }

  ngOnInit() {
  }

  showErrorAlert(errorMessage: string) {

  	swal("Error!", errorMessage, "error");

  }

  showSuccessAlert(successMessage: string) {

  	swal("Success!", successMessage, "success");

  }

  showInfoAlert(information: string) {

    swal("Info", information, "info");

  }

  testUserLogin() {

  	this.auth.checkLogin().then((loginInfo) => {

      if((loginInfo == 'true')) {

        this.router.navigateByUrl('/dashbord');
        
      }

     });

  }

  // login section

  requestFirebaseEmailLogin(){

  	var suppliedLoginEmailAddress = this.loginEmailAddress;
  	var suppliedLoginPassword = this.loginPassword;
  	
  	if((suppliedLoginEmailAddress == '')||(suppliedLoginEmailAddress == undefined)||(suppliedLoginEmailAddress == 'undefined')||(suppliedLoginEmailAddress == null)||(suppliedLoginEmailAddress == 'null')
  		||(suppliedLoginPassword == '')||(suppliedLoginPassword == undefined)||(suppliedLoginPassword == 'undefined')||(suppliedLoginPassword == null)||(suppliedLoginPassword == 'null'))
  	{
  		this.showErrorAlert("Please supply your login credentials to proceed!");
  	}
  	else
  	{
  		this.showLoading("Setting Up!");

  		this.doFirebaseEmailLogin(suppliedLoginEmailAddress, suppliedLoginPassword).then(res => {

  			var userFirebaseID = res.user.uid;

  			swal.close();

  			this.proceedToDjangoLogin(userFirebaseID, suppliedLoginEmailAddress, suppliedLoginPassword);

  			}, err => {

  				swal.close();

  				this.loginErrorMessage = err.message;

  				})

  	}

  }

  doFirebaseEmailLogin(email: string, pass: string){

  	return new Promise<any>((resolve, reject) => {

  		firebase.auth().signInWithEmailAndPassword(email, pass).then(res => {

  			resolve(res);

  			}, err => reject(err))
  		})

  }

  proceedToDjangoLogin(firebase_id: string, email_address: string, pass: string) {

  	this.showLoading("Authenticating ... ");

  	this.http.get(this.apiLink+'/rest_authentication/?authentication_type=login&firebase_id='+firebase_id+'&email_address='+email_address+'&user_password='+pass+'&format=json').subscribe(

  		djangoLoginData => {

  			swal.close();

  			if(djangoLoginData[0].result == '1')
  			{
  				this.storage.set('89JHuitr_T__active_login_token', djangoLoginData[0].active_login_token);
  				this.storage.set('89JHuitr_T__user_is_logged', 'true');
  				this.storage.set('89JHuitr_T__email', djangoLoginData[0].email);
          this.storage.set('89JHuitr_T__user_company_of_employment_slug', djangoLoginData[0].user_company_of_employment_slug);
  				this.storage.set('89JHuitr_T__firebase_id', djangoLoginData[0].firebase_id);
  				this.storage.set('89JHuitr_T__user_slug', djangoLoginData[0].the_user_slug);
  				this.storage.set('89JHuitr_T__profile_image_url', djangoLoginData[0].profile_image_url);
                    
  				// this.showSuccessAlert(djangoLoginData[0].success);

          if((djangoLoginData[0].is_billa_employee == true)||(djangoLoginData[0].is_billa_employee == 'true')||(djangoLoginData[0].is_billa_employee == 'True'))
          {
            this.storage.set('89JHuitr_T__is_billa_employee', 'true');

            swal({
              title: 'Billa Administrator',
              text: 'Would you like to access Billa Administrator section?',
              type: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Yes',
              cancelButtonText: 'No'
            }).then((result) => {
              if (result.value) {
                this.router.navigateByUrl('/billa-administrator');
              } else if (result.dismiss === swal.DismissReason.cancel) {
                this.router.navigateByUrl('/dashbord');
              }
            })

          }
          else
          {
            this.storage.set('89JHuitr_T__is_billa_employee', 'false');
            this.router.navigateByUrl('/dashbord');
          }

  				

  				// this.signupErrorMessage = "";
  				// this.signupSuccessMessage = djangoLoginData[0].success;
  			}
  			else
  			{
  				this.showErrorAlert(djangoLoginData[0].error);
  				this.loginErrorMessage = djangoLoginData[0].error;
  			}

  			},err => {

  				swal.close();
  		})

  }


}
