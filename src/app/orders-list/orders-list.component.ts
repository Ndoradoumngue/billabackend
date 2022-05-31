import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

import { AuthModule } from '../auth/auth.module';
import { CommonDataModule } from '../common-data/common-data.module';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {

  public apiLink: any;
  public unprocessedOrdersData: any;

  public stopUnprocessedOrdersLoading: any;
  public loopUnprocessedOrdersFetch: any;

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService, public http: HttpClient, private router: Router, private commonData: CommonDataModule, private auth: AuthModule) {

  	this.apiLink = "http://localhost:8000";

  	this.stopUnprocessedOrdersLoading = false;

  	this.testUserLogin();
  	this.launchUnprocessedOrdersFetch();
  }

  ngOnInit() {
  }

  testUserLogin() {

  	this.auth.checkLogin().then((loginInfo) => {

      if((loginInfo != 'true')) {

        this.router.navigateByUrl('/login');
        
      }

     });

  }

  getUnprocessedOrders() {

  	var user_slug = this.storage.get('89JHuitr_T__user_slug');
  	var firebase_id = this.storage.get('89JHuitr_T__firebase_id');
  	var active_token = this.storage.get('89JHuitr_T__active_login_token');
  	var suggested_token = this.storage.get('89JHuitr_T__suggested_token');
  	var user_company_of_employment_slug = this.storage.get('89JHuitr_T__user_company_of_employment_slug');

  	this.http.get(this.apiLink+'/rest_get_orders_list/?user_company_of_employment_slug='+user_company_of_employment_slug+'&user_slug='+user_slug+'&firebase_id='+firebase_id+'&active_token='+active_token+'&suggested_token='+suggested_token+'&completed_operations=false&items_checked_out=true&unprocessed=true&format=json').subscribe(

  		unprocessedOrdersData => {

  			// hide loadings

  			this.stopUnprocessedOrdersLoading = true;

  			this.unprocessedOrdersData = unprocessedOrdersData;

  			},err => {
  		})

  }

  launchUnprocessedOrdersFetch() {

  	return new Promise((resolve) => {

  		this.loopUnprocessedOrdersFetch = setInterval(() => {

  			this.getUnprocessedOrders();

  			// clearInterval(this.loopUnprocessedOrdersFetch);

  			}, 1000);

  		resolve('done');

  		});

  }

  viewOrderDetails(orderCode: string) {

  	this.storage.set('89JHuitr_T__order_to_view_cart_code', orderCode);

  	this.router.navigateByUrl('/order-details');

  }

}
