import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

import { AuthModule } from '../auth/auth.module';
import { CommonDataModule } from '../common-data/common-data.module';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})
export class SalesReportComponent implements OnInit {

  public apiLink: any;
  public salesData: any;
  public employeesList: any;
  public showFilters: any; 
  public hideButtonFilters: any;
  public showButtonFilters: any; 
  public stopSalesDataFetchLoading: any;
  public loopSalesDataFetch: any;
  public salesFromDate: any;
  public salesToDate: any;
  public salesMadeByEmployeeSlug: any;
  public salesFromFormatedDate: any;
  public salesToFormatedDate: any;
  public currentPage: any;
  public salesDataSubtitle: any;
  public numberOfReturnedSalesDataTitle: any;
  public salesMadeByEmployeeLName: any;
  public salesMadeByEmployeeFName: any;
  public extractedEmployeeSlugData: any;
  public noMoreDataToReturn: any;
  public totalRevenue: any;
  public partnerCurrency: any;
  public totalNumberOfProducts: any;
  public paymentMethod: any;

  myOptions: INgxMyDpOptions = {
        // other options...
        dateFormat: 'dd.mm.yyyy',
    };

    // Initialized to specific date (09.10.2018)
    model: any = { date: { year: 2018, month: 10, day: 9 } };

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService, public http: HttpClient, private router: Router, private commonData: CommonDataModule, private auth: AuthModule) {

  	this.apiLink = "http://localhost:8000";

  	this.hideButtonFilters = false;
  	this.showButtonFilters = true;
  	this.stopSalesDataFetchLoading = false;

  	this.testUserLogin();    

    if(this.commonData.getSalesOfToday == 'true') {

      var today = new Date();
      var current_day = today.getDate();
      var current_month = today.getMonth()+1;
      var current_year = today.getFullYear();

      var today_date = current_year+'-'+current_month+'-'+current_day;

      this.getSalesReport('', today_date, today_date, this.paymentMethod, this.salesMadeByEmployeeSlug);

    }
    else
    {
      this.getSalesReport('', '', '', '', this.salesMadeByEmployeeSlug);
    }

  	this.launchSalesReportFetch();
  	this.getEmployeesList();
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

  showInfoMessage(information: string) {
  	Swal('Info!', information, 'info');
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

  getNumberOfReturnedalesReport(requestedPage: string, salesFromDate: string, salesToDate: string, salesMadeByEmployeeSlug: string) {

  	var user_slug = this.storage.get('89JHuitr_T__user_slug');
  	var firebase_id = this.storage.get('89JHuitr_T__firebase_id');
  	var active_token = this.storage.get('89JHuitr_T__active_login_token');
  	var suggested_token = this.storage.get('89JHuitr_T__suggested_token');
  	var user_company_of_employment_slug = this.storage.get('89JHuitr_T__user_company_of_employment_slug');

  	this.http.get(this.apiLink+'/rest_get_number_of_returned_sales_data/?paginate=true&requested_page='+requestedPage+'&user_company_of_employment_slug='+user_company_of_employment_slug+'&sales_from_date='+salesFromDate+'&sales_to_date='+salesToDate+'&sales_of_employee_slug='+salesMadeByEmployeeSlug+'&user_slug='+user_slug+'&firebase_id='+firebase_id+'&active_token='+active_token+'&suggested_token='+suggested_token+'&completed_operations=true&items_checked_out=true&format=json').subscribe(

  		numberOfReturnedSalesData => {

  			if(numberOfReturnedSalesData[0].result == '1')
  			{
          this.totalRevenue = numberOfReturnedSalesData[0].total_revenue;
          this.partnerCurrency = numberOfReturnedSalesData[0].partner_currency;
          this.totalNumberOfProducts = numberOfReturnedSalesData[0].total_number_of_products;
  				this.numberOfReturnedSalesDataTitle = 'Returned '+numberOfReturnedSalesData[0].number_of_returned_items+' of '+numberOfReturnedSalesData[0].number_of_all_items;
  			
  				if(numberOfReturnedSalesData[0].number_of_returned_items >= numberOfReturnedSalesData[0].number_of_all_items)
  				{
  					this.noMoreDataToReturn = true;
  				}

  			}
  			else
  			{
  				this.numberOfReturnedSalesDataTitle = '';
  			}

  			},err => {
  		})

  }

  getSalesReport(requestedPage: string, salesFromDate: string, salesToDate: string, paymentMethod: string, salesMadeByEmployeeSlug: string) {

  	var user_slug = this.storage.get('89JHuitr_T__user_slug');
  	var firebase_id = this.storage.get('89JHuitr_T__firebase_id');
  	var active_token = this.storage.get('89JHuitr_T__active_login_token');
  	var suggested_token = this.storage.get('89JHuitr_T__suggested_token');
  	var user_company_of_employment_slug = this.storage.get('89JHuitr_T__user_company_of_employment_slug');

  	this.http.get(this.apiLink+'/rest_get_sales_data/?paginate=true&requested_page='+requestedPage+'&payment_method='+paymentMethod+'&user_company_of_employment_slug='+user_company_of_employment_slug+'&sales_from_date='+salesFromDate+'&sales_to_date='+salesToDate+'&sales_of_employee_slug='+salesMadeByEmployeeSlug+'&user_slug='+user_slug+'&firebase_id='+firebase_id+'&active_token='+active_token+'&suggested_token='+suggested_token+'&completed_operations=true&items_checked_out=true&format=json').subscribe(

  		salesData => {

  			// hide loadings

  			this.stopSalesDataFetchLoading = true;

  			this.salesData = salesData;

  			this.getNumberOfReturnedalesReport(requestedPage, salesFromDate, salesToDate, salesMadeByEmployeeSlug);

  			if(salesFromDate != '')
  			{
  				salesFromDate = ' from '+new Date(salesFromDate);
  			}

  			if(salesToDate != '')
  			{
  				salesToDate = ' to '+new Date(salesToDate);
  			}

  			if(this.salesMadeByEmployeeFName != undefined)
  			{
  				salesMadeByEmployeeSlug = ' by '+this.salesMadeByEmployeeFName+' '+this.salesMadeByEmployeeLName;
  			}
  			else
  			{
  				salesMadeByEmployeeSlug = '';
  			}

  			this.salesDataSubtitle = 'All sales '+salesFromDate+' '+salesToDate+' '+salesMadeByEmployeeSlug;  			

  			},err => {
  		})

  }

  launchSalesReportFetch() {

  	return new Promise((resolve) => {

  		this.loopSalesDataFetch = setInterval(() => {

  			this.getSalesReport('', '', '', '', this.salesMadeByEmployeeSlug);

  			// clearInterval(this.loopSalesDataFetch);

  			}, 60000);

  		resolve('done');

  		});

  }

  viewOrderDetails(orderCode: string) {

  	this.storage.set('89JHuitr_T__order_to_view_cart_code', orderCode);

  	this.router.navigateByUrl('/order-details');

  }  

  getEmployeesList() {

  	var user_slug = this.storage.get('89JHuitr_T__user_slug');
  	var firebase_id = this.storage.get('89JHuitr_T__firebase_id');
  	var active_token = this.storage.get('89JHuitr_T__active_login_token');
  	var suggested_token = this.storage.get('89JHuitr_T__suggested_token');
  	var user_company_of_employment_slug = this.storage.get('89JHuitr_T__user_company_of_employment_slug');

  	this.http.get(this.apiLink+'/rest_get_users_list/?user_company_of_employment_slug='+user_company_of_employment_slug+'&user_slug='+user_slug+'&firebase_id='+firebase_id+'&active_token='+active_token+'&suggested_token='+suggested_token+'&format=json').subscribe(

  		employeesList => {

  			this.employeesList = employeesList;

  			},err => {
  		})

  }

  showFilter() {

  	this.showFilters = true;
  	this.hideButtonFilters = true;
  	this.showButtonFilters = false;

  }

  hideFilter() {

  	this.showFilters = false;
  	this.hideButtonFilters = false;
  	this.showButtonFilters = true; 	

  }

  search() {

  	if((this.salesFromDate == undefined)&&(this.salesToDate == undefined)&&(this.paymentMethod == undefined)&&(this.salesMadeByEmployeeSlug == undefined))
  	{
  		this.showInfoMessage('Please fill at least a field to proceed!');
  	}
  	else
  	{
  		if((this.salesFromDate != undefined))
  		{
  			var salesFromDay = this.salesFromDate.date.day;
		  	var salesFromMonth = this.salesFromDate.date.month;
		  	var salesFromYear = this.salesFromDate.date.year;	

		  	this.salesFromFormatedDate = salesFromYear+'-'+salesFromMonth+'-'+salesFromDay;	  	
  		}
  		else
  		{
  			this.salesFromFormatedDate = '';
  		}

  		if((this.salesToDate != undefined))
  		{
  			var salesToDay = this.salesToDate.date.day;
		  	var salesToMonth = this.salesToDate.date.month;
		  	var salesToYear = this.salesToDate.date.year;

		  	this.salesToFormatedDate = salesToYear+'-'+salesToMonth+'-'+salesToDay;  	
  		}
  		else
  		{
  			this.salesToFormatedDate = '';
  		}

  		if((this.salesMadeByEmployeeSlug != undefined))
  		{
  			this.extractedEmployeeSlugData = this.salesMadeByEmployeeSlug.substring(0, this.salesMadeByEmployeeSlug.indexOf(":"));
  		}

  		this.showLoading('Searching ...');
  		this.getSalesReport('', this.salesFromFormatedDate, this.salesToFormatedDate, this.paymentMethod, this.extractedEmployeeSlugData);
  		Swal.close();
  	}

  }

  saveSelectedEmployeeNames() {

  	var employeeSlugData = this.salesMadeByEmployeeSlug.substring(0, this.salesMadeByEmployeeSlug.indexOf(":"));
  	var employeeFirstNameAndLastNameData = this.salesMadeByEmployeeSlug.substring(this.salesMadeByEmployeeSlug.indexOf(":") + 1);

  	this.salesMadeByEmployeeFName = employeeFirstNameAndLastNameData.substring(0, employeeFirstNameAndLastNameData.indexOf(";"));
  	this.salesMadeByEmployeeLName = employeeFirstNameAndLastNameData.substring(employeeFirstNameAndLastNameData.indexOf(";") + 1);

  }

  loadMore() {

  	if(this.noMoreDataToReturn == true)
  	{
  		this.showInfoMessage('No more data to return!');
  	}
  	else
  	{
  		var requestedPage;

	  	if(this.currentPage != undefined) {
	  		requestedPage = parseInt(this.currentPage) + 1;
	  	}
	  	else
	  	{
	  		requestedPage = '1';
	  	}

	  	this.showLoading('Loading more ...');
	  	this.getSalesReport(requestedPage.toString(), this.salesFromFormatedDate, this.salesToFormatedDate, this.paymentMethod, this.salesMadeByEmployeeSlug);

	  	this.currentPage = requestedPage;

	  	Swal.close();

  	}  	

  }
  
}
