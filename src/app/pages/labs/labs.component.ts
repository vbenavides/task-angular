import {
  Component,
  Signal,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css',
})
export class LabsComponent {
  welcome = 'Welcome to the Todo App';
  tasks = signal([
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
  ]);
  name = signal('Vicente');
  edad = 20;
  img = 'https://picsum.photos/200/300';

  person = {
    name: 'Vicente',
    age: 20,
    img: 'https://w3schools.com/howto/img_avatar.png',
  };

  clickHandler() {
    console.log('Button clicked');
  }

  changeHandler(event: any) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.name.set(newValue);
  }

  onEnter(event: any) {
    console.log('enter pressed');
  }
}
