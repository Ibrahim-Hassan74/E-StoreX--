import { Component, HostBinding, signal } from '@angular/core';
import { NavBarComponent } from './core/nav-bar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [NavBarComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
