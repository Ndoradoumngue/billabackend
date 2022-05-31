import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public currentPageUrl: string = "";

  public dashboardActive: any;
  public ordersActive: any;
  public salesReportActive: any;
  public productsActive: any;
  public usersActive: any;
  public customerSupportActive: any;
  public dashboardActiveBackground: any;
  public ordersActiveBackground: any;
  public salesReportActiveBackground: any;
  public productsActiveBackground: any;
  public usersActiveBackground: any;
  public customerSupportActiveBackground: any;
  public loggedUserIsBillaEmployee: any;
  public billaAdministratorActiveBackground: any;
  public billaAdministratorActive: any;

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService, public router: Router) {

  	this.currentPageUrl = this.router.url;

  	if(this.currentPageUrl == '/dashbord')
  	{
  		this.dashboardActive = 'active-side-link';
      this.dashboardActiveBackground = 'active-side-link-background';
  	}
  	else if(this.currentPageUrl == '/orders')
  	{
  		this.ordersActive = 'active-side-link';
      this.ordersActiveBackground = 'active-side-link-background';  
  	}  	
  	else if(this.currentPageUrl == '/order-details')
  	{
  		this.ordersActive = 'active-side-link';
      this.ordersActiveBackground = 'active-side-link-background';  
  	}
    else if(this.currentPageUrl == '/sales-report')
    {
      this.salesReportActive = 'active-side-link';
      this.salesReportActiveBackground = 'active-side-link-background';  
    }
  	else if(this.currentPageUrl == '/products')
  	{
  		this.productsActive = 'active-side-link';
      this.productsActiveBackground = 'active-side-link-background';  
  	}
  	else if(this.currentPageUrl.search('/product-details') != -1)
  	{
  		this.productsActive = 'active-side-link';
      this.productsActiveBackground = 'active-side-link-background';  
  	}
  	else if(this.currentPageUrl == '/users')
  	{
  		this.usersActive = 'active-side-link';
      this.usersActiveBackground = 'active-side-link-background';  
  	}
  	else if(this.currentPageUrl == '/user-details')
  	{
  		this.usersActive = 'active-side-link';
      this.usersActiveBackground = 'active-side-link-background';  
  	}
  	else if(this.currentPageUrl == '/customer-support')
  	{
  		this.customerSupportActive = 'active-side-link';
      this.customerSupportActiveBackground = 'active-side-link-background';  
  	}
    else if(this.currentPageUrl == '/ticket-details')
    {
      this.customerSupportActive = 'active-side-link';
      this.customerSupportActiveBackground = 'active-side-link-background';  
    }
    else if(this.currentPageUrl == '/billa-administrator')
    {
      this.billaAdministratorActive = 'active-side-link';
      this.billaAdministratorActiveBackground = 'active-side-link-background';  
    }	
  	else
  	{
  		this.dashboardActive = 'active-side-link';
      this.dashboardActiveBackground = 'active-side-link-background';  
  	}

    this.loggedUserIsBillaEmployee = this.storage.get('89JHuitr_T__is_billa_employee');

  }

  ngOnInit() {
  }

}
