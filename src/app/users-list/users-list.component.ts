import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

import { AuthModule } from '../auth/auth.module';
import { CommonDataModule } from '../common-data/common-data.module';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  public apiLink: any;
  public salesData: any;
  public employeesList: any;
  public showFilters: any; 
  public hideButtonFilters: any;
  public showButtonFilters: any; 
  public stopEmployeesDataFetchLoading: any;
  public loopSalesDataFetch: any;
  public addedFromDate: any;
  public addedToDate: any;
  public salesMadeByEmployeeSlug: any;
  public employeeAddedFromFormatedDate: any;
  public employeeAddedToFormatedDate: any;
  public currentPage: any;
  public employeesDataSubtitle: any;
  public numberOfReturnedEmployeesTitle: any;
  public employeeStatus: any;
  public customQuery: any;
  public noMoreDataToReturn: any;

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
  	this.stopEmployeesDataFetchLoading = false;

  	this.testUserLogin();
  	this.getEmployeesList('', '', '', '', '');
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

  getNumberOfReturnedEmployees(employed_from_date: string, employed_to_date: string, active: string, employee_position: string, custom_search: string) {

  	var user_slug = this.storage.get('89JHuitr_T__user_slug');
  	var firebase_id = this.storage.get('89JHuitr_T__firebase_id');
  	var active_token = this.storage.get('89JHuitr_T__active_login_token');
  	var suggested_token = this.storage.get('89JHuitr_T__suggested_token');
  	var user_company_of_employment_slug = this.storage.get('89JHuitr_T__user_company_of_employment_slug');

  	this.http.get(this.apiLink+'/rest_get_number_of_returned_users_list/?added_from_date='+employed_from_date+'&added_to_date='+employed_to_date+'&active='+active+'&position='+employee_position+'&custom_search='+custom_search+'&user_company_of_employment_slug='+user_company_of_employment_slug+'&user_slug='+user_slug+'&firebase_id='+firebase_id+'&active_token='+active_token+'&suggested_token='+suggested_token+'&format=json').subscribe(

  		numberOfReturnedEmployeesData => {

  			if(numberOfReturnedEmployeesData[0].result == '1')
  			{
  				this.numberOfReturnedEmployeesTitle = 'Returned '+numberOfReturnedEmployeesData[0].number_of_data_to_return+' of '+numberOfReturnedEmployeesData[0].total_number_of_employees;
  			
  				if(numberOfReturnedEmployeesData[0].number_of_data_to_return >= numberOfReturnedEmployeesData[0].total_number_of_employees)
  				{
  					this.noMoreDataToReturn = true;
  				}

  			}
  			else
  			{
  				this.numberOfReturnedEmployeesTitle = '';
  			}

  			},err => {
  		})

  }    

  getEmployeesList(employed_from_date: string, employed_to_date: string, active: string, employee_position: string, custom_search: string) {

  	var user_slug = this.storage.get('89JHuitr_T__user_slug');
  	var firebase_id = this.storage.get('89JHuitr_T__firebase_id');
  	var active_token = this.storage.get('89JHuitr_T__active_login_token');
  	var suggested_token = this.storage.get('89JHuitr_T__suggested_token');
  	var user_company_of_employment_slug = this.storage.get('89JHuitr_T__user_company_of_employment_slug');

  	this.http.get(this.apiLink+'/rest_get_users_list/?added_from_date='+employed_from_date+'&added_to_date='+employed_to_date+'&active='+active+'&position='+employee_position+'&custom_search='+custom_search+'&user_company_of_employment_slug='+user_company_of_employment_slug+'&user_slug='+user_slug+'&firebase_id='+firebase_id+'&active_token='+active_token+'&suggested_token='+suggested_token+'&format=json').subscribe(

  		employeesList => {

  			this.employeesList = employeesList;

  			this.stopEmployeesDataFetchLoading = true;  			

  			this.getNumberOfReturnedEmployees(employed_from_date, employed_to_date, active, employee_position, custom_search);

  			if(employed_from_date != '')
  			{
  				if((employed_from_date == undefined)||(employed_from_date == 'undefined'))
  				{
  					employed_from_date = '';
  				}
  				else
  				{
  					employed_from_date = ' added from '+new Date(employed_from_date);
  				}  				
  			}
  			else
  			{
  				employed_from_date = '';
  			}

  			if(employed_to_date != '')
  			{
  				if((employed_to_date == undefined)||(employed_to_date == 'undefined'))
  				{
  					employed_to_date = '';
  				}
  				else
  				{
  					employed_to_date = ' to '+new Date(employed_to_date);
  				}  				
  			}
  			else
  			{
  				employed_to_date = '';
  			}

  			if(active != '')
  			{
  				if((active == undefined)||(active == 'undefined'))
  				{
  					active = '';
  				}
  				else
  				{
  					if(active == 'true')
	  				{
	  					active = ' active ';
	  				}
	  				else
	  				{
	  					active = ' deactive ';
	  				}
  				}
  				
  			}
  			else
  			{
  				active = '';
  			}

  			if(custom_search != '')
  			{
  				if((custom_search == undefined)||(custom_search == 'undefined'))
  				{
  					custom_search = '';
  				}
  				else
  				{
  					custom_search = ' : '+custom_search;
  				}
  			}
  			else
  			{
  				custom_search = '';
  			}

  			this.employeesDataSubtitle = 'All '+active+' employees '+employed_from_date+' '+employed_to_date+' '+custom_search;

  			},err => {
  		})

  }

  viewUserDetails(userSlug: string) {

  	this.storage.set('89JHuitr_T__user_to_view_slug', userSlug);

  	this.router.navigateByUrl('/user-details');

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

  	if((this.addedFromDate == undefined)&&(this.addedToDate == undefined)&&(this.employeeStatus == undefined)&&(this.customQuery == undefined))
  	{
  		this.showInfoMessage('Please fill at least a field to proceed!');
  	}
  	else
  	{
  		if((this.addedFromDate != undefined))
  		{
  			var addedFromDay = this.addedFromDate.date.day;
		  	var addedFromMonth = this.addedFromDate.date.month;
		  	var addedFromYear = this.addedFromDate.date.year;	

		  	this.employeeAddedFromFormatedDate = addedFromYear+'-'+addedFromMonth+'-'+addedFromDay;	  	
  		}
  		else
  		{
  			this.employeeAddedFromFormatedDate = '';
  		}

  		if((this.addedToDate != undefined))
  		{
  			var addedToDay = this.addedToDate.date.day;
		  	var addedToMonth = this.addedToDate.date.month;
		  	var addedToYear = this.addedToDate.date.year;

		  	this.employeeAddedToFormatedDate = addedToYear+'-'+addedToMonth+'-'+addedToDay;  	
  		}
  		else
  		{
  			this.employeeAddedToFormatedDate = '';
  		}

  		this.showLoading('Searching ...');
  		this.getEmployeesList(this.employeeAddedFromFormatedDate, this.employeeAddedToFormatedDate, this.employeeStatus, '', this.customQuery);
  		Swal.close();
  	}

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

	  	// this.getSalesReport(requestedPage.toString(), this.employeeAddedFromFormatedDate, this.employeeAddedToFormatedDate, this.salesMadeByEmployeeSlug);

	  	this.currentPage = requestedPage;

	  	Swal.close();

  	}  	

  }

  proceedToAddNewEmployee(requestedAction: string, userBillaCode: string) {

    var user_slug = this.storage.get('89JHuitr_T__user_slug');
    var firebase_id = this.storage.get('89JHuitr_T__firebase_id');
    var active_token = this.storage.get('89JHuitr_T__active_login_token');
    var suggested_token = this.storage.get('89JHuitr_T__suggested_token');
    var user_company_of_employment_slug = this.storage.get('89JHuitr_T__user_company_of_employment_slug'); 

    this.showLoading("Processing ...");

    this.http.get(this.apiLink+'/rest_process_company_employee/?user_company_of_employment_slug='+user_company_of_employment_slug+'&requested_action='+requestedAction+'&user_billa_code='+userBillaCode+'&user_slug='+user_slug+'&firebase_id='+firebase_id+'&active_token='+active_token+'&suggested_token='+suggested_token+'&format=json').subscribe(

      employeeProcessData => {

        Swal.close();

        if(employeeProcessData[0].result == '1')
        {
          this.showSuccessMessage(employeeProcessData[0].success);
          this.getEmployeesList('', '', '', '', '');
        }
        else
        {
          this.showErrorMessage(employeeProcessData[0].error);
        }

        },err => {
          Swal.close();
      })

  }

  addEmployee() {

    Swal({
    title: 'Please enter user billa code',
    input: 'text'
  }).then( (user_billa_code) => {

    this.proceedToAddNewEmployee('addEmployee', user_billa_code.value);

  })

  }

}
