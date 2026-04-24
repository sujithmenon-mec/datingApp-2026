import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { ToastService } from '../../core/services/toast-service';
import { themes } from '../theme';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav implements OnInit {

  ngOnInit(): void {
    const theme = localStorage.getItem('theme') || 'light';
    this.selectedTheme.set(theme);
    document.documentElement.setAttribute('data-theme', theme);
  }
  protected creds: any = {}
  protected accountService = inject(AccountService);
  private router = inject(Router);
  private toast = inject(ToastService);
  protected selectedTheme = signal<string>(localStorage.getItem('theme') || 'light');
  protected themes = themes;

  handleSelectTheme(theme: string) {
    this.selectedTheme.set(theme);
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    const element = document.activeElement as HTMLDivElement;
    if(element) {
      element.blur();
    }
  }
  login() {
    this.accountService.login(this.creds).subscribe({
      next: response => {
        this.router.navigateByUrl('/members');
        this.toast.success('Logged in successfully!');
        console.log(response);
        this.creds = {};
      },
      error: error => {this.toast.error(error.error);
        console.log(error)}
    })
  }
  logOut() {
    this.router.navigateByUrl('/');
    this.accountService.logout();
  }


}
