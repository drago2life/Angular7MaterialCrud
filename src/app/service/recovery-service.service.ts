import { Injectable } from '@angular/core';

import { Recovery } from '../model/recovery.model';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecoveryServiceService {

      // private url = 'https://apialex.azurewebsites.net';
      private url = 'http://localhost:5000/api/RecoveryCommercial/';

      constructor(private http: HttpClient) { }

      getRecoverys() {
          const getUrl = this.url;
          return this.http.get(getUrl);
      }

      createRecovery(user: Recovery) {
          const saveUrl = this.url;
          return this.http.post(saveUrl, user);
      }
      updateRecovery(id: number, user: Recovery) {
          const urlParams = new HttpParams().set('id', id.toString());
          return this.http.put(this.url + id, user);
      }



      deleteRecovery(id: number) {
          const urlParams = new HttpParams().set('id', id.toString());
          return this.http.delete(this.url + id);
      }
}
