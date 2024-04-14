import type { AuthMessage } from '../interfaces';
import { eventBus } from '../utils/eventBus';

export class WebSocketAPI {
  public ws: WebSocket;
  public errorMessage = '';

  constructor() {
    this.ws = new WebSocket('ws://127.0.0.1:4000');
    this.ws.addEventListener('message', this.handleMessage.bind(this));
  }

  public userAuthentication(message: AuthMessage): void {
    console.log(message);
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
      console.log(`message was send`);
    } else {
      this.ws.addEventListener('open', () => {
        this.ws.send(JSON.stringify(message));
      });
    }
  }

  private handleMessage(event: MessageEvent): void {
    const responseData = JSON.parse(event.data);
    console.log(`response: `, responseData);
    if (responseData.type === 'ERROR') {
      this.errorMessage = responseData.payload.error;
      eventBus.emit('authError', responseData.payload.error);
    }
  }
}