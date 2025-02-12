import { ExperimentDTO } from "./experiments/dto";

export interface WebsocketResponseDTO {
  type: string;
  data: ExperimentDTO[];
}

class WebSocketService {
  private ws: WebSocket | null = null;
  private readonly url = 'ws://localhost:3000';

  connect() {
    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      console.log('Connected to WebSocket');
    };

    this.ws.onmessage = (event) => {
      const data: WebsocketResponseDTO = JSON.parse(event.data);
      console.log(data);
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    this.ws.onclose = () => {
      console.log('Disconnected from WebSocket');
    };
  }

  send(message: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
    }
  }
}

export const wsService = new WebSocketService(); 