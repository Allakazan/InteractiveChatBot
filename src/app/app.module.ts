import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {EmojiPickerModule} from 'ng-emoji-picker';

import { AppComponent } from './app.component';
import { ChatBotComponent } from './chat-bot/chat-bot.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatBotComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    EmojiPickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
