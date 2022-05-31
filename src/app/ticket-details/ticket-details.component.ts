import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

import { AuthModule } from '../auth/auth.module';
import { CommonDataModule } from '../common-data/common-data.module';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {

  public apiLink: any;
  public ticket_to_view_slug: any;
  public ticketData: any;
  public reply: any;
  public billa_employee: any;
  public ticketDiscussionsData: any;
  public stopTicketDetailssLoading: any;

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService, public http: HttpClient, private router: Router, private commonData: CommonDataModule, private auth: AuthModule) {

  	this.apiLink = "http://localhost:8000";

  	this.stopTicketDetailssLoading = false;

  	this.ticket_to_view_slug = this.storage.get('89JHuitr_T__ticket_to_view_slug');
    this.billa_employee = this.storage.get('89JHuitr_T__is_billa_employee');

  	this.testUserLogin();
  	this.getTicketDetails();
  	this.getTicketDiscussions();
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

  showInformation(information: string) {
  	Swal('Infor!', information, 'info');
  }

  testUserLogin() {

  	this.auth.checkLogin().then((loginInfo) => {

      if((loginInfo != 'true')) {

        this.router.navigateByUrl('/login');
        
      }

     });

  }

  getTicketDetails() {

  	var user_slug = this.storage.get('89JHuitr_T__user_slug');
  	var firebase_id = this.storage.get('89JHuitr_T__firebase_id');
  	var active_token = this.storage.get('89JHuitr_T__active_login_token');
  	var suggested_token = this.storage.get('89JHuitr_T__suggested_token');  	
  	var user_company_of_employment_slug = this.storage.get('89JHuitr_T__user_company_of_employment_slug');

  	this.http.get(this.apiLink+'/rest_get_ticket_details/?user_company_of_employment_slug='+user_company_of_employment_slug+'&ticket_to_view_slug='+this.ticket_to_view_slug+'&user_slug='+user_slug+'&firebase_id='+firebase_id+'&active_token='+active_token+'&suggested_token='+suggested_token+'&completed_operations=false&items_checked_out=true&unprocessed=true&in_order_details=true&format=json').subscribe(

  		ticketData => {

  			// hide loadings  			

  			this.stopTicketDetailssLoading = true;

  			this.ticketData = ticketData;

  			},err => {
  		})

  }

  getTicketDiscussions() {

  	var user_slug = this.storage.get('89JHuitr_T__user_slug');
  	var firebase_id = this.storage.get('89JHuitr_T__firebase_id');
  	var active_token = this.storage.get('89JHuitr_T__active_login_token');
  	var suggested_token = this.storage.get('89JHuitr_T__suggested_token');
  	var user_company_of_employment_slug = this.storage.get('89JHuitr_T__user_company_of_employment_slug');

  	this.http.get(this.apiLink+'/rest_get_ticket_discussions_list/?user_company_of_employment_slug='+user_company_of_employment_slug+'&ticket_to_view_slug='+this.ticket_to_view_slug+'&user_slug='+user_slug+'&firebase_id='+firebase_id+'&active_token='+active_token+'&suggested_token='+suggested_token+'&in_order_details=true&format=json').subscribe(

  		ticketDiscussionsData => {

  			// hide loadings

  			this.ticketDiscussionsData = ticketDiscussionsData;

  			},err => {
  		})

  }

  submitReply() {

  	if((this.reply == undefined)||(this.reply == 'undefined')||(this.reply == null)||(this.reply == 'null')||(this.reply == '')) {
  		this.showInformation('Please type your reply to submit');
  	}
  	else
  	{
  		this.showLoading('Submitting message ...');

  		var user_slug = this.storage.get('89JHuitr_T__user_slug');
	  	var firebase_id = this.storage.get('89JHuitr_T__firebase_id');
      var reply_type = this.storage.get('89JHuitr_T__ticket_reply_type');
	  	var active_token = this.storage.get('89JHuitr_T__active_login_token');
	  	var suggested_token = this.storage.get('89JHuitr_T__suggested_token');
	  	var user_company_of_employment_slug = this.storage.get('89JHuitr_T__user_company_of_employment_slug');

	  	this.http.get(this.apiLink+'/rest_submit_ticket_reply/?user_company_of_employment_slug='+user_company_of_employment_slug+'&reply_type='+reply_type+'&ticket_slug='+this.ticket_to_view_slug+'&reply_message='+this.reply+'&user_slug='+user_slug+'&firebase_id='+firebase_id+'&active_token='+active_token+'&suggested_token='+suggested_token+'&in_order_details=true&format=json').subscribe(

	  		ticketReplySubmissionData => {

	  			Swal.close();

	  			// hide loadings

	  			if(ticketReplySubmissionData[0].result == 0) {
	  				this.showErrorMessage(ticketReplySubmissionData[0].error);
	  			}
	  			else
	  			{
            this.reply = '';
	  				this.showSuccessMessage(ticketReplySubmissionData[0].success);
	  				this.getTicketDiscussions();
	  			}	  			

	  			},err => {
	  				Swal.close();
	  		})

  	}

  }

  closeSupportTicket() {

    this.showLoading('Closing ticket ...');

    var user_slug = this.storage.get('89JHuitr_T__user_slug');
    var firebase_id = this.storage.get('89JHuitr_T__firebase_id');
    var reply_type = this.storage.get('89JHuitr_T__ticket_reply_type');
    var active_token = this.storage.get('89JHuitr_T__active_login_token');
    var suggested_token = this.storage.get('89JHuitr_T__suggested_token');

    this.http.get(this.apiLink+'/rest_close_support_ticket/?ticket_slug='+this.ticket_to_view_slug+'&user_slug='+user_slug+'&firebase_id='+firebase_id+'&active_token='+active_token+'&suggested_token='+suggested_token+'&format=json').subscribe(

      supportTicketClosingData => {

        Swal.close();

        if(supportTicketClosingData[0].result == 0) {
          this.showErrorMessage(supportTicketClosingData[0].error);
        }
        else
        {
          this.showSuccessMessage(supportTicketClosingData[0].success);
          this.getTicketDetails();
        }

        },err => {
          Swal.close();

      })

  }

  requestSupportTicketClosing() {

    Swal({

      title: 'Close support ticket',
      text: 'Is this issue solved?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'

      }).then((result) => {
        if (result.value) {

          this.closeSupportTicket();

        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
      })

  }

}

