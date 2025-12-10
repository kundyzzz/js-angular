import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  fb = inject(FormBuilder);
  auth = inject(AuthService);
  router = inject(Router);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirm: ['', Validators.required]
  }, { validators: this.passwordsMatch });

  loading = false;
  error: string | null = null;

  ngOnInit() {
    this.form.reset();
  }
  
  passwordsMatch(g: any) {
    return g.get('password')?.value === g.get('confirm')?.value ? null : { mismatch: true };
  }

  async onSubmit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true; this.error = null;

    const { email, password } = this.form.value;
    const res = await this.auth.signup(email!, password!);
    this.loading = false;

    if (res.success) {
      this.router.navigate(['/profile']);
    } else {
      this.error = res.message;
    }
  }
}

