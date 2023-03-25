import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  public formLogin: FormGroup = new FormGroup({});
  public errorSession: boolean = false;

  constructor(private _authService: AuthService, private readonly _cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
    this.formLogin = new FormGroup(
      {
        email: new FormControl('', [
          Validators.required,
          Validators.email
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12)
        ])
      }
    )
  }

  sendLogin(): void {
    const { email, password } = this.formLogin.value;
    this._authService.sendCredentials(email, password).subscribe({
      next:(response)=>{
        this.errorSession = false;
        this._cookieService.set('tokenSession', response.tokenSession, 5, '/');
        this.router.navigate(['/tracks']);
      },
      error: (error)=>{
        this.errorSession = true;
      }
    })
  }
}
