const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient
const url = "mongodb+srv://Patrick:test@cluster0-vh07q.mongodb.net/test?retryWrites=true&w=majority"; //mongo atlas url
const dbName = "PersonalExpress"
var db;
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.json())

app.listen(9000, () => {
  MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
      if(error) {
          throw error;
      }
      db = client.db(dbName);
      console.log("Connected to `" + dbName + "`!");
  })
})

app.get('/', (req, res) => {
  db.collection('post-snippets').find().toArray(function(err, result) {
  // console.log(results)
  res.sendFile(__dirname + '/index.html')
  //renders index.ejs
  res.render('index.ejs', {quotes: result})
  })
})



app.put('/quotes', (req, res) => {
  db.collection('post-snippets')
  .findOneAndUpdate({name: req.body.name, quotes: req.body.quotes}, {
    $set: {
      upvote: true
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.redirect("/quotes")
  })
})


app.post('/quotes', (req, res) => {
  // console.log(req.body)
  db.collection('post-snippets').insertOne(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.delete('/quotes', (req, res) => {
  db.collection('post-snippets').findOneAndDelete({name: req.body.name},
  (err, result) => {
    if (err) return res.send(500, err)
    res.send({message: 'A darth vadar quote got deleted'})
  })
})








/* const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
//These things are basically plugins that change the request or response object before
//they get handled by our application.
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
var db, collection;
const dbName = "PersonalExpress";

const url = "mongodb+srv://Patrick:cathullu1369@cluster0-vh07q.mongodb.net/test?retryWrites=true&w=majority";{

},

app.listen(4000, () => {
    MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }//name of database
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});



//app.listen(7000, function() {
  //console.log('listening on 7000')
//})

//The reason we see the “cannot get /” error is because we have yet to send anything back to the browser from our server.
//In Express, we handle a GET request with the get method
     //path = path of the get request
     // callback function = function( a request object and a response object:)

app.get('/', (req, res) => {
  //sends an html file from the server
  var cursor = db.collection('post-snippets').find()
  cursor.toArray(function(err, results) {
  //res.sendFile(__dirname + '/index.html')

  // console.log(results)
    // send HTML file populated with quotes here
  })
})

app.post('/quotes', (req, res) => {
  db.collection('post-snippets').insertOne(req.body, (err, result) => {
   if (err) return console.log(err)
   // renders index.ejs
   res.render('index.ejs', {quotes: result})
   res.redirect('/')
 })
}) */
