import { Component, inject, OnInit } from '@angular/core';
import { NavBarComponent } from './core/nav-bar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { UUID } from 'crypto';

@Component({
  selector: 'app-root',
  imports: [NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  httpClient = inject(HttpClient);
  categories: { id: UUID; name: string }[] = [];

  baseUrl = `${environment.baseURL}`;
  getCategories() {
    return this.httpClient.get(`${this.baseUrl}/categories`).subscribe({
      next: (data) => {
        console.log(this.baseUrl);
        this.categories = data as { id: UUID; name: string }[];
        console.log(data);
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
      complete: () => {
        console.log('Request completed');
      },
    });
  }
  ngOnInit(): void {
    this.getCategories();
  }
}
