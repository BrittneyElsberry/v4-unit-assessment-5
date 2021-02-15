require('dotenv').config();

const express = require('express'),
      userCtrl = require('./controllers/user'),
      postCtrl = require('./controllers/posts')
const app = express();
const massive = require('massive')
const session = require('express_session')

const PORT = 4000

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env

app.use(express.json());



massive({
connectionString: CONNECTION_STRING,
ssl:{
    rejectUnauthorized: false}})
.then(db => {
    app.set('db', db)
    console.log('db connected')
})

//Auth Endpoints
app.post('/api/auth/register', userCtrl.register);
app.post('/api/auth/login', userCtrl.login);
app.get('/api/auth/me', userCtrl.getUser);
app.post('/api/auth/logout', userCtrl.logout);

//Post Endpoints
app.get('/api/posts', postCtrl.readPosts);
app.post('/api/post', postCtrl.createPost);
app.get('/api/post/:id', postCtrl.readPost);
app.delete('/api/post/:id', postCtrl.deletePost)

app.listen(PORT, ()=> console.log(`running on ${PORT}`));