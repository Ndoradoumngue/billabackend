import { Component, Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';

import { AuthModule } from './auth/auth.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'billabackend';

  public apiLink: any;
  public tokenRenewalData: any;

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService, public http: HttpClient, private auth: AuthModule) {

  	this.apiLink = "http://localhost:8000";
    this.launchLoginTokenRenewal();

  }

  launchLoginTokenRenewal() {

    this.auth.requestLoginTokenRenewal().then((loginTokenRenewal) => {

      // loginTokenRenewal

      });

  }
  
  renewToken() {

    var user_slug = this.storage.get('89JHuitr_T__user_slug');
    var firebase_id = this.storage.get('89JHuitr_T__firebase_id');
    var currently_suggested_token = this.storage.get('89JHuitr_T__suggested_token');
    var current_token = this.storage.get('89JHuitr_T__active_login_token');

    this.http.get(this.apiLink+'/rest_authentication/?firebase_id='+firebase_id+'&user_slug='+user_slug+'&current_token='+current_token+'&suggested_token='+currently_suggested_token+'&format=json').subscribe(

      tokenRenewalData => {

        if(tokenRenewalData[0].login_result == '11')
        {
          this.storage.set('89JHuitr_T__suggested_token', tokenRenewalData[0].suggested_token);
          this.storage.set('89JHuitr_T__active_login_token', currently_suggested_token);
        }
        else if(tokenRenewalData[0].login_result == '10')
        {
          this.storage.set('89JHuitr_T__suggested_token', tokenRenewalData[0].suggested_token);
        }
        else
        {}

        },err => {

          })

  }

  requestLoginTokenRenewal() {

    this.auth.checkLogin().then((loginInfo) => {

      if((loginInfo == 'true')) {

        var theTimer = setInterval(

          function()
          {
            // clearInterval(theTimer);

            this.renewToken();

          },40000); 
        
      }

      });

  }
}
