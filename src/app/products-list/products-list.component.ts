import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

import { AuthModule } from '../auth/auth.module';
import { CommonDataModule } from '../common-data/common-data.module';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  public apiLink: any;
  public productsData: any;
  public employeesList: any;
  public showFilters: any; 
  public hideButtonFilters: any;
  public showButtonFilters: any; 
  public stopProductsListFetchLoading: any;
  public productsFromDate: any;
  public productsToDate: any;
  public productsAddedByEmployeeSlug: any;
  public productsAddedFromFormatedDate: any;
  public productsAddedToFormatedDate: any;
  public currentPage: any;
  public salesDataSubtitle: any;
  public numberOfReturnedProductsDataTitle: any;
  public productsAddedByEmployeeLName: any;
  public productsAddedByEmployeeFName: any;
  public productCategoryName: any;
  public extractedEmployeeSlugData: any;
  public noMoreDataToReturn: any;
  public productCategoriesList: any;
  public productCategorySlug: any;
  public extracteProductCategorySlug: any;
  public minimumPrice: any;
  public maximumPrice: any;
  public advertised: any;
  public productStatus: any;
  public customSearch: any;

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
  	this.stopProductsListFetchLoading = false;

  	this.testUserLogin();
  	this.getProductsList('', '', '', '', '', '', '', '', '', '');

  	this.getEmployeesList();
  	this.getProductCategoriesList();

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

  getNumberOfReturnedProducts(requestedPage: string, productsFromDate: string, productsToDate: string, productsAddedByEmployeeSlug: string, custom_search: string, advertised: string, product_category_slug: string, active: string, minimum_price: string, maximum_price: string) {

  	var user_slug = this.storage.get('89JHuitr_T__user_slug');
  	var firebase_id = this.storage.get('89JHuitr_T__firebase_id');
  	var active_token = this.storage.get('89JHuitr_T__active_login_token');
  	var suggested_token = this.storage.get('89JHuitr_T__suggested_token');
  	var products_of_company_slug = this.storage.get('89JHuitr_T__user_company_of_employment_slug');

  	this.http.get(this.apiLink+'/rest_get_number_of_returned_products_data/?on_page_number='+requestedPage+'&partner_slug='+products_of_company_slug+'&products_from_date='+productsFromDate+'&products_to_date='+productsToDate+'&products_added_by_employee_slug='+productsAddedByEmployeeSlug+'&custom_search='+custom_search+'&advertised='+advertised+'&product_category_slug='+product_category_slug+'&active='+active+'&minimum_price='+minimum_price+'&maximum_price='+maximum_price+'&user_slug='+user_slug+'&firebase_id='+firebase_id+'&active_token='+active_token+'&suggested_token='+suggested_token+'&format=json').subscribe(

  		numberOfReturnedProductsData => {

  			if(numberOfReturnedProductsData[0].result == '1')
  			{
  				this.numberOfReturnedProductsDataTitle = 'Returned '+numberOfReturnedProductsData[0].number_of_returned_items+' of '+numberOfReturnedProductsData[0].number_of_all_items;
  			
  				if(numberOfReturnedProductsData[0].number_of_returned_items >= numberOfReturnedProductsData[0].number_of_all_items)
  				{
  					this.noMoreDataToReturn = true;
  				}

  			}
  			else
  			{
  				this.numberOfReturnedProductsDataTitle = '';
  			}

  			},err => {
  		})

  }

  getProductsList(requestedPage: string, productsFromDate: string, productsToDate: string, productsAddedByEmployeeSlug: string, custom_search: string, advertised: string, product_category_slug: string, active: string, minimum_price: string, maximum_price: string) {

  	var user_slug = this.storage.get('89JHuitr_T__user_slug');
  	var firebase_id = this.storage.get('89JHuitr_T__firebase_id');
  	var active_token = this.storage.get('89JHuitr_T__active_login_token');
  	var suggested_token = this.storage.get('89JHuitr_T__suggested_token');
  	var products_of_company_slug = this.storage.get('89JHuitr_T__user_company_of_employment_slug');

  	this.http.get(this.apiLink+'/rest_list_of_partner_products/?on_page_number='+requestedPage+'&partner_slug='+products_of_company_slug+'&products_from_date='+productsFromDate+'&products_to_date='+productsToDate+'&products_added_by_employee_slug='+productsAddedByEmployeeSlug+'&custom_search='+custom_search+'&advertised='+advertised+'&product_category_slug='+product_category_slug+'&active='+active+'&minimum_price='+minimum_price+'&maximum_price='+maximum_price+'&user_slug='+user_slug+'&firebase_id='+firebase_id+'&active_token='+active_token+'&suggested_token='+suggested_token+'&format=json').subscribe(

  		productsData => {

  			// hide loadings

  			this.stopProductsListFetchLoading = true;

  			this.productsData = productsData;

  			this.getNumberOfReturnedProducts(requestedPage, productsFromDate, productsToDate, productsAddedByEmployeeSlug, custom_search, advertised, product_category_slug, active, minimum_price, maximum_price);

  			if(productsFromDate != '')
  			{
  				if((productsFromDate == undefined)||(productsFromDate == 'undefined'))
  				{
  					productsFromDate = '';
  				}
  				else
  				{
  					productsFromDate = ' from '+new Date(productsFromDate);
  				}
  				
  			}
  			else
  			{
  				productsFromDate = '';
  			}

  			if(productsToDate != '')
  			{
  				if((productsToDate == undefined)||(productsToDate == 'undefined'))
  				{
  					productsToDate = '';
  				}
  				else
  				{
  					productsToDate = ' to '+new Date(productsToDate);
  				}
  				
  			}
  			else
  			{
  				productsToDate = '';
  			}

  			if(this.productsAddedByEmployeeFName != undefined)
  			{
  				productsAddedByEmployeeSlug = ' added by '+this.productsAddedByEmployeeFName+' '+this.productsAddedByEmployeeLName;
  			}
  			else
  			{
  				productsAddedByEmployeeSlug = '';
  			}

  			if(this.productCategoryName != undefined)
  			{
  				product_category_slug = ' in '+this.productCategoryName+' category';
  			}
  			else
  			{
  				product_category_slug = '';
  			}

  			if(advertised != '')
  			{
  				if((advertised == undefined)||(advertised == 'undefined'))
  				{
  					advertised = ''
  				}
  				else
  				{
  					advertised = 'Advertised ';
  				}
  				
  			}
  			else
  			{
  				advertised = ''
  			}

  			if(custom_search != '')
  			{
  				if((custom_search == undefined)||(custom_search == 'undefined'))
  				{
  					custom_search = ''
  				}
  				else
  				{
  					custom_search = ' : '+custom_search;
  				}
  				
  			}
  			else
  			{
  				custom_search = ''
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
	  					active = ' Active ';
	  				}
	  				else
	  				{
	  					active = ' Deactive ';
	  				}
	  			}
  				
  			}
  			else
  			{
  				active = '';
  			}

  			if(minimum_price != '')
  			{
  				if((minimum_price == undefined)||(minimum_price == 'undefined'))
  				{
  					minimum_price = ''
  				}
  				else
  				{
  					minimum_price = ' from KES '+minimum_price;
  				}
  				
  			}
  			else
  			{
  				minimum_price = ''
  			}

  			if(maximum_price != '')
  			{
  				if((maximum_price == undefined)||(maximum_price == 'undefined'))
  				{
  					maximum_price = ''
  				}
  				else
  				{
  					maximum_price = ' to KES '+maximum_price;
  				}
  				
  			}
  			else
  			{
  				maximum_price = ''
  			}

  			this.salesDataSubtitle = active+' '+advertised+' Products '+productsAddedByEmployeeSlug+' '+productsFromDate+' '+productsToDate+' '+product_category_slug+''+minimum_price+' '+maximum_price+' '+custom_search;  			

  			},err => {
  		})

  }

  viewProductDetails(productSlug: string) {

  	this.storage.set('89JHuitr_T__product_to_view_slug', productSlug);

  	this.router.navigateByUrl('/product-details');

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

  getProductCategoriesList() {

  	var user_slug = this.storage.get('89JHuitr_T__user_slug');
  	var firebase_id = this.storage.get('89JHuitr_T__firebase_id');
  	var active_token = this.storage.get('89JHuitr_T__active_login_token');
  	var suggested_token = this.storage.get('89JHuitr_T__suggested_token');
  	var user_company_of_employment_slug = this.storage.get('89JHuitr_T__user_company_of_employment_slug');

  	this.http.get(this.apiLink+'/rest_get_product_categories_list/?active=true&user_slug='+user_slug+'&firebase_id='+firebase_id+'&active_token='+active_token+'&suggested_token='+suggested_token+'&format=json').subscribe(

  		productCategoriesList => {

  			this.productCategoriesList = productCategoriesList;

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

  	if((this.minimumPrice == undefined)&&(this.maximumPrice == undefined)&&(this.productsFromDate == undefined)&&(this.productsToDate == undefined)&&(this.productCategorySlug == undefined)&&(this.advertised == undefined)&&(this.productsAddedByEmployeeSlug == undefined)&&(this.productStatus == undefined)&&(this.customSearch == undefined))
    {
      this.showInfoMessage('Please fill at least a field to proceed!');
    }
    else
    {
      if((this.productsFromDate != undefined))
      {
        var salesFromDay = this.productsFromDate.date.day;
        var salesFromMonth = this.productsFromDate.date.month;
        var salesFromYear = this.productsFromDate.date.year;  

        this.productsAddedFromFormatedDate = salesFromYear+'-'+salesFromMonth+'-'+salesFromDay;     
      }
      else
      {
        this.productsAddedFromFormatedDate = '';
      }

      if((this.productsToDate != undefined))
      {
        var salesToDay = this.productsToDate.date.day;
        var salesToMonth = this.productsToDate.date.month;
        var salesToYear = this.productsToDate.date.year;

        this.productsAddedToFormatedDate = salesToYear+'-'+salesToMonth+'-'+salesToDay;   
      }
      else
      {
        this.productsAddedToFormatedDate = '';
      }

      if((this.productsAddedByEmployeeSlug != undefined))
      {
        this.extractedEmployeeSlugData = this.productsAddedByEmployeeSlug.substring(0, this.productsAddedByEmployeeSlug.indexOf(":"));
      }

      if((this.productCategorySlug != undefined))
      {
        this.extracteProductCategorySlug = this.productCategorySlug.substring(0, this.productCategorySlug.indexOf(":"));
      }


      this.showLoading('Searching ...');

      this.getProductsList('', this.productsAddedFromFormatedDate, this.productsAddedToFormatedDate, this.extractedEmployeeSlugData, this.customSearch, this.advertised, this.extracteProductCategorySlug, this.productStatus, this.minimumPrice, this.maximumPrice);

      Swal.close();
    }

  }

  saveSelectedProductCategoryName() {

  	this.productCategoryName = this.productCategorySlug.substring(this.productCategorySlug.indexOf(":") + 1);

  }

  saveSelectedEmployeeNames() {

  	var employeeSlugData = this.productsAddedByEmployeeSlug.substring(0, this.productsAddedByEmployeeSlug.indexOf(":"));
  	var employeeFirstNameAndLastNameData = this.productsAddedByEmployeeSlug.substring(this.productsAddedByEmployeeSlug.indexOf(":") + 1);

  	this.productsAddedByEmployeeFName = employeeFirstNameAndLastNameData.substring(0, employeeFirstNameAndLastNameData.indexOf(";"));
  	this.productsAddedByEmployeeLName = employeeFirstNameAndLastNameData.substring(employeeFirstNameAndLastNameData.indexOf(";") + 1);

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
	  	this.getProductsList(requestedPage.toString(), this.productsAddedFromFormatedDate, this.productsAddedToFormatedDate, this.extractedEmployeeSlugData, this.customSearch, this.advertised, this.extracteProductCategorySlug, this.productStatus, this.minimumPrice, this.maximumPrice);
	  	this.currentPage = requestedPage;

	  	Swal.close();

  	}  	

  }

  addNewProduct()
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
          window.location.href = this.apiLink+'/add-partner-product?token='+addNewProductRequestData[0].token+'&user='+user_slug;
        }
        else
        {
          this.showErrorMessage(addNewProductRequestData[0].error);
        }

        },err => {
      })
  }

}
