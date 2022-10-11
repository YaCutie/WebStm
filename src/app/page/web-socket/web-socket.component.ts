import { Component } from '@angular/core';
import * as Stomp from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-websocket',
  templateUrl: './web-socket.component.html',
  styleUrls: ['./web-socket.component.css']
})
export class WebSocketComponent {
  title = 'РкИС';
  description = 'WebSocket';

  greetings: string[] = [];
  disabled = true;
  name: any;
  private stompClient = null;

  constructor() { }

  setConnected(connected: boolean) {
    this.disabled = !connected;

    if (connected) {
      this.greetings = [];
    }
  }

  connect() {
    const socket = new SockJS('http://localhost:8080/test-endpoint');
    // @ts-ignore
    this.stompClient = Stomp.Stomp.over(socket);

    const _this = this;
    // @ts-ignore
    this.stompClient.connect({}, function (frame: any) {
      _this.setConnected(true);
      console.log('Connected: ' + frame);

      // @ts-ignore
      _this.stompClient.subscribe('/topic/id', function (hello: any) {
        let client =  hello.body
        _this.showGreeting(client);
        console.log(client)
      });
    });
  }

  disconnect() {
    if (this.stompClient != null) {
      // @ts-ignore
      this.stompClient.disconnect();
    }

    this.setConnected(false);
    console.log('Disconnected!');
  }

  sendName() {
    // @ts-ignore
    this.stompClient.send(
      '/gkz/test',
      {},
      JSON.stringify({ 'id': this.name })
    );
  }

  showGreeting(message: any) {
    this.greetings.push(message).toString();
  }
}
