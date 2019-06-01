import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Global Startup Weekend Sustainable Revolution';
  burger: boolean = false;

  toggleBurger() {
    this.burger = !this.burger;
  }
}
