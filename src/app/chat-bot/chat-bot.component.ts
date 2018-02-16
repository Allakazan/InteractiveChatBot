import { Component, OnInit } from '@angular/core';
import * as io from "socket.io-client";

import { Message } from '../models/Message';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.css']
})
export class ChatBotComponent implements OnInit {

    userInput: string = '';
    messages: Message[] = [];

    private url = 'http://localhost:3000';
    private socket;

    constructor() { }

    ngOnInit(): void {
        this.socket = io.connect(this.url);
        this.socket.emit('joinRoom', {'roomId':'user1'});

        this.socket.on('newMessage', (message) => {
            this.messages.push(message);
        });
    }

    sendMessage() {
        this.socket.emit('sendUserMessage', {'roomId':'user1', 'message':this.userInput});
        this.userInput = '';
    }
}
