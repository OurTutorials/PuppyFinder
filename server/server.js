import express from 'express';
import bodyParser from 'body-parser';
import url from 'url';
import path from 'path';
import request from 'request';
import TourSiteController from './controller/TourSite';

const app = express();
app.set('port', process.env.PORT || 8888);

/* Initialize DB */
TourSiteController.init();

// Static files load
app.use(express.static(__dirname + '/../client'));

/* Handle request.body, request.params */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

/*
 * Routing Setup
 * Serves static files
 */

app.get('/data', TourSiteController.send);

app.listen(app.get('port'), function() {
  console.log("Express started on http://localhost:" +
    app.get('port') + '; press Ctrl-C to terminate.');
});
