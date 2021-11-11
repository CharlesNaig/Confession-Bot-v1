const express = require('express');
const server = express();
 
server.all('/', (req, res) => {
  res.send(`Tagpuan Confession`)
})
 
function keepAlive() {
  server.listen(5050, () => { console.log("Starting Server\nServer Running\nChecking Server\nServer Started\nStatus: ✅") });
}
 
module.exports = keepAlive;