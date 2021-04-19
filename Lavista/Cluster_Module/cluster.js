const http = require('http');
const express = require('express');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length
const app = express();

app.get('/',(req,res)=> {
    for(let i=0;i<1e8;i++){

    }
    res.send(`Ok...${process.pid}`);
    cluster.worker.kill();
});


if(cluster.isMaster){
  console.log("this is the master process:", process.pid);
  for(let i=0; i<numCPUs; i++){
    cluster.fork()
  }
  cluster.on('exit',(worker,code,signal)=> {
      console.log(`worker ${worker.process.pid} died`);
      cluster.fork();
  });
}else{
 app.listen(3000,() =>
 console.log(`server ${process.pid} @http://localhost:3000`));
}