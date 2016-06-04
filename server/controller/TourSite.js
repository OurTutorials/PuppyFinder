import mongoose from 'mongoose';
import fs from 'fs';
import parse from 'csv-parse/lib/sync';
import path from 'path';
import TourSite from '../db/Toursite';
const db = 'mongodb://localhost/Tour';

export default {
  init: () => {
    const connect = () => {
      mongoose.connect(db, (err) => {
        if (err) {
          console.log(`Error connecting to ${db}\nErr:${err}`);
        } else {
          console.log(`Succeeded in connecting to ${db}`);
        }
      });
    };

    // connect again when disconnected
    connect();
    mongoose.connection.on('disconnected', connect);

    // clean db when init
    TourSite.remove({}, function(err) {
      if (err) {
        console.log(`Error removing db because of ${err}`);
      } else {
        console.log('All TourSites removed');
      }
    });

    // source of information on toursites
    const tourSitesCSV = path.join(__dirname, '../config', 'TourSite.csv');
    const seasonPhotosDir = path.join(__dirname, '../..', 'client', 'assets', 'season');
    const foodPhotosDir = path.join(__dirname, '../..', 'client', 'assets', 'food');

    // csv parse option {colums} 해주면 필드 항목 인식 (name, fee 등)
    const tourSites = parse(fs.readFileSync(tourSitesCSV, 'utf8'), { columns: true });
    const seasonPhotos = fs.readdirSync(seasonPhotosDir, 'utf8').filter((item) => {
      return item.indexOf('@') !== -1;
    });
    const foodPhotos = fs.readdirSync(foodPhotosDir, 'utf8').filter((item) => {
      return item.indexOf('_') !== -1;
    });

    // assign info to model & save
    for (let info of tourSites) {
      const tourSite = new TourSite();
      tourSite.name = info.name;
      tourSite.flightFee = info.flightFee;
      tourSite.dailyFee = info.dailyFee;
      tourSite.description = info.description;
      tourSite.activity = info.activity.split(',');
      tourSite.score = 0;

      for (let fileName of seasonPhotos) {
        let tourSiteName = fileName.split('@')[1];
        let months = fileName.split('@')[0].split(',');

        if (tourSiteName.indexOf(info.name) !== -1) {
          for (let month of months) {
            tourSite.seasonPhotos.push({
              month: month,
              img: `assets/season/${fileName}`
            });
          }
        }
      }
      for (let fileName of foodPhotos) {
        let tourSiteName = fileName.split('_')[0];

        if (tourSiteName.indexOf(info.name) !== -1) {
          tourSite.foodPhotos.push(`assets/food/${fileName}`);
        }
      }
      tourSite.save()
        .then(() => {
          console.log(`Saved TourSite ${tourSite.name}`);
        });
    }
  },
  send: (req, res) => {
    // send all collections
    TourSite.find()
      .exec(function(err, toursite) {
        if (err) {
          res.send(`Err '/' get request: `, err);
        } else {
          res.send(toursite);
        }
      });
  }
}
