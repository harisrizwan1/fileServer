const net = require('net');
const fs = require('fs');
const server = net.createServer();


server.on('connection', (client) => {
  client.setEncoding('utf8');
  
  console.log('New client connected!');

  client.on('data', (data) => {
    getShit(data, client);
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000!');
});

const getShit = function(fileName, client) {
  console.log(fileName);
  const path = './serverFiles/' + fileName;
  fs.readFile(path, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    client.write(data);
  });
};