import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

import { AuthModule } from '../auth/auth.module';
import { CommonDataModule } from '../common-data/common-data.module';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  public apiLink: any;
  public order_to_view_cart_code: any;
  public orderData: any;
  public listOfOrderItems: any;
  public cartCode: any;
  public OrderStatus: any;
  public OrderConfirmed: any;
  public billaCoveragePaid: any;
  public stopOrderDetailssLoading: any;
  public currency: any;
  public totalCost: any;
  public paymentMethod: any;

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService, public http: HttpClient, private router: Router, private commonData: CommonDataModule, private auth: AuthModule) {

  	this.apiLink = "http://localhost:8000";

  	this.stopOrderDetailssLoading = false;

  	this.order_to_view_cart_code = this.storage.get('89JHuitr_T__order_to_view_cart_code');

  	this.testUserLogin();
  	this.getOrderDetails();
  	this.getOrderItems();
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
  	Swal('Success!', errorMessage, 'error');
  }

  testUserLogin() {

  	this.auth.checkLogin().then((loginInfo) => {

      if((loginInfo != 'true')) {

        this.router.navigateByUrl('/login');
        
      }

     });

  }

  getOrderDetails() {

  	var user_slug = this.storage.get('89JHuitr_T__user_slug');
  	var firebase_id = this.storage.get('89JHuitr_T__firebase_id');
  	var active_token = this.storage.get('89JHuitr_T__active_login_token');
  	var suggested_token = this.storage.get('89JHuitr_T__suggested_token');  	
  	var user_company_of_employment_slug = this.storage.get('89JHuitr_T__user_company_of_employment_slug');

  	this.http.get(this.apiLink+'/rest_get_order_details/?user_company_of_employment_slug='+user_company_of_employment_slug+'&order_to_view_cart_code='+this.order_to_view_cart_code+'&user_slug='+user_slug+'&firebase_id='+firebase_id+'&active_token='+active_token+'&suggested_token='+suggested_token+'&completed_operations=false&items_checked_out=true&unprocessed=true&in_order_details=true&format=json').subscribe(

  		orderData => {

  			// hide loadings

  			this.cartCode = orderData[0].cart_code;
  			this.currency = orderData[0].product_from_partner_currency_code;
  			this.totalCost = orderData[0].total_cart_cost;
        this.paymentMethod = orderData[0].payment_method;

  			if((orderData[0].purchase_confirmed == 'true')||(orderData[0].purchase_confirmed == true)||(orderData[0].purchase_confirmed == 'True'))
  			{
  				this.OrderConfirmed = true;
  				this.OrderStatus = 'Payment confirmed';

          if((orderData[0].coverage_paid == 'true')||(orderData[0].coverage_paid == true)||(orderData[0].coverage_paid == 'True'))
          {
            this.billaCoveragePaid = true;
          }

  			}
  			else
  			{
  				this.OrderConfirmed = false;
  				this.OrderStatus = 'Waiting for payment confirmation';
  			}  			

  			this.stopOrderDetailssLoading = true;

  			this.orderData = orderData;

  			},err => {
  		})

  }

  getOrderItems() {

  	var user_slug = this.storage.get('89JHuitr_T__user_slug');
  	var firebase_id = this.storage.get('89JHuitr_T__firebase_id');
  	var active_token = this.storage.get('89JHuitr_T__active_login_token');
  	var suggested_token = this.storage.get('89JHuitr_T__suggested_token');
  	var user_company_of_employment_slug = this.storage.get('89JHuitr_T__user_company_of_employment_slug');

  	this.http.get(this.apiLink+'/rest_get_orders_list/?user_company_of_employment_slug='+user_company_of_employment_slug+'&order_to_view_cart_code='+this.order_to_view_cart_code+'&user_slug='+user_slug+'&firebase_id='+firebase_id+'&active_token='+active_token+'&suggested_token='+suggested_token+'&in_order_details=true&format=json').subscribe(

  		listOfOrderItems => {

  			// hide loadings

  			this.listOfOrderItems = listOfOrderItems;

  			},err => {
  		})

  }

  orderVerified(verifiedOrderCartCode: string) {

  	var user_slug = this.storage.get('89JHuitr_T__user_slug');
  	var firebase_id = this.storage.get('89JHuitr_T__firebase_id');
  	var active_token = this.storage.get('89JHuitr_T__active_login_token');
  	var suggested_token = this.storage.get('89JHuitr_T__suggested_token');

  	this.showLoading("Setting Up!");

  	this.http.get(this.apiLink+'/rest_verify_order/?action=verify&verified_order_cart_code='+verifiedOrderCartCode+'&user_slug='+user_slug+'&firebase_id='+firebase_id+'&active_token='+active_token+'&suggested_token='+suggested_token+'&format=json').subscribe(

  		orderVerificationData => {

  			Swal.close();

  			if(orderVerificationData[0].result == '1')
  			{
  				this.showSuccessMessage(orderVerificationData[0].success);
  				this.getOrderDetails();
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

  billaCreditReimbursed(orderCartCode: string) {

    var user_slug = this.storage.get('89JHuitr_T__user_slug');
    var firebase_id = this.storage.get('89JHuitr_T__firebase_id');
    var active_token = this.storage.get('89JHuitr_T__active_login_token');
    var suggested_token = this.storage.get('89JHuitr_T__suggested_token');

    this.showLoading("Setting Up!");

    this.http.get(this.apiLink+'/rest_verify_order/?action=reimbursed&verified_order_cart_code='+orderCartCode+'&user_slug='+user_slug+'&firebase_id='+firebase_id+'&active_token='+active_token+'&suggested_token='+suggested_token+'&format=json').subscribe(

      billaCreditReimbursmentData => {

        Swal.close();

        if(billaCreditReimbursmentData[0].result == '1')
        {
          this.showSuccessMessage(billaCreditReimbursmentData[0].success);
          this.getOrderDetails();
        }
        else
        {
          this.showErrorMessage(billaCreditReimbursmentData[0].error);
        }

        },err => {
          Swal.close();
      })

  }

  requestBillaCreditPayment(cartCode: string) {

    Swal({

      title: 'Billa Credit Payment',
      text: 'Do you confirm that this billa credit has already been reimbursed?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel'

      }).then((result) => {
        if (result.value) {

          this.billaCreditReimbursed(cartCode);

        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
      })

  }

}
