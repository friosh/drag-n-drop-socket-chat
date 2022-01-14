import {Component, OnDestroy, OnInit} from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnDestroy{
  username = '';
  message = '';
  messageList: {message: string, userName: string; mine: boolean}[] = [];
  userList: string[] = [];
  socket: any;


  ngOnDestroy(): void {
    this.socket.emit('disconnected', '');
  }

  usernameUpdate(username: string): void {
    this.socket = io.io(`localhost:3000?userName=${username}`);
    this.username = username;

    this.socket.emit('set-user-name', username);

    this.socket.on('user-list', (userlist: string[]) => {
      this.userList = userlist;
    })

    this.socket.on('message-broadcast', (data: {message: string; userName: string}) => {
      if (data) {
        this.messageList.push({message: data.message, userName: data.userName, mine: false})
      }
    })
  }

  sendMessage(): void {
    this.socket.emit('message', this.message)
    this.messageList.push({message: this.message, userName: this.username, mine: true});
    this.message = '';
  }
}
