import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { IUser } from '../interfaces/IUser';

@Component({
  selector: 'app-create-user',
  imports: [ReactiveFormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
})
export class CreateUserComponent {
  
  @Output() createUser: EventEmitter<IUser> = new EventEmitter<IUser>();
  
  userForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100)
    ]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(100)
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(25)
    ]),
    website: new FormControl('', Validators.maxLength(100)),
    
    address: new FormGroup({
      city: new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
      street: new FormControl('', [
        Validators.required,
        Validators.maxLength(100)
      ]),
      suite: new FormControl('', Validators.maxLength(50)),
      zipcode: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10)
      ]),
      
      geo: new FormGroup({
        lat: new FormControl('', Validators.required),
        lng: new FormControl('', Validators.required)
      })
    }),
    
    company: new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      catchPhrase: new FormControl('', Validators.maxLength(200)),
      bs: new FormControl('', Validators.maxLength(100))
    })
  });
  
  onSubmit(): void {
    if (this.userForm.valid) {
      const user: IUser = { ...this.userForm.getRawValue() as IUser, id: Date.now() };
      this.createUser.emit(user);
      this.userForm.reset();
    } else {
      this.userForm.markAsTouched();
    }
  }
}
