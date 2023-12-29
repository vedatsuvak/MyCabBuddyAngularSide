import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../User';
import { UserRegistrationServiceService } from '../user-registration-service.service';
import { Router } from '@angular/router';
import { SessionService } from '../session-service.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  user: User = new User();
  conpassword: string;
  message: any;
  response:any;

  constructor(
    private fb: FormBuilder,
    private service: UserRegistrationServiceService,
    private router: Router,
    private sessionService: SessionService,
  ) {}

  ngOnInit(): void {
    // Check if there is an active session, and redirect to dashboard if present
    if (this.sessionService.getSession()) {
      this.router.navigate(['/dashboard']);
    }

    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9_-]{5,30}$')]],
      fullname: ['', [Validators.required, Validators.pattern('^[A-Za-z ]{5,30}$')]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      phone: [''],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*.?&])[A-Za-z\\d@$!%*.?&]{8,}$')]],
      conpassword: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*.?&])[A-Za-z\\d@$!%*.?&]{8,}$')]],
    });
  }

  public registerNow() {
    if (this.registrationForm.valid) {
      if (this.user.password === this.conpassword) {
        let response = this.service.doregistration(this.user);
        response.subscribe(
          (data: any) => {
            this.response = data;
            this.message = "Hey " + this.user.username + ", you are registered successfully!";
            //this.router.navigate(['/login']);
          },
          (error: any) => {
            this.message= "Something went wrong!";
          }
        );
      } else {
        this.message= "Password does not match, please try again!";
      }
    } else {
      console.log('Form is invalid. Please fill in the required fields.');
    }
  }
}
