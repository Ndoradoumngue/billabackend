import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

import { AuthModule } from '../auth/auth.module';
import { CommonDataModule } from '../common-data/common-data.module';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {  
  
  public apiLink: any;
  public currency: any;
  public mostSoldItemsData: any;
  public unprocessedOrdersData: any;
  public loopDailystatisticsFetch: any;
  public loopUnprocessedOrdersFetch: any;
  public orderVerificationData: any;
  public loopMostSoldItemsFetch: any;

  public numberOfSoldItems: any;
  public stopSoldItemsNumbersLoading: any;

  public totalRevenue: any;
  public stopTotalRevenueLoading: any;

  public numberOfCustomers: any;
  public stopNumberOfCustomersLoading: any;

  public numberOfSupportedTickets: any;
  public stopNumberOfSupportedTicketsLoading: any;

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService, public http: HttpClient, private router: Router, private commonData: CommonDataModule, private auth: AuthModule) {

  	this.apiLink = "http://localhost:8000";

  	this.stopSoldItemsNumbersLoading = false;
  	this.stopTotalRevenueLoading = false;
  	this.stopNumberOfCustomersLoading = false;
  	this.stopNumberOfSupportedTicketsLoading = false;

  	this.testUserLogin();
  	this.launchDailystatisticsFetch();
  	this.launchUnprocessedOrdersFetch();
  	this.launchMostSoldItemsFetch();

  }


  chartOptions = {
    responsive: true
  };

  chartData = [
    { data: [330, 600, 260, 700], label: 'Account A' },
    { data: [120, 455, 100, 340], label: 'Account B' },
    { data: [45, 67, 800, 500], label: 'Account C' }
  ];

  chartLabels = ['January', 'February', 'Mars', 'April'];

  onChartClick(event) {
    console.log(event);
  }

  showSuccessMessage(successMessage: string) {
  	Swal('Success!', successMessage, 'success');
  }

  showErrorMessage(errorMessage: string) {
  	Swal('Success!', errorMessage, 'error');
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

  getDailyStatistics() {

  	var user_slug = this.storage.get('89JHuitr_T__user_slug');
  	var firebase_id = this.storage.get('89JHuitr_T__firebase_id');
  	var active_token = this.storage.get('89JHuitr_T__active_login_token');
  	var suggested_token = this.storage.get('89JHuitr_T__suggested_token');
  	var user_company_of_employment_slug = this.storage.get('89JHuitr_T__user_company_of_employment_slug');  	

  	this.http.get(this.apiLink+'/rest_get_daily_statistics/?user_company_of_employment_slug='+user_company_of_employment_slug+'&user_slug='+user_slug+'&firebase_id='+firebase_id+'&active_token='+active_token+'&suggested_token='+suggested_token+'&statistics_of_today=true&completed_operations=true&format=json').subscribe(

  		dailyStatisticsData => {

  			// hide loadings

  			this.numberOfSoldItems = dailyStatisticsData[0].number_of_items_sold;
  			this.stopSoldItemsNumbersLoading = true;

  			this.currency = 'KES';

  			this.totalRevenue = dailyStatisticsData[0].amount_for_items_sold;
  			this.stopTotalRevenueLoading = true;

  			this.numberOfCustomers = dailyStatisticsData[0].number_of_clients;
  			this.stopNumberOfCustomersLoading = true;

  			this.numberOfSupportedTickets = dailyStatisticsData[0].number_of_addressed_support_tickets;
  			this.stopNumberOfSupportedTicketsLoading = true;

  			},err => {
  		})

  }

  launchDailystatisticsFetch() {

  	return new Promise((resolve) => {

  		this.loopDailystatisticsFetch = setInterval(() => {

  			this.getDailyStatistics();

  			// clearInterval(this.loopDailystatisticsFetch);

  			}, 1000);

  		resolve('done');

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

  getMostSoldItems() {

  	var user_slug = this.storage.get('89JHuitr_T__user_slug');
  	var firebase_id = this.storage.get('89JHuitr_T__firebase_id');
  	var active_token = this.storage.get('89JHuitr_T__active_login_token');
  	var suggested_token = this.storage.get('89JHuitr_T__suggested_token');
  	var user_company_of_employment_slug = this.storage.get('89JHuitr_T__user_company_of_employment_slug');

  	this.http.get(this.apiLink+'/rest_get_list_of_most_sold_items/?user_company_of_employment_slug='+user_company_of_employment_slug+'&user_slug='+user_slug+'&firebase_id='+firebase_id+'&active_token='+active_token+'&suggested_token='+suggested_token+'&sales_of_today=true&completed_operations=true&items_checked_out=true&format=json').subscribe(

  		mostSoldItemsData => {

  			// hide loadings

  			this.mostSoldItemsData = mostSoldItemsData;

  			},err => {
  		})

  }

  launchMostSoldItemsFetch() {

  	return new Promise((resolve) => {

  		this.loopMostSoldItemsFetch = setInterval(() => {

  			this.getMostSoldItems();

  			// clearInterval(this.loopMostSoldItemsFetch);

  			}, 1000);

  		resolve('done');

  		});

  }

  orderVerified(verifiedOrderSlug: string) {

  	var user_slug = this.storage.get('89JHuitr_T__user_slug');
  	var firebase_id = this.storage.get('89JHuitr_T__firebase_id');
  	var active_token = this.storage.get('89JHuitr_T__active_login_token');
  	var suggested_token = this.storage.get('89JHuitr_T__suggested_token');

  	this.http.get(this.apiLink+'/rest_verify_order/?verified_order_slug='+verifiedOrderSlug+'&user_slug='+user_slug+'&firebase_id='+firebase_id+'&active_token='+active_token+'&suggested_token='+suggested_token+'&format=json').subscribe(

  		orderVerificationData => {

  			if(orderVerificationData[0].result == '1')
  			{
  				this.showSuccessMessage(orderVerificationData[0].success);
  			}
  			else
  			{
  				this.showErrorMessage(orderVerificationData[0].error);
  			}

  			},err => {
  		})

  }

  requestOrderVerified(verifiedOrderSlug: string) {

  	Swal({

  		title: 'Order payment confirmation',
  		text: 'Do you confirm payment of this order?',
  		type: 'warning',
  		showCancelButton: true,
  		confirmButtonText: 'Confirm',
  		cancelButtonText: 'Cancel'

  		}).then((result) => {
  			if (result.value) {

  				this.orderVerified(verifiedOrderSlug);

  			} else if (result.dismiss === Swal.DismissReason.cancel) {
  			}
  		})

  }

  viewItemsSoldToday() {

    this.commonData.getSalesOfToday = 'true';

    this.router.navigateByUrl('/sales-report');
  }

  viewTicketsOfToday() {

    this.router.navigateByUrl('/customer-support');
  }

  viewOrderDetails(orderCode: string) {

    this.storage.set('89JHuitr_T__order_to_view_cart_code', orderCode);

    this.router.navigateByUrl('/order-details');

  }

}



