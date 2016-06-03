import express from 'express';
import bodyParser from 'body-parser';
import url from 'url';
import path from 'path';
import request from 'request';
import {
  init
}
from './controller/TourSite';
import TourSite from './db/TourSite'

const app = express();
app.set('port', process.env.PORT || 8888);

/* Initialize DB */
init();

// Static files load
app.use(express.static(__dirname + '/../client'));
app.use(express.static(__dirname + '/admin'));

/* Handle request.body, request.params */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

/*
 * Routing Setup
 * Serves static files
 */
app.get('/admin', function(req, res) {
  res.sendFile(__dirname + '/admin/admin.html');
});

app.get('/upload', function(req, res) {
  res.sendFile(__dirname + '/admin/upload.html');
});

app.get('/update', function(req, res) {
  res.sendFile(__dirname + '/admin/update.html');
});

app.get('/remove', function(req, res) {
  res.sendFile(__dirname + '/admin/remove.html');
});

app.get('/stat', function(req, res) {
  res.sendFile(__dirname + '/admin/stat.html');
});

app.get('/', function(req, res) {
  TourSite.find()
  .exec(function(err, toursite) {
    if(err) {
      res.send('Err "/" get request: ',err);
    } else {
      res.send(toursite);
    }
  });
});

app.listen(app.get('port'), function() {
  console.log("Express started on http://localhost:" +
    app.get('port') + '; press Ctrl-C to terminate.');
});