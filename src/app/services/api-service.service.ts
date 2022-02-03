import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) 
  { 
  }

  getControlCenterInfo()
  {
    return this.http.get(this.apiUrl + 'ControlCenter');
  }

  sendShutdown()
  {
    return this.http.post(this.apiUrl + 'ControlCenter/Shutdown', null);
  }
}
