import { NgModule, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';

import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class AuthModule {

	public apiLink: any;
	public renewTokenLoop: any;

	constructor(@Inject(LOCAL_STORAGE) private storage: StorageService, public http: HttpClient) {
		this.apiLink = "http://localhost:8000";
	}

	checkLogin() {

		return new Promise((resolve) => {

			var user_is_logged = this.storage.get('89JHuitr_T__user_is_logged');
			resolve(user_is_logged);

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

		return new Promise((resolve) => {

			var loginInfo = this.storage.get('89JHuitr_T__user_is_logged');
			if((loginInfo == 'true')) {

				var user_slug = this.storage.get('89JHuitr_T__user_slug');
				var firebase_id = this.storage.get('89JHuitr_T__firebase_id');
				var currently_suggested_token = this.storage.get('89JHuitr_T__suggested_token');
				var current_token = this.storage.get('89JHuitr_T__active_login_token');
				
				this.renewTokenLoop = setInterval(() => {
					this.renewToken();

					// clearInterval(this.renewTokenLoop);

					}, 40000);

			}

			resolve('done');

			});
	}

}
