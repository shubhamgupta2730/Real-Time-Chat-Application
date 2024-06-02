var socket = io();

let btn = document.getElementById('btn');
btn.onclick = function exec(){
  socket.emit('from_client');
}
console.log('collected a new event from server');
socket.on('from_server', ()=>{
  const div = document.createElement('div');
  div.innerText = 'New event from server';
  document.body.appendChild(div);
})