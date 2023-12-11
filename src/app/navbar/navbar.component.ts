import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Output() toggleSidenav = new EventEmitter<void>();

  toggleSidenavClick() {
    this.toggleSidenav.emit();
  }

  protected readonly menubar = menubar;
}
