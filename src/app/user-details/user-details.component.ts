import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

import { AuthModule } from '../auth/auth.module';
import { CommonDataModule } from '../common-data/common-data.module';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  public apiLink: any;
  public user_to_view_slug: any;
  public userData: any;
  public listOfOrderItems: any;
  public cartCode: any;
  public OrderStatus: any;
  public OrderConfirmed: any;
  public stopUserDetailsLoading: any;
  public currency: any;
  public totalCost: any;
  public loggedUserSlug: any;

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService, public http: HttpClient, private router: Router, private commonData: CommonDataModule, private auth: AuthModule) {

  	this.apiLink = "http://localhost:8000";

  	this.stopUserDetailsLoading = false;
  	this.loggedUserSlug = this.storage.get('89JHuitr_T__user_slug');

  	this.user_to_view_slug = this.storage.get('89JHuitr_T__user_to_view_slug');

  	this.testUserLogin();
  	this.getUserDetails();

  }

  ngOnInit() {
  }

  showLoading(loadingMessage: string) {

  	Swal({
	  // title: "Sweet!",
	  text: ""+loadingMessage,
	  allowOutsideClick: false,
	  showCancelButton: false,
	  showConfirmButton: false,
	  imageUrl: 'assets/img/loading-liquid.gif'
	});

  }

  showSuccessMessage(successMessage: string) {
  	Swal('Success!', successMessage, 'success');
  }

  showErrorMessage(errorMessage: string) {
  	Swal('Error!', errorMessage, 'error');
  }

  testUserLogin() {

  	this.auth.checkLogin().then((loginInfo) => {

      if((loginInfo != 'true')) {

        this.router.navigateByUrl('/login');
        
      }

     });

  }

  getUserDetails() {

  	var user_slug = this.storage.get('89JHuitr_T__user_slug');
  	var firebase_id = this.storage.get('89JHuitr_T__firebase_id');
  	var active_token = this.storage.get('89JHuitr_T__active_login_token');
  	var suggested_token = this.storage.get('89JHuitr_T__suggested_token');
  	var user_company_of_employment_slug = this.storage.get('89JHuitr_T__user_company_of_employment_slug');  

  	this.http.get(this.apiLink+'/rest_get_user_details/?user_company_of_employment_slug='+user_company_of_employment_slug+'&user_to_view_slug='+this.user_to_view_slug+'&user_slug='+user_slug+'&firebase_id='+firebase_id+'&active_token='+active_token+'&suggested_token='+suggested_token+'&format=json').subscribe(

  		userData => {			

  			this.stopUserDetailsLoading = true;

  			this.userData = userData;

  			},err => {
  		})

  }

  orderVerified(verifiedOrderCartCode: string) {

  	var user_slug = this.storage.get('89JHuitr_T__user_slug');
  	var firebase_id = this.storage.get('89JHuitr_T__firebase_id');
  	var active_token = this.storage.get('89JHuitr_T__active_login_token');
  	var suggested_token = this.storage.get('89JHuitr_T__suggested_token');

  	this.showLoading("Setting Up!");

  	this.http.get(this.apiLink+'/rest_verify_order/?verified_order_cart_code='+verifiedOrderCartCode+'&user_slug='+user_slug+'&firebase_id='+firebase_id+'&active_token='+active_token+'&suggested_token='+suggested_token+'&format=json').subscribe(

  		orderVerificationData => {

  			Swal.close();

  			if(orderVerificationData[0].result == '1')
  			{
  				this.showSuccessMessage(orderVerificationData[0].success);
  				this.getUserDetails();
  			}
  			else
  			{
  				this.showErrorMessage(orderVerificationData[0].error);
  			}

  			},err => {
  				Swal.close();
  		})

  }

  requestOrderVerified(cartCode: string) {

  	Swal({

  		title: 'Order payment confirmation',
  		text: 'Do you confirm payment of this order?',
  		type: 'warning',
  		showCancelButton: true,
  		confirmButtonText: 'Confirm',
  		cancelButtonText: 'Cancel'

  		}).then((result) => {
  			if (result.value) {

  				this.orderVerified(cartCode);

  			} else if (result.dismiss === Swal.DismissReason.cancel) {
  			}
  		})

  }

  logout() {

  	Swal({

  		title: 'Logout',
  		text: 'Do you want to logout?',
  		type: 'warning',
  		showCancelButton: true,
  		confirmButtonText: 'Confirm',
  		cancelButtonText: 'Cancel'

  		}).then((result) => {
  			if (result.value) {

  				this.storage.set('89JHuitr_T__user_is_logged', 'false');

  				this.router.navigateByUrl('/login');

  			} else if (result.dismiss === Swal.DismissReason.cancel) {
  			}
  		})

  }

  proceedToEmployeeProcess(requestedAction: string, employeeToProcessSlug: string) {

  	var user_slug = this.storage.get('89JHuitr_T__user_slug');
  	var firebase_id = this.storage.get('89JHuitr_T__firebase_id');
  	var active_token = this.storage.get('89JHuitr_T__active_login_token');
  	var suggested_token = this.storage.get('89JHuitr_T__suggested_token');
  	var user_company_of_employment_slug = this.storage.get('89JHuitr_T__user_company_of_employment_slug'); 

  	this.showLoading("Processing ...");

  	this.http.get(this.apiLink+'/rest_process_company_employee/?user_company_of_employment_slug='+user_company_of_employment_slug+'&requested_action='+requestedAction+'&employee_to_process_slug='+employeeToProcessSlug+'&user_slug='+user_slug+'&firebase_id='+firebase_id+'&active_token='+active_token+'&suggested_token='+suggested_token+'&format=json').subscribe(

  		employeeProcessData => {

  			Swal.close();

  			if(employeeProcessData[0].result == '1')
  			{
  				this.showSuccessMessage(employeeProcessData[0].success);
  				this.getUserDetails();
  			}
  			else
  			{
  				this.showErrorMessage(employeeProcessData[0].error);
  			}

  			},err => {
  				Swal.close();
  		})

  }

  processCompanyEmployee(requestedAction: string, employeeToProcessSlug: string) {

  	var confirmMessage = '';
  	var confirmMessageSubtitle = '';

  	if(requestedAction == 'deactivate') {
  		confirmMessage = 'Deactivate Employee';
  		confirmMessageSubtitle = 'Do you really want to deactivate employee?';
  	}
  	else
  	{
  		confirmMessage = 'Activate Employee';
  		confirmMessageSubtitle = 'Do you really want to activate employee?';
  	}

  	Swal({

  		title: confirmMessage,
  		text: confirmMessageSubtitle,
  		type: 'warning',
  		showCancelButton: true,
  		confirmButtonText: 'Proceed',
  		cancelButtonText: 'Cancel'

  		}).then((result) => {
  			if (result.value) {

  				this.proceedToEmployeeProcess(requestedAction, employeeToProcessSlug);

  			} else if (result.dismiss === Swal.DismissReason.cancel) {
  			}
  		})

  }
  
  

}
