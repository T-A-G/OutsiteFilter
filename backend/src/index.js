import express from 'express'
import {setupDatabase} from './databaseSetup'
import locationsRouter from './routers/locations'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config()


const startServer = async () => {

  const app = express()
  const port = process.env.PORT || 5000;

  await setupDatabase()

  app.use(cors())
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // locations
  app.use('/api/locations',locationsRouter);

  if (process.env.NODE_ENV === 'production') {

    // Serve any static files
    app.use(express.static(path.join(__dirname, 'frontend/build')));

    // reroute non API calls to React frontend
    app.get('*', function(req, res){
      res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
    });
  }

  app.listen(port, () =>{
    console.log(`🚀 server running on port ${port}!`);
  } );
}

try{
  startServer()
}catch(err){
  console.error(err)
}
