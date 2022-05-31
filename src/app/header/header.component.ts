import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

import { AuthModule } from '../auth/auth.module';
import { CommonDataModule } from '../common-data/common-data.module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  public currentPageUrlHeader: string = "";

  public apiLink: any;
  public headerTitle: any;
  public loopNotificationsFetch: any;
  public numberOfNotifications: any;

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService, public http: HttpClient, private router: Router, private commonData: CommonDataModule, private auth: AuthModule) {

  	this.apiLink = "http://localhost:8000";

    this.currentPageUrlHeader = this.router.url;

  	if(this.currentPageUrlHeader == '/dashbord')
  	{
  		this.headerTitle = 'Dashbord';
  	}
  	else if(this.currentPageUrlHeader == '/orders')
  	{
  		this.headerTitle = 'Orders';
  	}
  	else if(this.currentPageUrlHeader == '/sales-report')
  	{
  		this.headerTitle = 'Report';
  	}
  	else if(this.currentPageUrlHeader == '/order-details')
  	{
  		this.headerTitle = 'Order Details';
  	}
  	else if(this.currentPageUrlHeader == '/products')
  	{
  		this.headerTitle = 'Product';
  	}
  	else if(this.currentPageUrlHeader.search('/product-details') != -1)
  	{
  		this.headerTitle = 'Product Details';
  	}
  	else if(this.currentPageUrlHeader == '/users')
  	{
  		this.headerTitle = 'Users';
  	}
  	else if(this.currentPageUrlHeader == '/user-details')
  	{
  		this.headerTitle = 'User details';
  	}
  	else if(this.currentPageUrlHeader == '/customer-support')
  	{
  		this.headerTitle = 'Support Tickets';
  	}
    else if(this.currentPageUrlHeader == '/ticket-details')
    {
      this.headerTitle = 'Support Ticket Details';
    }
    else if(this.currentPageUrlHeader == '/billa-administrator')
    {
      this.headerTitle = 'Billa Administrator'; 
    }
  	else
  	{
  		this.headerTitle = 'active-side-link';
  	}

    this.launchNotificationsFetch();


  }

  ngOnInit() {
  }

  viewLoggedUserDetails() {

    var userSlug = this.storage.get('89JHuitr_T__user_slug');
    this.storage.set('89JHuitr_T__user_to_view_slug', userSlug);

    this.router.navigateByUrl('/user-details');

  }

  getNotifications() {

    var user_slug = this.storage.get('89JHuitr_T__user_slug');
    var firebase_id = this.storage.get('89JHuitr_T__firebase_id');
    var active_token = this.storage.get('89JHuitr_T__active_login_token');
    var suggested_token = this.storage.get('89JHuitr_T__suggested_token');
    var user_company_of_employment_slug = this.storage.get('89JHuitr_T__user_company_of_employment_slug');

    this.http.get(this.apiLink+'/rest_get_number_of_notifications/?user_company_of_employment_slug='+user_company_of_employment_slug+'&user_slug='+user_slug+'&firebase_id='+firebase_id+'&active_token='+active_token+'&suggested_token='+suggested_token+'&completed_operations=false&items_checked_out=true&unprocessed=true&format=json').subscribe(

      notificationsData => {

        if(notificationsData[0].result == '1') {

          var i;
          var numberOfBips = parseInt(notificationsData[0].numberOfNewOrders) + parseInt(notificationsData[0].numberOfNewSupportReplies);

          if(numberOfBips > 0)
          {
            for (i = 0; i < numberOfBips; i++) {
              var audio = new Audio('assets/audio/notification_beep.mp3');
              audio.play();
            }
          }

          this.numberOfNotifications = parseInt(notificationsData[0].numberOfOrders) + parseInt(notificationsData[0].numberOfSupportReplies);
        }
        else
        {
          this.numberOfNotifications = '';
        }


        },err => {
      })

  }

  launchNotificationsFetch() {

    return new Promise((resolve) => {

      this.loopNotificationsFetch = setInterval(() => {

        this.getNotifications();

        // clearInterval(this.loopNotificationsFetch);

        }, 1000);

      resolve('done');

      });

  }

}

