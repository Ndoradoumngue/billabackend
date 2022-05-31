import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AtomSpinnerModule, HalfCircleSpinnerModule } from 'angular-epic-spinners';
import { StorageServiceModule} from 'angular-webstorage-service';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { ChartsModule } from 'ng2-charts';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { CustomerSupportComponent } from './customer-support/customer-support.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { SalesReportComponent } from './sales-report/sales-report.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BillaAdministratorComponent } from './billa-administrator/billa-administrator.component';

import { AuthModule } from './auth/auth.module';
import { CommonDataModule } from './common-data/common-data.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashbordComponent,
    HeaderComponent,
    FooterComponent,
    OrdersListComponent,
    OrderDetailsComponent,
    ProductsListComponent,
    ProductDetailsComponent,
    UsersListComponent,
    UserDetailsComponent,
    CustomerSupportComponent,
    SalesReportComponent,
    SidebarComponent,
    BillaAdministratorComponent,
    TicketDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ChartsModule,
    HttpClientModule,
    AtomSpinnerModule,
    StorageServiceModule,
    HalfCircleSpinnerModule,
    AuthModule,
    CommonDataModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AngularFireDatabaseModule,
    FormsModule,
    NgbModule,
    AngularFireStorageModule,
    NgxMyDatePickerModule.forRoot(),

    RouterModule.forRoot([
    	{
    		path: '',
		    redirectTo: '/login',
		    pathMatch: 'full'
		},
        {
            path: 'billa-administrator',
            component: BillaAdministratorComponent
        },
		{
		    path: 'login',
		    component: LoginComponent
		},
		{
		    path: 'dashbord',
		    component: DashbordComponent
		},
		{
		    path: 'orders',
		    component: OrdersListComponent
		},
        {
            path: 'sales-report',
            component: SalesReportComponent
        },
		{
		    path: 'order-details',
		    component: OrderDetailsComponent
		},
		{
		    path: 'products',
		    component: ProductsListComponent
		},
		{
		    path: 'product-details',
		    component: ProductDetailsComponent
		},
		{
		    path: 'users',
		    component: UsersListComponent
		},
        {
            path: 'user-details',
            component: UserDetailsComponent
        },
		{
		    path: 'customer-support',
		    component: CustomerSupportComponent
		},
        {
            path: 'ticket-details',
            component: TicketDetailsComponent
        }

    ])

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
