import { Component } from '@angular/core';
import * as io from "socket.io-client";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app works!';
    private url = 'http://localhost:3000';
    private socket;

    ngOnInit(): void {
        this.socket = io.connect(this.url);
        this.socket.emit('joinRoom', 'user1');
        this.socket.emit('toBackEnd', 'user1');

        this.socket.on('toFrontEnd', (data) => {
            console.log('message: '+JSON.stringify(data));
        });
    }
}
