import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Board} from '../../models/board';
import {Column} from '../../models/column';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {
  board: Board = new Board('Test Board', [
    new Column('Ideas', ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep']),
    new Column('Research', []),
    new Column('Todo', ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog']),
    new Column('Done', [])
  ])

  constructor() { }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
