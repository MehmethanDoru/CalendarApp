import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isCreateTaskVisible: boolean = false;

  createTask(): void {
    console.log('click button')
    this.isCreateTaskVisible = !this.isCreateTaskVisible; 
  }
}
