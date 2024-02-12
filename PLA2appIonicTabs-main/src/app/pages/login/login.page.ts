import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonItem, IonInput, IonButton, IonHeader, IonToolbar, IonContent, IonTitle]
})
export class LoginPage implements OnInit {

  credentials!: FormGroup;

  constructor(private fb: FormBuilder, 
    private authService: AuthService,
		private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.credentials = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]]
		});
  }

  async register() {

		const user = await this.authService.register(this.credentials.value);

		console.log(user?.user.uid);
		

		if (user) {
			this.router.navigate(['/'], { replaceUrl: true });
		} else {
			console.log('Registration failed, Please try again!');
		}
	}

	async login() {

		const user = await this.authService.login(this.credentials.value);

		console.log(user?.user.uid);

		if (user) {
			this.router.navigate(['/'], { replaceUrl: true });
		} else {
			console.log('Login failed, Please try again!');
		}
	}

}
