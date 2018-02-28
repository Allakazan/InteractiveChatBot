import { Component, OnInit } from '@angular/core';
import * as io from "socket.io-client";

import { Message } from '../models/Message';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.css'],
  host: {
      '(document:click)': 'onDocumentClick($event)',
  },
})
export class ChatBotComponent implements OnInit {

    userInput: string = '';
    messages: Message[] = [];
    emojiPopupAction : Function;

    private url = 'http://localhost:3000';
    public socket;

    constructor() { }

    ngOnInit(): void {
        this.socket = io.connect(this.url);
        this.socket.emit('joinRoom', {'roomId':'user1'});

        this.socket.on('newMessage', (message) => {
            this.messages.push(message);
        });
    }

    onDocumentClick(ev) {
        if(document.getElementsByClassName("emoji-search")[0].getAttribute("hidden") === null) {
            if (ev.target.getAttribute("class") != 'emoji-search-button') {
                this.emojiPopupAction(false);
            }
        }
    }

    setPopupAction(fn) {
        this.emojiPopupAction = fn;
    }

    sendMessage() {
        this.socket.emit('sendUserMessage', {'roomId':'user1', 'message':this.userInput});
        this.userInput = '';
    }
}
