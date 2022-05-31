import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

import { AuthModule } from '../auth/auth.module';
import { CommonDataModule } from '../common-data/common-data.module';

@Component({
  selector: 'app-billa-administrator',
  templateUrl: './billa-administrator.component.html',
  styleUrls: ['./billa-administrator.component.css']
})
export class BillaAdministratorComponent implements OnInit {

  public apiLink: any;
  public salesData: any;
  public clientsList: any;
  public partnersList: any;
  public employeesList: any;
  public onSalesDataSearch: any;
  public onBillaCreditReportSearch: any;
  public employeesGrantingCreditList: any;
  public hideSalesReportFilters: any; 
  public hideSalesReportButtonFilters: any;
  public showSalesReportButtonFilters: any; 
  public stopSalesDataFetchLoading: any;
  public loopSalesDataFetch: any;
  public salesFromDate: any;
  public salesToDate: any;
  public salesMadeByEmployeeSlug: any;
  public salesFromFormatedDate: any;
  public salesToFormatedDate: any;
  public currentBillaCreditDataPage: any;
  public currentSalesDataPage: any;
  public salesDataSubtitle: any;
  public numberOfReturnedSalesDataTitle: any;
  public salesMadeByEmployeeLName: any;
  public salesMadeByEmployeeFName: any;
  public extractedEmployeeSlugData: any;
  public noMoreSalesDataToReturn: any;
  public noMoreBillaCreditDataToReturn: any;
  public totalRevenue: any;
  public partnerCurrency: any;
  public totalNumberOfProducts: any;
  public billaCreditTab: any;
  public showBillaCredits: any;
  public shoppingsTab: any;
  public customerSupportTab: any;
  public showShoppings: any;
  public showSupportTickets: any;
  public billaCreditsData: any;
  public creditStatus: any;
  public paymentStatus: any;
  public amountGrantedFrom: any;
  public amountGrantedTo: any;
  public grantedFromDate: any;
  public grantedToDate: any;
  public creditGrantedAtCompanySlug: any;
  public customSearch: any;
  public showBillaCreditsFilterFields: any;
  public showBillaCreditsButtonOn: any;
  public hideBillaCreditsButtonOn: any;
  public billaCreditNumberOfReturnedItems: any;
  public billaCreditNumberOfAllItems: any;
  public BillaCreditCurrency: any;
  public totalProfitOfBillaCreditsGiven: any;
  public stopBillaCreditsDataFetchLoading: any;
  public BillaCreditsDataSubtitle: any;
  public creditGrantedFromDate: any;
  public creditGrantedToDate: any;
  public creditGrantedFromAmount: any;
  public creditGrantedToAmount: any;
  public billaCreditStatus: any;
  public selectedCreditStatus: any;
  public selectedPaymentStatus: any;
  public creditTakenByClientSlug: any;
  public creditTakenByClientFirstName: any;
  public creditTakenByClientLastName: any;
  public creditTakenAtCompanyName: any;
  public creditTakenAtPartnerSlug: any;
  public employeeGrantingCreditFirstName: any;
  public employeeGrantingCreditLastName: any;
  public creditGrantConfirmedByEmployeeSlug: any;
  public billaCreditCustomSearch: any;
  public creditGrantedFromFormatedDate: any;
  public creditGrantedToFormatedDate: any;
  public extractedClientGettingLoanSlugData: any;
  public extractedPartnerSlug: any;
  public extractedEmployeeGrantingCreditSlug: any;
  public loopBillaCreditsReportFetch: any;
  public creditTakenAtCompanyInCurrency: any;
  public employeesThatCanConfirmShoppingList: any;
  public salesOfPartnerSlug: any;
  public salesOfPartnerName: any;
  public salesOfPartnerCurrency: any;
  public shopperSlug: any;
  public shopperFirstName: any;
  public shopperLastName: any;
  public employeeThatConfirmedShoppingSlug: any;
  public employeeThatConfirmedShoppingFirstName: any;
  public employeeThatConfirmedShoppingLastNameData: any;
  public numberOfReturnedSales: any;
  public numberOfAllSales: any;
  public totalCostOfSales: any;
  public shoppingAmountFrom: any;
  public shoppingAmountTo: any;
  public extractedEmployeeThatMadeSalesSlug: any;
  public extractedSalesPartnerSlug: any;
  public extractedShopperSlugData: any;
  public salesFromAmount: any;
  public salesToAmount: any;
  public shoppingStatus: any;
  public salesCustomSearch: any;
  public shoppingStatusSearchTitle: any;
  public salesCustomSearchTitle: any;
  public shoppingAtCompanySearchTitle: any;
  public salesToAmountSearchTitle: any;
  public salesFromAmountSearchTitle: any;
  public employeeThatConfirmedShoppingSlugSearchTitle: any;
  public shopperSlugSearchTitle: any;
  public salesToFormatedDateSearchTitle: any;
  public salesFromFormatedDateSearchTitle: any;
  public billaCreditStatusSearchTitle: any;
  public billaCreditCustomSearchTitle: any;
  public billaCreditGrantedAtCompanySearchTitle: any;
  public billaCreditGrantedBySearchTitle: any;
  public billaCreditTakenBysearchTitle: any;
  public creditGrantedFromAmountSearchTitle: any;
  public creditGrantedToAmountSearchTitle: any;
  public creditGrantedToFormatedDateSearchTitle: any;
  public creditGrantedFromFormatedDateSearchTitle: any;
  public supportDiscussionsData: any;
  public stopSupportDiscussionsFetchLoading: any;
  public loopSupportTicketsDataFetch: any;
  public onSupportTicketsDataSearch: any;
  public currentSupportTicketsDataPage: any;
  public ticketsSupportedFromDate: any;
  public ticketsSupportedFromFromFormatedDate: any;
  public ticketsSupportedToDate: any;
  public ticketsSupportedToFormatedDate: any;
  public supportRequestedByEmployeeSlug: any;
  public supportRequestedAtPartnerSlug: any;
  public supportGivenByEmployeeSlug: any;
  public supportTicketStatus: any;
  public supportTicketCustomSearch: any;
  public supportRequestedByEmployeeExtratedSlug: any;
  public supportRequestedAtCompanyExtratedSlug: any;
  public supportGivenByEmployeeExtratedSlug: any;
  public ticketsSupportedFromFromFormatedDateSearchTitle: any;
  public ticketsSupportedToFormatedDateSearchTitle: any;
  public supportRequestedByEmployeeFirstName: any;
  public supportRequestedByEmployeeLastName: any;
  public supportRequestedByEmployeeSearchTitle: any;
  public supportRequestedAtPartnerName: any;
  public supportRequestedAtPartnerNameSearchTitle: any;
  public employeesOfPartnerRequestingSupportList: any;
  public supportGivenByEmployeeFirstName: any;
  public supportGivenByEmployeeLastName: any;
  public supportGivenByEmployeeSearchTitle: any;
  public supportTicketCustomSearchTitle: any;
  public supportTicketStatusSearchTitle: any;
  public ticketsTitle: any;
  public noMoreSupportTicketsDataToReturn: any;
  public numberOfReturnedTicketsDataTitle: any;
  public showSupportCreditsFilterButtons: any;
  public hideSupportCreditsFilterButtons: any;
  public showSupportCreditsFilter: any;
  public billaEmployeesList: any;

  myOptions: INgxMyDpOptions = {
        // other options...
        dateFormat: 'dd.mm.yyyy',
    };

