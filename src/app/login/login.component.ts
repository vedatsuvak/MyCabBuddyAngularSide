import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { UserRegistrationServiceService } from '../user-registration-service.service';
import { Router } from '@angular/router';
import { SessionService } from '../session-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  message: string;

  constructor(
    private userService: UserRegistrationServiceService,
    private router: Router,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    // Check if there is an active session, and redirect to dashboard if present
    if (this.sessionService.getSession()) {
      this.router.navigate(['/dashboard']);
    }
  }

  public dologin() {
    if (this.validateUsername() && this.validatePassword()) {
      let response = this.userService.login(this.user);
      response.subscribe(
        (data: any) => {
          this.message = data;

          if (this.message) {
            // Login successful
            this.sessionService.setSession(data);
            this.router.navigate(['/dashboard']);
          } else {
            // Login failed
            this.message = 'Login Failed, Please check the credentials!';
          }
        },
        (error: any) => {
          // Handle error if needed
          console.error('Login error:', error);
        }
      );
    } else {
      // Display an error message or take appropriate action for invalid input
      console.log('Invalid login input');
    }
  }

  validateUsername(): boolean {
    // Add your username validation logic here
    const usernamePattern = /^[a-zA-Z0-9]+$/;
    return usernamePattern.test(this.user.username);
  }

  validatePassword(): boolean {
    // Add your password validation logic here
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*.?&])[A-Za-z\d@$!%*.?&]{8,}$/;
    return passwordPattern.test(this.user.password);
  }
}
