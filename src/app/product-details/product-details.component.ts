import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2'

import { AuthModule } from '../auth/auth.module';
import { CommonDataModule } from '../common-data/common-data.module';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  public apiLink: any;
  public productToViewSlug: any;
  public productData: any;
  public stopProductDetailssLoading: any;

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService, public activatedRoute: ActivatedRoute, public http: HttpClient, private router: Router, private commonData: CommonDataModule, private auth: AuthModule) {

  	this.apiLink = "http://localhost:8000";

  	this.stopProductDetailssLoading = false; 

  	this.testUserLogin();

  	this.activatedRoute.queryParams.subscribe(params => {
  		const product_slug = params['product'];

        if((product_slug == '')||(product_slug == 'None')||(product_slug == 'none')||(product_slug == undefined)||(product_slug == 'undefined')||(product_slug == null)||(product_slug == 'null'))
        {        	
        	this.productToViewSlug = this.storage.get('89JHuitr_T__product_to_view_slug');
        }
        else
        {
        	this.productToViewSlug = product_slug;
        }

        this.getProductDetails();

      });

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

  getProductDetails() {

  	var user_slug = this.storage.get('89JHuitr_T__user_slug');
  	var firebase_id = this.storage.get('89JHuitr_T__firebase_id');
  	var active_token = this.storage.get('89JHuitr_T__active_login_token');
  	var suggested_token = this.storage.get('89JHuitr_T__suggested_token');  	
  	var user_company_of_employment_slug = this.storage.get('89JHuitr_T__user_company_of_employment_slug');

  	this.http.get(this.apiLink+'/rest_partner_product_details/?user_company_of_employment_slug='+user_company_of_employment_slug+'&product_slug='+this.productToViewSlug+'&user_slug='+user_slug+'&firebase_id='+firebase_id+'&active_token='+active_token+'&suggested_token='+suggested_token+'&format=json').subscribe(

  		productData => {

  			if(productData[0].result == '0')
  			{
  				this.showErrorMessage(productData[0].error);

  				this.router.navigateByUrl('/products');
  			}
  			else
  			{
  				this.stopProductDetailssLoading = true;

  				this.productData = productData;
  			}  			

  			},err => {
  		})

  }

  viewUserDetails(userSlug: string) {

  	this.storage.set('89JHuitr_T__user_to_view_slug', userSlug);

  	this.router.navigateByUrl('/user-details');

  }

  editProduct()
  {
    var user_slug = this.storage.get('89JHuitr_T__user_slug');
    var firebase_id = this.storage.get('89JHuitr_T__firebase_id');
    var active_token = this.storage.get('89JHuitr_T__active_login_token');
    var suggested_token = this.storage.get('89JHuitr_T__suggested_token');
    var user_company_of_employment_slug = this.storage.get('89JHuitr_T__user_company_of_employment_slug');

    this.http.get(this.apiLink+'/rest_generate_user_add_product_token/?user_company_of_employment_slug='+user_company_of_employment_slug+'&user_slug='+user_slug+'&firebase_id='+firebase_id+'&active_token='+active_token+'&suggested_token='+suggested_token+'&format=json').subscribe(

      addNewProductRequestData => {

        if(addNewProductRequestData[0].result == '1')
        {
          window.location.href = this.apiLink+'/add-partner-product?token='+addNewProductRequestData[0].token+'&product='+this.productToViewSlug+'&user='+user_slug;
        }
        else
        {
          this.showErrorMessage(addNewProductRequestData[0].error);
        }

        },err => {
      })
  }

  alterProduct(requestedAction: string)
  {
    var user_slug = this.storage.get('89JHuitr_T__user_slug');
    var firebase_id = this.storage.get('89JHuitr_T__firebase_id');
    var active_token = this.storage.get('89JHuitr_T__active_login_token');
    var suggested_token = this.storage.get('89JHuitr_T__suggested_token');
    var user_company_of_employment_slug = this.storage.get('89JHuitr_T__user_company_of_employment_slug');

    this.http.get(this.apiLink+'/rest_alter_partner_product/?user_company_of_employment_slug='+user_company_of_employment_slug+'&user_slug='+user_slug+'&firebase_id='+firebase_id+'&active_token='+active_token+'&suggested_token='+suggested_token+'&product_slug='+this.productToViewSlug+'&action='+requestedAction+'&format=json').subscribe(

      alterProductData => {

        if(alterProductData[0].result == '1')
        {
        	this.showSuccessMessage(alterProductData[0].success);
        	this.getProductDetails();
        }
        else
        {
          this.showErrorMessage(alterProductData[0].error);
        }

        },err => {
      })
  }


}
