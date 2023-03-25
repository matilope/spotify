import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly URL = environment.api;

  constructor(private _http: HttpClient, /* private readonly _cookieService: CookieService */) { }

  sendCredentials(email: string, password: string): Observable<any> {
    // como es llave valor igual con decir solo { email, password } esta ok
    return this._http.post<any>(this.URL + "/auth/login", { email, password }).pipe(
      tap(response=>{
        // this._cookieService.set('token_service', response.tokenSession, 5, '/');
      })
    )
  }
}
