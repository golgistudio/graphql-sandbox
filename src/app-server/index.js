const jsonServer = require('json-server')
const dotenv = require('dotenv').config();

const { isAuthorized }  = require('./authorization');

const server = jsonServer.create();
const router = jsonServer.router(process.env.DB_PATH);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  if (isAuthorized(req)) { 
    if (req.method === 'POST') {
      req.body.createdAt = Date.now();
    }
    // Continue to JSON Server router
    next()
  } else {
    // not authorized
    res.sendStatus(401)
  }
})
server.use(router)
const port = parseInt(process.env.PORT || '3000', 10);
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`)
})
