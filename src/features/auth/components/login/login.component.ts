import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthorizationService } from '../../services/authorization.service';
import { catchError, EMPTY, tap } from 'rxjs';
import { MessageService } from '../../../../app/services/message.service';
import { Router } from '@angular/router';
import { ILogin } from '../../interfaces/ILogin';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  
  private router: Router = inject(Router);
  private fb: FormBuilder = inject(FormBuilder);
  authService: AuthorizationService = inject(AuthorizationService);
  messageService: MessageService = inject(MessageService);
  
  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(12)]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });
  
  login(): void {
    if (this.loginForm.invalid) {
      return;
    }
    
    const loginData: ILogin = this.loginForm.getRawValue();
    
    this.authService.login(loginData).pipe(
      tap(() => {
        this.messageService.showSuccess('Успешно');
        this.router.navigate(['/']);
      }),
      catchError(() => {
        this.messageService.showError('Произошла ошибка');
        return EMPTY;
      })
    ).subscribe();
  }
  
}
