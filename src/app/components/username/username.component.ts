import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.scss']
})
export class UsernameComponent {
  public username = '';
  @Output()
  public usernameEvent = new EventEmitter<string>();

  constructor() { }

  public setUsername(): void {
    this.usernameEvent.emit(this.username);
  }

}
