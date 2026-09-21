const WebSocket = require('ws');

const PORT = 8080;

const wss = new WebSocket.Server({
  host: '0.0.0.0',
  port: PORT,
});

wss.on('listening', () => {
  console.log(`WebSocket server running on ws://0.0.0.0:${PORT}`);
});

wss.on('connection', (ws, request) => {
  console.log('Client connected:', request.socket.remoteAddress);

  ws.send(
    JSON.stringify({
      type: 'connected',
      message: 'WebSocket connected successfully',
    }),
  );

  ws.on('message', (message) => {
    console.log('Received:', message.toString());

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});