    // Initialized to specific date (09.10.2018)
    model: any = { date: { year: 2018, month: 10, day: 9 } };

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService, public http: HttpClient, private router: Router, private commonData: CommonDataModule, private auth: AuthModule) {

  	this.apiLink = "http://localhost:8000";

    this.showBillaCredits = true;
    this.billaCreditTab = 'active-tab';

  	this.hideSalesReportButtonFilters = false;
  	this.showSalesReportButtonFilters = true;

    this.showBillaCreditsFilterFields = false;

    this.hideBillaCreditsButtonOn = false;    
    this.showBillaCreditsButtonOn = true;
    this.showSupportCreditsFilterButtons = true;

  	this.stopSalesDataFetchLoading = false;

  	this.testUserLogin();
    this.getBillaCreditsData('', '', '', '', '', '', '', '', '', '', '');
    this.launchBillaCreditsReportFetch();

  	this.launchSalesReportFetch();
    this.getSalesData('', '', '', '', '', '', '', '', '', '');

    this.stopSupportDiscussionsFetchLoading = false;

    this.launchSupportTicketsFetch();
    this.getSupportTickets('', '', '', '', '', '', '', '');

  	this.getClientsList();
    this.getPartnersList();
    this.getBillaEmployeesList();
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
      else
      {
      	var billa_employee = this.storage.get('89JHuitr_T__is_billa_employee');
      	if(billa_employee != 'true')
      	{
      		this.router.navigateByUrl('/dashbord');
      	}

      }

     });

  }

  viewBillaCredits() {

    this.billaCreditTab = 'active-tab';
    this.shoppingsTab = 'not-active-tab';
    this.customerSupportTab = 'not-active-tab';

    this.showBillaCredits = true;
    this.showShoppings = false;
    this.showSupportTickets = false;

  }

  viewShoppings() {

    this.shoppingsTab = 'active-tab';
    this.billaCreditTab = 'not-active-tab';
    this.customerSupportTab = 'not-active-tab';

    this.showBillaCredits = false;
    this.showShoppings = true;
    this.showSupportTickets = false;
    
  }

  viewCustomerrSupport() {

    this.customerSupportTab = 'active-tab';
    this.billaCreditTab = 'not-active-tab';
    this.shoppingsTab = 'not-active-tab';

    this.showBillaCredits = false;
    this.showShoppings = false;
    this.showSupportTickets = true;
    
  }

  getNumberOfReturnedBillaCreditsData(requestedPage: string, creditStatus: string, paymentStatus: string, amountGrantedFrom: string, amountGrantedTo: string, grantedFromDate: string, grantedToDate: string, creditTakenByUserSlug: string, creditGrantedAtCompanySlug: string, creditGrantConfirmedByEmployeeSlug: string, customSearch: string) {

    var user_slug = this.storage.get('89JHuitr_T__user_slug');
    var firebase_id = this.storage.get('89JHuitr_T__firebase_id');
    var active_token = this.storage.get('89JHuitr_T__active_login_token');
    var suggested_token = this.storage.get('89JHuitr_T__suggested_token');
    var user_company_of_employment_slug = this.storage.get('89JHuitr_T__user_company_of_employment_slug');

    this.http.get(this.apiLink+'/rest_get_number_of_returned_billa_credits_data/?requested_page='+requestedPage+'&user_company_of_employment_slug='+user_company_of_employment_slug+'&status='+creditStatus+'&payment_status='+paymentStatus+'&amount_granted_from='+amountGrantedFrom+'&amount_granted_to='+amountGrantedTo+'&granted_from_date='+grantedFromDate+'&granted_to_date='+grantedToDate+'&credit_taken_by_user_slug='+creditTakenByUserSlug+'&credit_granted_at_company_slug='+creditGrantedAtCompanySlug+'&credit_grant_confirmed_by_employee_slug='+creditGrantConfirmedByEmployeeSlug+'&custom_search='+customSearch+'&user_slug='+user_slug+'&firebase_id='+firebase_id+'&active_token='+active_token+'&suggested_token='+suggested_token+'&format=json').subscribe(

      numberOfReturnedBillaCreditsData => {

        if(numberOfReturnedBillaCreditsData[0].result == '1')
        {
          this.billaCreditNumberOfReturnedItems = numberOfReturnedBillaCreditsData[0].number_of_returned_items;
          this.billaCreditNumberOfAllItems = numberOfReturnedBillaCreditsData[0].number_of_all_items;
          this.BillaCreditCurrency = numberOfReturnedBillaCreditsData[0].currency;
          this.totalProfitOfBillaCreditsGiven = numberOfReturnedBillaCreditsData[0].total_profit_of_given_credits;

          if(numberOfReturnedBillaCreditsData[0].number_of_returned_items >= numberOfReturnedBillaCreditsData[0].number_of_all_items)
          {
            this.noMoreBillaCreditDataToReturn = true;
          }

        }
        else
        {
          this.billaCreditNumberOfReturnedItems = 0;
          this.billaCreditNumberOfAllItems = 0;
          this.BillaCreditCurrency = '';
          this.totalProfitOfBillaCreditsGiven = 0;
        }

        },err => {
      })

  }

  getBillaCreditsData(requestedPage: string, creditStatus: string, paymentStatus: string, amountGrantedFrom: string, amountGrantedTo: string, grantedFromDate: string, grantedToDate: string, creditTakenByUserSlug: string, creditGrantedAtCompanySlug: string, creditGrantConfirmedByEmployeeSlug: string, customSearch: string) {

    var user_slug = this.storage.get('89JHuitr_T__user_slug');
    var firebase_id = this.storage.get('89JHuitr_T__firebase_id');
    var active_token = this.storage.get('89JHuitr_T__active_login_token');
    var suggested_token = this.storage.get('89JHuitr_T__suggested_token');
    var user_company_of_employment_slug = this.storage.get('89JHuitr_T__user_company_of_employment_slug');

    this.http.get(this.apiLink+'/rest_get_billa_credits_data/?requested_page='+requestedPage+'&user_company_of_employment_slug='+user_company_of_employment_slug+'&status='+creditStatus+'&payment_status='+paymentStatus+'&amount_granted_from='+amountGrantedFrom+'&amount_granted_to='+amountGrantedTo+'&granted_from_date='+grantedFromDate+'&granted_to_date='+grantedToDate+'&credit_taken_by_user_slug='+creditTakenByUserSlug+'&credit_granted_at_company_slug='+creditGrantedAtCompanySlug+'&credit_grant_confirmed_by_employee_slug='+creditGrantConfirmedByEmployeeSlug+'&custom_search='+customSearch+'&user_slug='+user_slug+'&firebase_id='+firebase_id+'&active_token='+active_token+'&suggested_token='+suggested_token+'&format=json').subscribe(

      billaCreditsData => {

        var billaCreditStatus = '';
        var billaCreditTakenBy = '';
        var billaCreditGrantedBy = '';
        var billaCreditGrantedAtCompany: any;

        this.stopBillaCreditsDataFetchLoading = true;

        this.billaCreditsData = billaCreditsData;

        this.getNumberOfReturnedBillaCreditsData(requestedPage, creditStatus, paymentStatus, amountGrantedFrom, amountGrantedTo, grantedFromDate, grantedToDate, creditTakenByUserSlug, creditGrantedAtCompanySlug, creditGrantConfirmedByEmployeeSlug, customSearch);

        if(this.onBillaCreditReportSearch == undefined)
        {
          this.BillaCreditsDataSubtitle = 'Billa credits report';
        }
        else
        {
          this.BillaCreditsDataSubtitle = this.billaCreditStatusSearchTitle+' Billa credits '+this.billaCreditTakenBysearchTitle+' '+this.billaCreditGrantedAtCompanySearchTitle+' '+this.billaCreditGrantedBySearchTitle+' '+this.creditGrantedFromFormatedDateSearchTitle+' '+this.creditGrantedToFormatedDateSearchTitle+' '+this.billaCreditCustomSearchTitle+' '+this.creditGrantedFromAmountSearchTitle+' '+this.creditGrantedToAmountSearchTitle;
        }
        
        },err => {
      })

  }

  launchBillaCreditsReportFetch() {

    return new Promise((resolve) => {

      this.loopBillaCreditsReportFetch = setInterval(() => {

        if(this.onBillaCreditReportSearch == true)
        {
          if((this.currentBillaCreditDataPage == undefined)||(this.currentBillaCreditDataPage == '')) {
            this.currentBillaCreditDataPage = '';
          }

          this.getBillaCreditsData(this.currentBillaCreditDataPage.toString(), this.selectedCreditStatus, this.selectedPaymentStatus, this.creditGrantedFromAmount, this.creditGrantedToAmount, this.creditGrantedFromFormatedDate, this.creditGrantedToFormatedDate, this.extractedClientGettingLoanSlugData, this.extractedPartnerSlug, this.extractedEmployeeGrantingCreditSlug, this.billaCreditCustomSearch);
        }
        else
        {
          this.getBillaCreditsData('', '', '', '', '', '', '', '', '', '', '');
        }

        // clearInterval(this.loopBillaCreditsReportFetch);

        }, 60000);

      resolve('done');

      });

  }

  getEmployeesOfPartnerToViewSalesReport(employeesOfCompanySlug: string) {

    var user_slug = this.storage.get('89JHuitr_T__user_slug');
    var firebase_id = this.storage.get('89JHuitr_T__firebase_id');
    var active_token = this.storage.get('89JHuitr_T__active_login_token');
    var suggested_token = this.storage.get('89JHuitr_T__suggested_token');

    this.http.get(this.apiLink+'/rest_get_users_list/?user_company_of_employment_slug='+employeesOfCompanySlug+'&user_slug='+user_slug+'&firebase_id='+firebase_id+'&active_token='+active_token+'&suggested_token='+suggested_token+'&format=json').subscribe(

      employeesThatCanConfirmShoppingList => {

        this.employeesThatCanConfirmShoppingList = employeesThatCanConfirmShoppingList;

        },err => {
      })

  }

  savePartnerToViewSalesReportData() {

    var partnerToViewSalesReportSlug = this.salesOfPartnerSlug.substring(0, this.salesOfPartnerSlug.indexOf(":"));
    var salesOfPartnerNameAndCurrencyData = this.salesOfPartnerSlug.substring(this.salesOfPartnerSlug.indexOf(":") + 1);

    this.salesOfPartnerName = salesOfPartnerNameAndCurrencyData.substring(0, salesOfPartnerNameAndCurrencyData.indexOf(";"));
    this.salesOfPartnerCurrency = salesOfPartnerNameAndCurrencyData.substring(salesOfPartnerNameAndCurrencyData.indexOf(";") + 1);

    this.getEmployeesOfPartnerToViewSalesReport(partnerToViewSalesReportSlug);

  }

  saveSelectedShopperNames() {

    var theShopperSlugData = this.shopperSlug.substring(0, this.shopperSlug.indexOf(":"));
    var shopperFirstNameAndLastNameData = this.shopperSlug.substring(this.shopperSlug.indexOf(":") + 1);

    this.shopperFirstName = shopperFirstNameAndLastNameData.substring(0, shopperFirstNameAndLastNameData.indexOf(";"));
    this.shopperLastName = shopperFirstNameAndLastNameData.substring(shopperFirstNameAndLastNameData.indexOf(";") + 1);

  }

  saveNamesOfEmployeeThatConfirmedShopping() {

    var theEmployeeThatConfirmedShoppingSlugData = this.employeeThatConfirmedShoppingSlug.substring(0, this.employeeThatConfirmedShoppingSlug.indexOf(":"));
    var employeeThatConfirmedShoppingFirstNameAndLastNameData = this.employeeThatConfirmedShoppingSlug.substring(this.employeeThatConfirmedShoppingSlug.indexOf(":") + 1);

    this.employeeThatConfirmedShoppingFirstName = employeeThatConfirmedShoppingFirstNameAndLastNameData.substring(0, employeeThatConfirmedShoppingFirstNameAndLastNameData.indexOf(";"));
    this.employeeThatConfirmedShoppingLastNameData = employeeThatConfirmedShoppingFirstNameAndLastNameData.substring(employeeThatConfirmedShoppingFirstNameAndLastNameData.indexOf(";") + 1);

  }

  getNumberOfReturnedSalesData(requestedPage: string, shoppingStatus: string, shoppingAmountFrom: string, shoppingAmountTo: string, shoppingFromDate: string, shoppingToDate: string, shoppingByClientSlug: string, shoppingAtCompanySlug: string, shoppingConfirmedByEmployeeSlug: string, shoppingCustomSearch: string) {

    var user_slug = this.storage.get('89JHuitr_T__user_slug');
    var firebase_id = this.storage.get('89JHuitr_T__firebase_id');
    var active_token = this.storage.get('89JHuitr_T__active_login_token');
    var suggested_token = this.storage.get('89JHuitr_T__suggested_token');
    var user_company_of_employment_slug = this.storage.get('89JHuitr_T__user_company_of_employment_slug');
    
    this.http.get(this.apiLink+'/rest_get_number_of_returned_billa_credits_data/?requested_page='+requestedPage+'&user_company_of_employment_slug='+user_company_of_employment_slug+'&status='+shoppingStatus+'&payment_status=&amount_granted_from=&shopping_amount_from='+shoppingAmountFrom+'&amount_granted_to=&shopping_amount_to='+shoppingAmountTo+'&granted_from_date=&shopping_from_date='+shoppingFromDate+'&granted_to_date=&shopping_to_date='+shoppingToDate+'&credit_taken_by_user_slug='+shoppingByClientSlug+'&credit_granted_at_company_slug='+shoppingAtCompanySlug+'&credit_grant_confirmed_by_employee_slug=&shopping_confirmed_by_employee_slug='+shoppingConfirmedByEmployeeSlug+'&custom_search='+shoppingCustomSearch+'&user_slug='+user_slug+'&firebase_id='+firebase_id+'&active_token='+active_token+'&suggested_token='+suggested_token+'&sales_data=true&format=json').subscribe(

      numberOfReturnedSalesData => {

        if(numberOfReturnedSalesData[0].result == '1')
        {
          this.numberOfReturnedSales = numberOfReturnedSalesData[0].number_of_returned_items;
          this.numberOfAllSales = numberOfReturnedSalesData[0].number_of_all_items;
          this.totalCostOfSales = numberOfReturnedSalesData[0].total_cost_of_sales;

          if(numberOfReturnedSalesData[0].number_of_returned_items >= numberOfReturnedSalesData[0].number_of_all_items)
          {
            this.noMoreSalesDataToReturn = true;
          }

        }
        else
        {
          this.numberOfReturnedSales = 0;
          this.numberOfAllSales = 0;
          this.totalCostOfSales = 0;
        }

        },err => {
      })

  }
  
  getSalesData(requestedPage: string, shoppingStatus: string, shoppingAmountFrom: string, shoppingAmountTo: string, shoppingFromDate: string, shoppingToDate: string, shoppingByClientSlug: string, shoppingAtCompanySlug: string, shoppingConfirmedByEmployeeSlug: string, shoppingCustomSearch: string) {

    var user_slug = this.storage.get('89JHuitr_T__user_slug');
    var firebase_id = this.storage.get('89JHuitr_T__firebase_id');
    var active_token = this.storage.get('89JHuitr_T__active_login_token');
    var suggested_token = this.storage.get('89JHuitr_T__suggested_token');
    var user_company_of_employment_slug = this.storage.get('89JHuitr_T__user_company_of_employment_slug');

    this.http.get(this.apiLink+'/rest_get_billa_credits_data/?requested_page='+requestedPage+'&user_company_of_employment_slug='+user_company_of_employment_slug+'&status='+shoppingStatus+'&payment_status=&amount_granted_from=&shopping_amount_from='+shoppingAmountFrom+'&amount_granted_to=&shopping_amount_to='+shoppingAmountTo+'&granted_from_date=&shopping_from_date='+shoppingFromDate+'&granted_to_date=&shopping_to_date='+shoppingToDate+'&credit_taken_by_user_slug='+shoppingByClientSlug+'&credit_granted_at_company_slug='+shoppingAtCompanySlug+'&credit_grant_confirmed_by_employee_slug=&shopping_confirmed_by_employee_slug='+shoppingConfirmedByEmployeeSlug+'&custom_search='+shoppingCustomSearch+'&user_slug='+user_slug+'&firebase_id='+firebase_id+'&active_token='+active_token+'&suggested_token='+suggested_token+'&sales_data=true&format=json').subscribe(

      salesData => {

        this.stopSalesDataFetchLoading = true;

        this.salesData = salesData;

        this.getNumberOfReturnedSalesData(requestedPage, shoppingStatus, shoppingAmountFrom, shoppingAmountTo, shoppingFromDate, shoppingToDate, shoppingByClientSlug, shoppingAtCompanySlug, shoppingConfirmedByEmployeeSlug, shoppingCustomSearch);


        if(this.onSalesDataSearch == undefined)
        {
          this.salesDataSubtitle = ' Sales Report';
        }
        else
        {
          this.salesDataSubtitle = this.shoppingStatusSearchTitle+' Sales '+this.shopperSlugSearchTitle+' '+this.shoppingAtCompanySearchTitle+' '+this.employeeThatConfirmedShoppingSlugSearchTitle+' '+this.salesFromFormatedDateSearchTitle+' '+this.salesToFormatedDateSearchTitle+' '+this.salesCustomSearchTitle+' '+this.salesFromAmountSearchTitle+' '+this.salesToAmountSearchTitle;
        }
        
        },err => {
      })

  }

  launchSalesReportFetch() {

    return new Promise((resolve) => {

      this.loopSalesDataFetch = setInterval(() => {

        if(this.onSalesDataSearch == true)
        {
          if((this.currentSalesDataPage == undefined)||(this.currentSalesDataPage == ''))
          {
            this.currentSalesDataPage == '';
          }
          this.getSalesData(this.currentSalesDataPage.toString(), this.shoppingStatus, this.salesFromAmount, this.salesToAmount, this.salesFromFormatedDate, this.salesToFormatedDate, this.extractedShopperSlugData, this.extractedSalesPartnerSlug, this.extractedEmployeeThatMadeSalesSlug, this.salesCustomSearch);
        }
        else
        {
          this.getSalesData('', '', '', '', '', '', '', '', '', '');
        }

        // clearInterval(this.loopSalesDataFetch);

        }, 60000);

      resolve('done');

      });

  }

  filterSalesData() {

    if((this.salesFromDate == undefined)&&(this.salesToDate == undefined)&&(this.salesFromAmount == undefined)&&(this.salesToAmount == undefined)&&(this.shoppingStatus == undefined)&&(this.shopperSlug == undefined)&&(this.salesOfPartnerSlug == undefined)&&(this.employeeThatConfirmedShoppingSlug == undefined)&&(this.salesCustomSearch == undefined))
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

      if((this.shopperSlug != undefined))
      {
        this.extractedShopperSlugData = this.shopperSlug.substring(0, this.shopperSlug.indexOf(":"));
      }

      if((this.salesOfPartnerSlug != undefined))
      {
        this.extractedSalesPartnerSlug = this.salesOfPartnerSlug.substring(0, this.salesOfPartnerSlug.indexOf(":"));
      }

      if((this.employeeThatConfirmedShoppingSlug != undefined))
      {
        this.extractedEmployeeThatMadeSalesSlug = this.employeeThatConfirmedShoppingSlug.substring(0, this.employeeThatConfirmedShoppingSlug.indexOf(":"));
      }

      this.onSalesDataSearch = true;

      if((this.salesFromFormatedDate != undefined)&&(this.salesFromFormatedDate != ''))
      {
        this.salesFromFormatedDateSearchTitle = ' from '+new Date(this.salesFromFormatedDate);
      }
      else
      {
        this.salesFromFormatedDateSearchTitle = '';
      }

      if((this.salesToFormatedDate != undefined)&&(this.salesToFormatedDate != ''))
      {
        this.salesToFormatedDateSearchTitle = ' to '+new Date(this.salesToFormatedDate);
      }
      else
      {
        this.salesToFormatedDateSearchTitle = '';
      }
      if((this.shopperSlug != undefined)&&(this.shopperSlug != ''))
      {
        this.shopperSlugSearchTitle = ' by '+this.shopperFirstName+' '+this.shopperLastName;
      }
      else
      {
        this.shopperSlugSearchTitle = '';
      }

      if((this.employeeThatConfirmedShoppingSlug != undefined)&&(this.employeeThatConfirmedShoppingSlug != ''))
      {
        this.employeeThatConfirmedShoppingSlugSearchTitle = ' confirmed by '+this.employeeThatConfirmedShoppingFirstName+' '+this.employeeThatConfirmedShoppingLastNameData;
      }
      else
      {
        this.employeeThatConfirmedShoppingSlugSearchTitle = '';
      }

      if((this.salesFromAmount != undefined)&&(this.salesFromAmount != ''))
      {
        if(this.salesOfPartnerCurrency == undefined)
        {
          this.salesOfPartnerCurrency = 'KES';
        }
        this.salesFromAmountSearchTitle = '. Sales From '+this.salesOfPartnerCurrency+' '+this.salesFromAmount;
      }
      else
      {
        this.salesFromAmountSearchTitle = '';
      }

      if((this.salesToAmount != undefined)&&(this.salesToAmount != ''))
      {
        if(this.salesOfPartnerCurrency == undefined)
        {
          this.salesOfPartnerCurrency = 'KES';
        }
        this.salesToAmountSearchTitle = ' to '+this.salesOfPartnerCurrency+' '+this.salesToAmount;
      }
      else
      {
        this.salesToAmountSearchTitle = '';
      }

      if((this.extractedSalesPartnerSlug != undefined)&&(this.extractedSalesPartnerSlug != ''))
      {
        this.shoppingAtCompanySearchTitle = ' at '+this.salesOfPartnerName;
      }
      else
      {
        this.shoppingAtCompanySearchTitle = '';
      }

      if((this.salesCustomSearch != undefined)&&(this.salesCustomSearch != ''))
      {
        this.salesCustomSearchTitle = ' Search: "'+this.salesCustomSearch+'".';
      }
      else
      {
        this.salesCustomSearchTitle = '';
      }

      if((this.shoppingStatus != undefined)&&(this.shoppingStatus != ''))
      {
        if(this.shoppingStatus == 'pending')
        {
          this.shoppingStatusSearchTitle = 'Pending ';
        }
        else if(this.shoppingStatus == 'granted')
        {
          this.shoppingStatusSearchTitle = 'Completed ';
        }
        else
        {
          this.shoppingStatusSearchTitle = '';
        }
      }
      else
      {
        this.shoppingStatusSearchTitle = '';
      }

      this.showLoading('Searching ...');
      this.getSalesData('', this.shoppingStatus, this.salesFromAmount, this.salesToAmount, this.salesFromFormatedDate, this.salesToFormatedDate, this.extractedShopperSlugData, this.extractedSalesPartnerSlug, this.extractedEmployeeThatMadeSalesSlug, this.salesCustomSearch);
      Swal.close();
    }

  }

  loadMoreSalesData() {

    if(this.noMoreSalesDataToReturn == true)
    {
      this.showInfoMessage('No more data to return!');
    }
    else
    {
      var requestedSalesDataPage;

      if(this.currentSalesDataPage != undefined) {
        requestedSalesDataPage = parseInt(this.currentSalesDataPage) + 1;
      }
      else
      {
        requestedSalesDataPage = '1';
      }

      this.showLoading('Loading more ...');
      this.getSalesData(requestedSalesDataPage.toString(), this.shoppingStatus, this.salesFromAmount, this.salesToAmount, this.salesFromFormatedDate, this.salesToFormatedDate, this.extractedShopperSlugData, this.extractedSalesPartnerSlug, this.extractedEmployeeThatMadeSalesSlug, this.salesCustomSearch);
      this.currentSalesDataPage = requestedSalesDataPage;
      Swal.close();

    }   

  }

  getClientsList() {

    var user_slug = this.storage.get('89JHuitr_T__user_slug');
    var firebase_id = this.storage.get('89JHuitr_T__firebase_id');
    var active_token = this.storage.get('89JHuitr_T__active_login_token');
    var suggested_token = this.storage.get('89JHuitr_T__suggested_token');
    var user_company_of_employment_slug = this.storage.get('89JHuitr_T__user_company_of_employment_slug');

    this.http.get(this.apiLink+'/rest_get_users_list/?get_clients=true&user_company_of_employment_slug='+user_company_of_employment_slug+'&user_slug='+user_slug+'&firebase_id='+firebase_id+'&active_token='+active_token+'&suggested_token='+suggested_token+'&format=json').subscribe(

      clientsList => {

        this.clientsList = clientsList;

        },err => {
      })

  }

  getPartnersList() {

    var user_slug = this.storage.get('89JHuitr_T__user_slug');
    var firebase_id = this.storage.get('89JHuitr_T__firebase_id');
    var active_token = this.storage.get('89JHuitr_T__active_login_token');
    var suggested_token = this.storage.get('89JHuitr_T__suggested_token');

    this.http.get(this.apiLink+'/rest_get_partners_list/?user_slug='+user_slug+'&firebase_id='+firebase_id+'&active_token='+active_token+'&suggested_token='+suggested_token+'&format=json').subscribe(

      partnersList => {

        this.partnersList = partnersList;

        },err => {
      })

  }

  getEmployeesList(employeesOfCompanySlug: string) {

  	var user_slug = this.storage.get('89JHuitr_T__user_slug');
  	var firebase_id = this.storage.get('89JHuitr_T__firebase_id');
  	var active_token = this.storage.get('89JHuitr_T__active_login_token');
  	var suggested_token = this.storage.get('89JHuitr_T__suggested_token');

  	this.http.get(this.apiLink+'/rest_get_users_list/?user_company_of_employment_slug='+employeesOfCompanySlug+'&user_slug='+user_slug+'&firebase_id='+firebase_id+'&active_token='+active_token+'&suggested_token='+suggested_token+'&format=json').subscribe(

  		employeesList => {

  			this.employeesList = employeesList;

  			},err => {
  		})

  }

  getEmployeesOfCompanyList(employeesOfCompanySlug: string) {

    var user_slug = this.storage.get('89JHuitr_T__user_slug');
    var firebase_id = this.storage.get('89JHuitr_T__firebase_id');
    var active_token = this.storage.get('89JHuitr_T__active_login_token');
    var suggested_token = this.storage.get('89JHuitr_T__suggested_token');

    this.http.get(this.apiLink+'/rest_get_users_list/?user_company_of_employment_slug='+employeesOfCompanySlug+'&user_slug='+user_slug+'&firebase_id='+firebase_id+'&active_token='+active_token+'&suggested_token='+suggested_token+'&format=json').subscribe(

      employeesGrantingCreditList => {

        this.employeesGrantingCreditList = employeesGrantingCreditList;

        },err => {
      })

  }

  showBillaCreditFilter() {

    this.showBillaCreditsButtonOn = false;
    this.hideBillaCreditsButtonOn = true;
    this.showBillaCreditsFilterFields = true;

  }

  hideBillaCreditFilter() {

    this.showBillaCreditsButtonOn = true;
    this.hideBillaCreditsButtonOn = false;
    this.showBillaCreditsFilterFields = false;  

  }

  showSalesReportFilterFunction() {

  	this.hideSalesReportFilters = true;
  	this.hideSalesReportButtonFilters = true;
  	this.showSalesReportButtonFilters = false;

  }

  hideSalesReportFilterFunction() {

  	this.hideSalesReportFilters = false;
  	this.hideSalesReportButtonFilters = false;
  	this.showSalesReportButtonFilters = true; 	

  }

  saveCreditStatus() {

    if(this.billaCreditStatus == 'pending')
    {
      this.selectedCreditStatus = 'pending';
      this.selectedPaymentStatus = '';
    }
    else if(this.billaCreditStatus == 'granted')
    {
      this.selectedCreditStatus = 'granted';
      this.selectedPaymentStatus = '';
    }
    else if(this.billaCreditStatus == 'unpaid')
    {
      this.selectedCreditStatus = 'granted';
      this.selectedPaymentStatus = 'unpaid';
    }
    else if(this.billaCreditStatus == 'paid')
    {
      this.selectedCreditStatus = 'granted';
      this.selectedPaymentStatus = 'paid';
    }
    else
    {
      this.selectedCreditStatus = '';
      this.selectedPaymentStatus = '';
    }

  }

  saveSelectedLoanerNames() {

    var clientSlugData = this.creditTakenByClientSlug.substring(0, this.creditTakenByClientSlug.indexOf(":"));
    var loanerFirstNameAndLastNameData = this.creditTakenByClientSlug.substring(this.creditTakenByClientSlug.indexOf(":") + 1);

    this.creditTakenByClientFirstName = loanerFirstNameAndLastNameData.substring(0, loanerFirstNameAndLastNameData.indexOf(";"));
    this.creditTakenByClientLastName = loanerFirstNameAndLastNameData.substring(loanerFirstNameAndLastNameData.indexOf(";") + 1);

  }

  saveSelectedPartnerData() {

    var partnerSlugData = this.creditTakenAtPartnerSlug.substring(0, this.creditTakenAtPartnerSlug.indexOf(":"));
    var creditTakenAtCompanyNameAndCurrencyData = this.creditTakenAtPartnerSlug.substring(this.creditTakenAtPartnerSlug.indexOf(":") + 1);

    this.creditTakenAtCompanyName = creditTakenAtCompanyNameAndCurrencyData.substring(0, creditTakenAtCompanyNameAndCurrencyData.indexOf(";"));
    this.creditTakenAtCompanyInCurrency = creditTakenAtCompanyNameAndCurrencyData.substring(creditTakenAtCompanyNameAndCurrencyData.indexOf(";") + 1);

    this.getEmployeesOfCompanyList(partnerSlugData);

  }

  saveEmployeeWhoGrantedCreditNames() {

    var employeeGrantingCreditSlugData = this.creditGrantConfirmedByEmployeeSlug.substring(0, this.creditGrantConfirmedByEmployeeSlug.indexOf(":"));
    var employeeGrantingCreditFirstNameAndLastNameData = this.creditGrantConfirmedByEmployeeSlug.substring(this.creditGrantConfirmedByEmployeeSlug.indexOf(":") + 1);

    this.employeeGrantingCreditFirstName = employeeGrantingCreditFirstNameAndLastNameData.substring(0, employeeGrantingCreditFirstNameAndLastNameData.indexOf(";"));
    this.employeeGrantingCreditLastName = employeeGrantingCreditFirstNameAndLastNameData.substring(employeeGrantingCreditFirstNameAndLastNameData.indexOf(";") + 1);

  }

  filterBillaCreditsData() {

  	if((this.creditGrantedFromDate == undefined)&&(this.creditGrantedToDate == undefined)&&(this.creditGrantedFromAmount == undefined)&&(this.creditGrantedToAmount == undefined)&&(this.selectedCreditStatus == undefined)&&(this.creditTakenByClientSlug == undefined)&&(this.creditTakenAtPartnerSlug == undefined)&&(this.creditGrantConfirmedByEmployeeSlug == undefined)&&(this.billaCreditCustomSearch == undefined))
  	{
  		this.showInfoMessage('Please fill at least a field to proceed!');
  	}
  	else
  	{
  		if((this.creditGrantedFromDate != undefined))
  		{
  			var creditGrantedFromDay = this.creditGrantedFromDate.date.day;
		  	var creditGrantedFromMonth = this.creditGrantedFromDate.date.month;
		  	var creditGrantedFromYear = this.creditGrantedFromDate.date.year;	

		  	this.creditGrantedFromFormatedDate = creditGrantedFromYear+'-'+creditGrantedFromMonth+'-'+creditGrantedFromDay;	  	
  		}
  		else
  		{
  			this.creditGrantedFromFormatedDate = '';
  		}

  		if((this.creditGrantedToDate != undefined))
      {
        var creditGrantedToDay = this.creditGrantedToDate.date.day;
        var creditGrantedToMonth = this.creditGrantedToDate.date.month;
        var creditGrantedToYear = this.creditGrantedToDate.date.year; 

        this.creditGrantedToFormatedDate = creditGrantedToYear+'-'+creditGrantedToMonth+'-'+creditGrantedToDay;     
      }
      else
      {
        this.creditGrantedToFormatedDate = '';
      }

  		if((this.creditTakenByClientSlug != undefined))
  		{
  			this.extractedClientGettingLoanSlugData = this.creditTakenByClientSlug.substring(0, this.creditTakenByClientSlug.indexOf(":"));
  		}

      if((this.creditTakenAtPartnerSlug != undefined))
      {
        this.extractedPartnerSlug = this.creditTakenAtPartnerSlug.substring(0, this.creditTakenAtPartnerSlug.indexOf(":"));
      }

      if((this.creditGrantConfirmedByEmployeeSlug != undefined))
      {
        this.extractedEmployeeGrantingCreditSlug = this.creditGrantConfirmedByEmployeeSlug.substring(0, this.creditGrantConfirmedByEmployeeSlug.indexOf(":"));
      }



      this.onBillaCreditReportSearch = true;


      if((this.creditGrantedFromFormatedDate != undefined)&&(this.creditGrantedFromFormatedDate != ''))
      {
        this.creditGrantedFromFormatedDateSearchTitle = ' from '+new Date(this.creditGrantedFromFormatedDate);
      }
      else
      {
        this.creditGrantedFromFormatedDateSearchTitle = '';
      }

      if((this.creditGrantedToFormatedDate != undefined)&&(this.creditGrantedToFormatedDate != ''))
      {
        this.creditGrantedToFormatedDateSearchTitle = ' to '+new Date(this.creditGrantedToFormatedDate);
      }
      else
      {
        this.creditGrantedToFormatedDateSearchTitle = '';
      }

      if((this.creditGrantedToAmount != undefined)&&(this.creditGrantedToAmount != ''))
      {
        if(this.creditTakenAtCompanyInCurrency == undefined)
        {
          this.creditTakenAtCompanyInCurrency = 'KES';
        }
        this.creditGrantedToAmountSearchTitle = '. Sales From '+this.creditTakenAtCompanyInCurrency+' '+this.creditGrantedToAmount;
      }
      else
      {
        this.creditGrantedToAmountSearchTitle = '';
      }

      if((this.creditGrantedFromAmount != undefined)&&(this.creditGrantedFromAmount != ''))
      {
        if(this.creditTakenAtCompanyInCurrency == undefined)
        {
          this.creditTakenAtCompanyInCurrency = 'KES';
        }
        this.creditGrantedFromAmountSearchTitle = ' to '+this.creditTakenAtCompanyInCurrency+' '+this.creditGrantedFromAmount;
      }
      else
      {
        this.creditGrantedFromAmountSearchTitle = '';
      }

      if((this.extractedClientGettingLoanSlugData != undefined)&&(this.extractedClientGettingLoanSlugData != ''))
      {
        this.billaCreditTakenBysearchTitle = ' taken by '+this.creditTakenByClientFirstName+' '+this.creditTakenByClientLastName;
      }
      else
      {
        this.billaCreditTakenBysearchTitle = '';
      }

      if((this.extractedEmployeeGrantingCreditSlug != undefined)&&(this.extractedEmployeeGrantingCreditSlug != ''))
      {
        this.billaCreditGrantedBySearchTitle = ' granted by '+this.employeeGrantingCreditFirstName+' '+this.employeeGrantingCreditLastName;
      }
      else
      {
        this.billaCreditGrantedBySearchTitle = '';
      }

      if((this.extractedPartnerSlug != undefined)&&(this.extractedPartnerSlug != ''))
      {
        this.billaCreditGrantedAtCompanySearchTitle = ' at '+this.creditTakenAtCompanyName;
      }
      else
      {
        this.billaCreditGrantedAtCompanySearchTitle = '';
      }

      if((this.billaCreditCustomSearch != undefined)&&(this.billaCreditCustomSearch != ''))
      {
        this.billaCreditCustomSearchTitle = ' Search: "'+this.billaCreditCustomSearch+'".';
      }
      else
      {
        this.billaCreditCustomSearchTitle = '';
      }

      if(this.billaCreditStatus == 'pending')
      {
        this.billaCreditStatusSearchTitle = 'Pending ';
      }
      else if(this.billaCreditStatus == 'granted')
      {
        this.billaCreditStatusSearchTitle = 'Granted ';
      }
      else if(this.billaCreditStatus == 'unpaid')
      {
        this.billaCreditStatusSearchTitle = 'Unpaid ';
      }
      else if(this.billaCreditStatus == 'paid')
      {
        this.billaCreditStatusSearchTitle = 'Paid ';
      }
      else
      {
        this.billaCreditStatusSearchTitle = '';
      }

  		this.showLoading('Searching ...');
      this.getBillaCreditsData('', this.selectedCreditStatus, this.selectedPaymentStatus, this.creditGrantedFromAmount, this.creditGrantedToAmount, this.creditGrantedFromFormatedDate, this.creditGrantedToFormatedDate, this.extractedClientGettingLoanSlugData, this.extractedPartnerSlug, this.extractedEmployeeGrantingCreditSlug, this.billaCreditCustomSearch);
  		Swal.close();
  	}

  }

  saveSelectedEmployeeNames() {

  	var employeeSlugData = this.salesMadeByEmployeeSlug.substring(0, this.salesMadeByEmployeeSlug.indexOf(":"));
  	var employeeFirstNameAndLastNameData = this.salesMadeByEmployeeSlug.substring(this.salesMadeByEmployeeSlug.indexOf(":") + 1);

  	this.salesMadeByEmployeeFName = employeeFirstNameAndLastNameData.substring(0, employeeFirstNameAndLastNameData.indexOf(";"));
  	this.salesMadeByEmployeeLName = employeeFirstNameAndLastNameData.substring(employeeFirstNameAndLastNameData.indexOf(";") + 1);

  }

  loadMoreBillaCreditsData() {

    if(this.noMoreBillaCreditDataToReturn == true)
    {
      this.showInfoMessage('No more data to return!');
    }
    else
    {
      var requestedBillaCreditPage;

      if(this.currentBillaCreditDataPage != undefined) {
        requestedBillaCreditPage = parseInt(this.currentBillaCreditDataPage) + 1;
      }
      else
      {
        requestedBillaCreditPage = '1';
      }

      this.showLoading('Loading more ...');
      this.getBillaCreditsData(requestedBillaCreditPage.toString(), this.creditStatus, this.paymentStatus, this.amountGrantedFrom, this.amountGrantedTo, this.grantedFromDate, this.grantedToDate, this.extractedClientGettingLoanSlugData, this.extractedPartnerSlug, this.extractedEmployeeGrantingCreditSlug, this.customSearch);
      this.currentBillaCreditDataPage = requestedBillaCreditPage;

      Swal.close();

    }   

  }

  viewOrderDetails(orderCode: string) {

    this.storage.set('89JHuitr_T__order_to_view_cart_code', orderCode);

    this.router.navigateByUrl('/order-details');

  }



































































  getBillaEmployeesList() {

    var user_slug = this.storage.get('89JHuitr_T__user_slug');
    var firebase_id = this.storage.get('89JHuitr_T__firebase_id');
    var active_token = this.storage.get('89JHuitr_T__active_login_token');
    var suggested_token = this.storage.get('89JHuitr_T__suggested_token');

    this.http.get(this.apiLink+'/rest_get_users_list/?user_company_of_employment_slug=&billa_employees=true&user_slug='+user_slug+'&firebase_id='+firebase_id+'&active_token='+active_token+'&suggested_token='+suggested_token+'&format=json').subscribe(

      billaEmployeesList => {

        this.billaEmployeesList = billaEmployeesList;

        },err => {
      })

  }

  getNumberSupportTickets(requestedPage: string, supportFromFormatedDate: string, supportToFormatedDate: string, supportFromCompanySlug: string, employeeRequestingSupportSlug: string, supportGivenByEmployeeSlug: string, ticketStatus: string, customSearch: string) {

    var user_slug = this.storage.get('89JHuitr_T__user_slug');
    var firebase_id = this.storage.get('89JHuitr_T__firebase_id');
    var active_token = this.storage.get('89JHuitr_T__active_login_token');
    var suggested_token = this.storage.get('89JHuitr_T__suggested_token');
    // var user_company_of_employment_slug = this.storage.get('89JHuitr_T__user_company_of_employment_slug');

    this.http.get(this.apiLink+'/rest_get_number_of_returned_tickets/?requested_page='+requestedPage+'&support_from_formated_date='+supportFromFormatedDate+'&support_to_formated_date='+supportToFormatedDate+'&support_from_company_slug='+supportFromCompanySlug+'&support_requested_by_employee_slug='+employeeRequestingSupportSlug+'&ticket_solved_by_employee_slug='+supportGivenByEmployeeSlug+'&ticket_status='+ticketStatus+'&custom_search='+customSearch+'&user_company_of_employment_slug='+supportFromCompanySlug+'&user_slug='+user_slug+'&firebase_id='+firebase_id+'&active_token='+active_token+'&suggested_token='+suggested_token+'&format=json').subscribe(

      numberOfReturnedTickettsData => {

        if(numberOfReturnedTickettsData[0].result == '1')
        {
          this.numberOfReturnedTicketsDataTitle = 'Returned '+numberOfReturnedTickettsData[0].number_of_returned_tickets+' of '+numberOfReturnedTickettsData[0].number_of_all_tickets;
        
          if(numberOfReturnedTickettsData[0].number_of_returned_tickets >= numberOfReturnedTickettsData[0].number_of_all_tickets)
          {
            this.noMoreSupportTicketsDataToReturn = true;
          }

        }
        else
        {
          this.numberOfReturnedTicketsDataTitle = '';
        }

        },err => {
      })

  }  

  getSupportTickets(requestedPage: string, supportFromFormatedDate: string, supportToFormatedDate: string, supportFromCompanySlug: string, employeeRequestingSupportSlug: string, supportGivenByEmployeeSlug: string, ticketStatus: string, customSearch: string) {

    var user_slug = this.storage.get('89JHuitr_T__user_slug');
    var firebase_id = this.storage.get('89JHuitr_T__firebase_id');
    var active_token = this.storage.get('89JHuitr_T__active_login_token');
    var suggested_token = this.storage.get('89JHuitr_T__suggested_token');
    // var user_company_of_employment_slug = this.storage.get('89JHuitr_T__user_company_of_employment_slug');

    this.http.get(this.apiLink+'/rest_get_support_tickets_list/?requested_page='+requestedPage+'&support_from_formated_date='+supportFromFormatedDate+'&support_to_formated_date='+supportToFormatedDate+'&support_from_company_slug='+supportFromCompanySlug+'&support_requested_by_employee_slug='+employeeRequestingSupportSlug+'&ticket_solved_by_employee_slug='+supportGivenByEmployeeSlug+'&ticket_status='+ticketStatus+'&custom_search='+customSearch+'&user_company_of_employment_slug='+supportFromCompanySlug+'&user_slug='+user_slug+'&firebase_id='+firebase_id+'&active_token='+active_token+'&suggested_token='+suggested_token+'&format=json').subscribe(

      supportDiscussionsData => {

        this.stopSupportDiscussionsFetchLoading = true;

        this.supportDiscussionsData = supportDiscussionsData;

        this.getNumberSupportTickets(requestedPage, supportFromFormatedDate, supportToFormatedDate, supportFromCompanySlug, employeeRequestingSupportSlug, supportGivenByEmployeeSlug, ticketStatus, customSearch);

        if(this.onSupportTicketsDataSearch == undefined)
        {
          this.ticketsTitle = 'Support Tickets';
        }
        else
        {
          this.ticketsTitle = this.supportTicketStatusSearchTitle+' Tickets '+this.supportRequestedByEmployeeSearchTitle+' '+this.supportRequestedAtPartnerNameSearchTitle+' '+this.ticketsSupportedFromFromFormatedDateSearchTitle+' '+this.ticketsSupportedToFormatedDateSearchTitle+' '+this.supportGivenByEmployeeSearchTitle+' '+this.supportTicketCustomSearchTitle;
        }

        },err => {
      })

  }

  launchSupportTicketsFetch() {

    return new Promise((resolve) => {

      this.loopSupportTicketsDataFetch = setInterval(() => {

        if(this.onSupportTicketsDataSearch == true)
        {
          if((this.currentSupportTicketsDataPage == undefined)||(this.currentSupportTicketsDataPage == ''))
          {
            this.currentSupportTicketsDataPage == '';
          }

          this.getSupportTickets(this.currentSupportTicketsDataPage.toString(), this.ticketsSupportedFromFromFormatedDate, this.ticketsSupportedToFormatedDate, this.supportRequestedAtCompanyExtratedSlug, this.supportRequestedByEmployeeExtratedSlug, this.supportGivenByEmployeeExtratedSlug, this.supportTicketStatus, this.supportTicketCustomSearch);

        }
        else
        {
          this.getSupportTickets('', '', '', '', '', '', '', '');
        }

        // clearInterval(this.loopSupportTicketsDataFetch);

        }, 60000);

      resolve('done');

      });

  }

  getEmployeesOfPartnerRequestingSupport(employeesOfCompanySlug: string) {

    var user_slug = this.storage.get('89JHuitr_T__user_slug');
    var firebase_id = this.storage.get('89JHuitr_T__firebase_id');
    var active_token = this.storage.get('89JHuitr_T__active_login_token');
    var suggested_token = this.storage.get('89JHuitr_T__suggested_token');

    this.http.get(this.apiLink+'/rest_get_users_list/?user_company_of_employment_slug='+employeesOfCompanySlug+'&user_slug='+user_slug+'&firebase_id='+firebase_id+'&active_token='+active_token+'&suggested_token='+suggested_token+'&format=json').subscribe(

      employeesOfPartnerRequestingSupportList => {

        this.employeesOfPartnerRequestingSupportList = employeesOfPartnerRequestingSupportList;

        },err => {
      })

  }

  saveDataOfPartnerThatRequestedSupport() {

    var theSlugOfPartnerFromWhereSupportIsRequested = this.supportRequestedAtPartnerSlug.substring(0, this.supportRequestedAtPartnerSlug.indexOf(":"));
    var supportRequestedAtPartnerNameAndCurrencyData = this.supportRequestedAtPartnerSlug.substring(this.supportRequestedAtPartnerSlug.indexOf(":") + 1);

    this.supportRequestedAtPartnerName = supportRequestedAtPartnerNameAndCurrencyData.substring(0, supportRequestedAtPartnerNameAndCurrencyData.indexOf(";"));

    this.getEmployeesOfPartnerRequestingSupport(theSlugOfPartnerFromWhereSupportIsRequested);

  }

  saveEmployeeThatRequestedSupportNames() {

    var supportRequestedByEmployeeSlugData = this.supportRequestedByEmployeeSlug.substring(0, this.supportRequestedByEmployeeSlug.indexOf(":"));
    var supportRequestedByEmployeeFirstNameAndLastNameData = this.supportRequestedByEmployeeSlug.substring(this.supportRequestedByEmployeeSlug.indexOf(":") + 1);

    this.supportRequestedByEmployeeFirstName = supportRequestedByEmployeeFirstNameAndLastNameData.substring(0, supportRequestedByEmployeeFirstNameAndLastNameData.indexOf(";"));
    this.supportRequestedByEmployeeLastName = supportRequestedByEmployeeFirstNameAndLastNameData.substring(supportRequestedByEmployeeFirstNameAndLastNameData.indexOf(";") + 1);

  }

  saveNamesOfEmployeeThatGaveSupport() {

    var supportGivenByEmployeeSlugData = this.supportGivenByEmployeeSlug.substring(0, this.supportGivenByEmployeeSlug.indexOf(":"));
    var supportGivenByEmployeeFirstNameAndLastNameData = this.supportGivenByEmployeeSlug.substring(this.supportGivenByEmployeeSlug.indexOf(":") + 1);

    this.supportGivenByEmployeeFirstName = supportGivenByEmployeeFirstNameAndLastNameData.substring(0, supportGivenByEmployeeFirstNameAndLastNameData.indexOf(";"));
    this.supportGivenByEmployeeLastName = supportGivenByEmployeeFirstNameAndLastNameData.substring(supportGivenByEmployeeFirstNameAndLastNameData.indexOf(";") + 1);

  }

  filterSupportTicketsData() {

    if((this.ticketsSupportedFromDate == undefined)&&(this.ticketsSupportedToDate == undefined)&&(this.supportRequestedByEmployeeSlug == undefined)&&(this.supportRequestedAtPartnerSlug == undefined)&&(this.supportGivenByEmployeeSlug == undefined)&&(this.supportTicketStatus == undefined)&&(this.supportTicketCustomSearch == undefined))
    {
      this.showInfoMessage('Please fill at least a field to proceed!');
    }
    else
    {
      if((this.ticketsSupportedFromDate != undefined))
      {
        var ticketsSupportedFromDay = this.ticketsSupportedFromDate.date.day;
        var ticketsSupportedFromMonth = this.ticketsSupportedFromDate.date.month;
        var ticketsSupportedFromYear = this.ticketsSupportedFromDate.date.year; 

        this.ticketsSupportedFromFromFormatedDate = ticketsSupportedFromYear+'-'+ticketsSupportedFromMonth+'-'+ticketsSupportedFromDay;     
      }
      else
      {
        this.ticketsSupportedFromFromFormatedDate = '';
      }

      if((this.ticketsSupportedToDate != undefined))
      {
        var ticketsSupportedToDay = this.ticketsSupportedToDate.date.day;
        var ticketsSupportedToMonth = this.ticketsSupportedToDate.date.month;
        var ticketsSupportedToYear = this.ticketsSupportedToDate.date.year; 

        this.ticketsSupportedToFormatedDate = ticketsSupportedToYear+'-'+ticketsSupportedToMonth+'-'+ticketsSupportedToDay;     
      }
      else
      {
        this.ticketsSupportedToFormatedDate = '';
      }

      if((this.supportRequestedByEmployeeSlug != undefined))
      {
        this.supportRequestedByEmployeeExtratedSlug = this.supportRequestedByEmployeeSlug.substring(0, this.supportRequestedByEmployeeSlug.indexOf(":"));
      }

      if((this.supportRequestedAtPartnerSlug != undefined))
      {
        this.supportRequestedAtCompanyExtratedSlug = this.supportRequestedAtPartnerSlug.substring(0, this.supportRequestedAtPartnerSlug.indexOf(":"));
      }

      if((this.supportGivenByEmployeeSlug != undefined))
      {
        this.supportGivenByEmployeeExtratedSlug = this.supportGivenByEmployeeSlug.substring(0, this.supportGivenByEmployeeSlug.indexOf(":"));
      }


      this.onSupportTicketsDataSearch = true;


      if((this.ticketsSupportedFromFromFormatedDate != undefined)&&(this.ticketsSupportedFromFromFormatedDate != ''))
      {
        this.ticketsSupportedFromFromFormatedDateSearchTitle = ' from '+new Date(this.ticketsSupportedFromFromFormatedDate);
      }
      else
      {
        this.ticketsSupportedFromFromFormatedDateSearchTitle = '';
      }

      if((this.ticketsSupportedToFormatedDate != undefined)&&(this.ticketsSupportedToFormatedDate != ''))
      {
        this.ticketsSupportedToFormatedDateSearchTitle = ' to '+new Date(this.ticketsSupportedToFormatedDate);
      }
      else
      {
        this.ticketsSupportedToFormatedDateSearchTitle = '';
      }

      if((this.supportRequestedByEmployeeExtratedSlug != undefined)&&(this.supportRequestedByEmployeeExtratedSlug != ''))
      {
        this.supportRequestedByEmployeeSearchTitle = ' requested by '+this.supportRequestedByEmployeeFirstName+' '+this.supportRequestedByEmployeeLastName;
      }
      else
      {
        this.supportRequestedByEmployeeSearchTitle = '';
      }

      if((this.supportRequestedAtCompanyExtratedSlug != undefined)&&(this.supportRequestedAtCompanyExtratedSlug != ''))
      {
        this.supportRequestedAtPartnerNameSearchTitle = ' from '+this.supportRequestedAtPartnerName;
      }
      else
      {
        this.supportRequestedAtPartnerNameSearchTitle = '';
      }

      if((this.supportGivenByEmployeeExtratedSlug != undefined)&&(this.supportGivenByEmployeeExtratedSlug != ''))
      {
        this.supportGivenByEmployeeSearchTitle = ' supported by '+this.supportGivenByEmployeeFirstName+' '+this.supportGivenByEmployeeLastName;
      }
      else
      {
        this.supportGivenByEmployeeSearchTitle = '';
      }

      if((this.supportTicketCustomSearch != undefined)&&(this.supportTicketCustomSearch != ''))
      {
        this.supportTicketCustomSearchTitle = '. Search: "'+this.supportTicketCustomSearch+'".';
      }
      else
      {
        this.supportTicketCustomSearchTitle = '';
      }

      if(this.supportTicketStatus == 'true')
      {
        this.supportTicketStatusSearchTitle = 'Solved ';
      }
      else if(this.supportTicketStatus == 'false')
      {
        this.supportTicketStatusSearchTitle = 'Pending ';
      }
      else
      {
        this.supportTicketStatusSearchTitle = '';
      }

      this.showLoading('Searching ...');
      this.getSupportTickets('', this.ticketsSupportedFromFromFormatedDate, this.ticketsSupportedToFormatedDate, this.supportRequestedAtCompanyExtratedSlug, this.supportRequestedByEmployeeExtratedSlug, this.supportGivenByEmployeeExtratedSlug, this.supportTicketStatus, this.supportTicketCustomSearch);
      Swal.close();
    }

  }

  loadMoreSupportTicketsData() {

    if(this.noMoreSupportTicketsDataToReturn == true)
    {
      this.showInfoMessage('No more data to return!');
    }
    else
    {
      var requestedSupportTicketsDataPage;

      if(this.currentSupportTicketsDataPage != undefined) {
        requestedSupportTicketsDataPage = parseInt(this.currentSupportTicketsDataPage) + 1;
      }
      else
      {
        requestedSupportTicketsDataPage = '1';
      }

      this.showLoading('Loading more ...');
      this.getSupportTickets(requestedSupportTicketsDataPage.toString(), this.ticketsSupportedFromFromFormatedDate, this.ticketsSupportedToFormatedDate, this.supportRequestedAtCompanyExtratedSlug, this.supportRequestedByEmployeeExtratedSlug, this.supportGivenByEmployeeExtratedSlug, this.supportTicketStatus, this.supportTicketCustomSearch);
      this.currentSupportTicketsDataPage = requestedSupportTicketsDataPage;
      Swal.close();

    }   

  }

  showSupportTicketsFilter() {

    this.showSupportCreditsFilterButtons = false;
    this.hideSupportCreditsFilterButtons = true;
    this.showSupportCreditsFilter = true;

  }

  hideSupportTicketsFilter() {

    this.showSupportCreditsFilterButtons = true;
    this.hideSupportCreditsFilterButtons = false;
    this.showSupportCreditsFilter = false;

  }

  viewTicketDetails(ticketSlug: string) {

    this.storage.set('89JHuitr_T__ticket_to_view_slug', ticketSlug);
    this.storage.set('89JHuitr_T__ticket_reply_type', 'support');

    this.router.navigateByUrl('/ticket-details');

  }





























}
