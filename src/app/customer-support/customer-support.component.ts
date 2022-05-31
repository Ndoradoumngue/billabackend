import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

import { AuthModule } from '../auth/auth.module';
import { CommonDataModule } from '../common-data/common-data.module';

@Component({
  selector: 'app-customer-support',
  templateUrl: './customer-support.component.html',
  styleUrls: ['./customer-support.component.css']
})
export class CustomerSupportComponent implements OnInit {

  public apiLink: any;
  public fromDate: any;
  public toDate: any;
  public currentPage: any;
  public ticketStatus: any;
  public customSearch: any;
  public ticketsTitle: any;
  public supportDiscussionsData: any;
  public stopSupportDiscussionsFetchLoading: any;
  public description: any;
  public ticketSubject: any;
  public showOpenTicketForm: any;
  public showFilters: any;
  public hideButtonFilters: any;
  public showButtonFilters: any;
  public employeesList: any;
  public ticketSolvedByEmployeeSlug: any;
  public ticketSolvedAddedByEmployeeFName: any;
  public ticketSolvedAddedByEmployeeLName: any;
  public supportToFormatedDate: any;
  public supportFromFormatedDate: any;
  public extractedEmployeeSlugData: any;
  public noMoreDataToReturn: any;
  public numberOfReturnedTicketsDataTitle: any;

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService, public http: HttpClient, private router: Router, private commonData: CommonDataModule, private auth: AuthModule) {

  	this.apiLink = "http://localhost:8000";

    this.showFilters = false;
    this.hideButtonFilters = false;
    this.showButtonFilters = true;

    this.showOpenTicketForm = false;
  	this.stopSupportDiscussionsFetchLoading = false;

  	this.testUserLogin();
  	this.getSupportTickets('', '', '', '', '', '');
    this.getEmployeesList();
  }

  ngOnInit() {
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

  showInfoMessage(information: string) {
  	Swal('Info!', information, 'info');
  }

  testUserLogin() {

  	this.auth.checkLogin().then((loginInfo) => {

      if((loginInfo != 'true')) {

        this.router.navigateByUrl('/login');
        
      }

     });

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

  getNumberSupportTickets(requestedPage: string, supportFromFormatedDate: string, supportToFormatedDate: string, extractedEmployeeSlugData: string, ticketStatus: string, customSearch: string) {

    var user_slug = this.storage.get('89JHuitr_T__user_slug');
    var firebase_id = this.storage.get('89JHuitr_T__firebase_id');
    var active_token = this.storage.get('89JHuitr_T__active_login_token');
    var suggested_token = this.storage.get('89JHuitr_T__suggested_token');
    var user_company_of_employment_slug = this.storage.get('89JHuitr_T__user_company_of_employment_slug');

    this.http.get(this.apiLink+'/rest_get_number_of_returned_tickets/?requested_page='+requestedPage+'&support_from_formated_date='+supportFromFormatedDate+'&support_to_formated_date='+supportToFormatedDate+'&ticket_solved_by_employee_slug='+extractedEmployeeSlugData+'&ticket_status='+ticketStatus+'&custom_search='+customSearch+'&user_company_of_employment_slug='+user_company_of_employment_slug+'&user_slug='+user_slug+'&firebase_id='+firebase_id+'&active_token='+active_token+'&suggested_token='+suggested_token+'&format=json').subscribe(

      numberOfReturnedTickettsData => {

        if(numberOfReturnedTickettsData[0].result == '1')
        {
          this.numberOfReturnedTicketsDataTitle = 'Returned '+numberOfReturnedTickettsData[0].number_of_returned_tickets+' of '+numberOfReturnedTickettsData[0].number_of_all_tickets;
        
          if(numberOfReturnedTickettsData[0].number_of_returned_tickets >= numberOfReturnedTickettsData[0].number_of_all_tickets)
          {
            this.noMoreDataToReturn = true;
          }

        }
        else
        {
          this.numberOfReturnedTicketsDataTitle = '';
        }

        },err => {
      })

  }

  getSupportTickets(requestedPage: string, supportFromFormatedDate: string, supportToFormatedDate: string, extractedEmployeeSlugData: string, ticketStatus: string, customSearch: string) {

  	var user_slug = this.storage.get('89JHuitr_T__user_slug');
  	var firebase_id = this.storage.get('89JHuitr_T__firebase_id');
  	var active_token = this.storage.get('89JHuitr_T__active_login_token');
  	var suggested_token = this.storage.get('89JHuitr_T__suggested_token');
  	var user_company_of_employment_slug = this.storage.get('89JHuitr_T__user_company_of_employment_slug');

  	this.http.get(this.apiLink+'/rest_get_support_tickets_list/?requested_page='+requestedPage+'&support_from_formated_date='+supportFromFormatedDate+'&support_to_formated_date='+supportToFormatedDate+'&ticket_solved_by_employee_slug='+extractedEmployeeSlugData+'&ticket_status='+ticketStatus+'&custom_search='+customSearch+'&user_company_of_employment_slug='+user_company_of_employment_slug+'&user_slug='+user_slug+'&firebase_id='+firebase_id+'&active_token='+active_token+'&suggested_token='+suggested_token+'&format=json').subscribe(

  		supportDiscussionsData => {

  			this.stopSupportDiscussionsFetchLoading = true;
  			this.supportDiscussionsData = supportDiscussionsData;

        this.getNumberSupportTickets(requestedPage, supportFromFormatedDate, supportToFormatedDate, extractedEmployeeSlugData, ticketStatus, customSearch);

        if(supportFromFormatedDate != '')
        {
          if((supportFromFormatedDate == undefined)||(supportFromFormatedDate == 'undefined'))
          {
            supportFromFormatedDate = '';
          }
          else
          {
            supportFromFormatedDate = ' from '+new Date(supportFromFormatedDate);
          }
          
        }
        else
        {
          supportFromFormatedDate = '';
        }

        if(supportToFormatedDate != '')
        {
          if((supportToFormatedDate == undefined)||(supportToFormatedDate == 'undefined'))
          {
            supportToFormatedDate = '';
          }
          else
          {
            supportToFormatedDate = ' to '+new Date(supportToFormatedDate);
          }
          
        }
        else
        {
          supportToFormatedDate = '';
        }

        if(this.ticketSolvedAddedByEmployeeFName != undefined)
        {
          extractedEmployeeSlugData = ' Opened By '+this.ticketSolvedAddedByEmployeeFName+' '+this.ticketSolvedAddedByEmployeeLName;
        }
        else
        {
          extractedEmployeeSlugData = '';
        }

        if(customSearch != '')
        {
          if((customSearch == undefined)||(customSearch == 'undefined'))
          {
            customSearch = ''
          }
          else
          {
            customSearch = ' : '+customSearch;
          }
          
        }
        else
        {
          customSearch = ''
        }

        if(ticketStatus != '')
        {
          if((ticketStatus == undefined)||(ticketStatus == 'undefined'))
          {
            ticketStatus = '';
          }
          else
          {
            if(ticketStatus == 'true')
            {
              ticketStatus = ' Resolved ';
            }
            else
            {
              ticketStatus = ' Unresolved ';
            }
          }
          
        }
        else
        {
          ticketStatus = '';
        }

        this.ticketsTitle = 'All '+ticketStatus+' Tickets '+extractedEmployeeSlugData+' '+supportFromFormatedDate+' '+supportToFormatedDate+' '+customSearch;

  			},err => {
  		})

  }

  submitSupportRequest() {

  	if((this.description == undefined)||(this.description == 'undefined')||(this.description == '')||(this.ticketSubject == undefined)||(this.ticketSubject == 'undefined')||(this.ticketSubject == ''))
  	{
  		this.showInfoMessage('Please write the description your issue then submit');
  	}
  	else
  	{
  		this.showLoading('Submitting request. Please wait ...');

  		var user_slug = this.storage.get('89JHuitr_T__user_slug');
	  	var firebase_id = this.storage.get('89JHuitr_T__firebase_id');
	  	var active_token = this.storage.get('89JHuitr_T__active_login_token');
	  	var suggested_token = this.storage.get('89JHuitr_T__suggested_token');
	  	var user_company_of_employment_slug = this.storage.get('89JHuitr_T__user_company_of_employment_slug');

	  	this.http.get(this.apiLink+'/rest_submit_support_ticket/?ticket_subject='+this.ticketSubject+'&issue_description='+this.description+'&user_company_of_employment_slug='+user_company_of_employment_slug+'&user_slug='+user_slug+'&firebase_id='+firebase_id+'&active_token='+active_token+'&suggested_token='+suggested_token+'&format=json').subscribe(

	  		supportRequestSubmissionData => {

	  			Swal.close();

	  			if(supportRequestSubmissionData[0].result == '1')
	  			{
	  				this.showSuccessMessage(supportRequestSubmissionData[0].success);

	  				this.description = '';
            this.ticketSubject = '';
            this.showOpenTicketForm = false;
            this.getSupportTickets('', '', '', '', '', '');
	  			}
	  			else
	  			{
	  				this.showErrorMessage(supportRequestSubmissionData[0].error);
	  			}

	  			},err => {

	  				Swal.close();
	  		})

  	}

  }

  openSupportTicket() {

    this.showOpenTicketForm = true;

  }

  saveSelectedEmployeeNames() {

    var employeeSlugData = this.ticketSolvedByEmployeeSlug.substring(0, this.ticketSolvedByEmployeeSlug.indexOf(":"));
    var employeeFirstNameAndLastNameData = this.ticketSolvedByEmployeeSlug.substring(this.ticketSolvedByEmployeeSlug.indexOf(":") + 1);

    this.ticketSolvedAddedByEmployeeFName = employeeFirstNameAndLastNameData.substring(0, employeeFirstNameAndLastNameData.indexOf(";"));
    this.ticketSolvedAddedByEmployeeLName = employeeFirstNameAndLastNameData.substring(employeeFirstNameAndLastNameData.indexOf(";") + 1);

  }

  search() {

    if((this.fromDate == undefined)&&(this.toDate == undefined)&&(this.ticketStatus == undefined)&&(this.customSearch == undefined)&&(this.ticketSolvedByEmployeeSlug == undefined))
    {
      this.showInfoMessage('Please fill at least a field to proceed!');
    }
    else
    {
      if((this.fromDate != undefined))
      {
        var supportFromDay = this.fromDate.date.day;
        var supportFromMonth = this.fromDate.date.month;
        var supportFromYear = this.fromDate.date.year;  

        this.supportFromFormatedDate = supportFromYear+'-'+supportFromMonth+'-'+supportFromDay;     
      }
      else
      {
        this.supportFromFormatedDate = '';
      }

      if((this.toDate != undefined))
      {
        var supportToDay = this.toDate.date.day;
        var supportToMonth = this.toDate.date.month;
        var supportToYear = this.toDate.date.year;

        this.supportToFormatedDate = supportToYear+'-'+supportToMonth+'-'+supportToDay;   
      }
      else
      {
        this.supportToFormatedDate = '';
      }

      if((this.ticketSolvedByEmployeeSlug != undefined))
      {
        this.extractedEmployeeSlugData = this.ticketSolvedByEmployeeSlug.substring(0, this.ticketSolvedByEmployeeSlug.indexOf(":"));
      }

      this.showLoading('Searching ...');

      this.getSupportTickets('', this.supportFromFormatedDate, this.supportToFormatedDate, this.extractedEmployeeSlugData, this.ticketStatus, this.customSearch);

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
      this.getSupportTickets(requestedPage.toString(), this.supportFromFormatedDate, this.supportToFormatedDate, this.extractedEmployeeSlugData, this.ticketStatus, this.customSearch);
      this.currentPage = requestedPage;

      Swal.close();

    }   

  }

  viewTicketDetails(ticketSlug: string) {

    this.storage.set('89JHuitr_T__ticket_to_view_slug', ticketSlug);
    this.storage.set('89JHuitr_T__ticket_reply_type', 'reply');

    this.router.navigateByUrl('/ticket-details');

  }

}
