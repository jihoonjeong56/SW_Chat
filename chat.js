// 중요! 소스코드의 경로에 한글이 있으면 안 됨
// npm init -y
// npm install ws

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

// 랜덤한 색상 선택 함수
function getRandomColor() {
  const colors = ['#FF5733', '#33FF57', '#5733FF', '#FF33E9', '#33C5FF', '#33FFB5'];
  return colors[Math.floor(Math.random() * colors.length)];
}

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);

    // 랜덤한 색상 생성
    const color = getRandomColor();

    // 받은 메시지와 색상을 모든 클라이언트에게 보냄
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ message: `<span style="color:${color}">${message}</span>`}));
      }
    });
  });
  ws.send('Welcome to the chat server!');
});

console.log('Chat server is running on ws://localhost:8080');
