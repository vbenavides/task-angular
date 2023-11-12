import {
  Component,
  computed,
  effect,
  inject,
  Injector,
  signal,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tasks = signal<Task[]>([]);

  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  filter = signal<'all' | 'pending' | 'completed'>('all');
  tasksByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();

    switch (filter) {
      case 'all':
        return tasks;
      case 'pending':
        return tasks.filter((task) => !task.completed);
      case 'completed':
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  });

  injector = inject(Injector);

  ngOnInit(): void {
    const storage = localStorage.getItem('tasks');
    if (storage) {
      this.tasks.set(JSON.parse(storage));
    }
    this.trackTasks();
  }

  trackTasks(): void {
    effect(
      () => {
        const tasks = this.tasks();

        console.log(tasks);
        localStorage.setItem('tasks', JSON.stringify(tasks));
      },
      { injector: this.injector }
    );
  }

  changeHandler(): void {
    if (this.newTaskCtrl.invalid || this.newTaskCtrl.value.trim() === '') {
      return;
    }

    this.addTask(this.newTaskCtrl.value.trim());
    this.newTaskCtrl.setValue('');
  }

  addTask(title: string): void {
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };
    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  deleteTask(index: number): void {
    this.tasks.update((task) =>
      task.filter((_, position) => position !== index)
    );
  }

  updateTask(index: number): void {
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            completed: !task.completed,
          };
        }
        return task;
      });
    });
  }

  updateTaskEditing(index: number): void {
    if (this.tasks()[index].completed) return;

    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            editing: true,
          };
        }
        return {
          ...task,
          editing: false,
        };
      });
    });
  }

  updateTaskText(index: number, event: Event): void {
    const input = event.target as HTMLInputElement;

    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            title: input.value,
            editing: false,
          };
        }
        return task;
      });
    });
  }

  changeFilter(filter: 'all' | 'pending' | 'completed'): void {
    this.filter.set(filter);
  }
}
