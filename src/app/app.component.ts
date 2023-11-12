import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'todoapp';
  welcome = 'Welcome to the Todo App';
  tasks = [
    {
      name: 'Task 1',
      description: 'This is the first task',
      completed: false,
    },
    {
      name: 'Task 2',
      description: 'This is the second task',
      completed: false,
    },
    {
      name: 'Task 3',
      description: 'This is the third task',
      completed: false,
    },
    {
      name: 'Task 4',
      description: 'This is the fourth task',
      completed: false,
    },
  ];
}
