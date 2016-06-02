import mongoose from 'mongoose';
import fs from 'fs';
import parse from 'csv-parse/lib/sync';
import path from 'path';
import {TourSite} from '../db/Toursite';
const db = 'mongodb://localhost/Tour';

module.exports = {
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

		connect();
		mongoose.connection.on('disconnected', connect);

		TourSite.remove({}, function(err) {
			if (err) {
				console.log(`Error removing db because of ${err}`);
			} else {
				console.log('All TourSites removed');
			}
		});

		const tourSitesCSV = path.join(__dirname, 'TourSite.csv');
		const seasonPhotosDir = path.join(__dirname, '../..', 'client', 'assets', 'season');
		const foodPhotosDir = path.join(__dirname, '../..', 'client', 'assets', 'food');
		const activityPhotosDir = path.join(__dirname, '../..', 'client', 'assets', 'activity');

		const tourSites = parse(fs.readFileSync(tourSitesCSV, 'utf8'),{columns:true});

		const seasonPhotos = fs.readdirSync(seasonPhotosDir, 'utf8').filter((item) => {
			return item.indexOf('@') !== -1;
		});
		const foodPhotos = fs.readdirSync(foodPhotosDir, 'utf8').filter((item) => {
			return item.indexOf('_') !== -1;
		});
		const activityPhotos = fs.readdirSync(activityPhotosDir, 'utf8').filter((item) => {
			return item.indexOf('@') !== -1;
		});

		// console.log('seasonPhotos: ',seasonPhotos);
		// console.log('foodPhotos: ',foodPhotos);
		// console.log('activityPhotos: ',activityPhotos);

		for (let info of tourSites) {
			const tourSite = new TourSite();
			tourSite.name = info.name;
			tourSite.flightFee = info.flightFee;
			tourSite.dailyFee = info.dailyFee;
			tourSite.description = info.description;


			for (let fileName of seasonPhotos) {
				let tourSiteName = fileName.split('@')[1];
				let months = fileName.split('@')[0].split(',');

				if(tourSiteName.indexOf(info.name) !== -1) {
					for (let month of months) {
						tourSite.seasonPhotos.push({
							month: month,
							img: `assets/season/${fileName}`
						});
					}
				}
			}
			for(let fileName of foodPhotos) {
				let tourSiteName = fileName.split('_')[0];

				if(tourSiteName.indexOf(info.name) !== -1) {
					tourSite.foodPhotos.push(`assets/food/${fileName}`);
				}
			}
			for(let fileName of activityPhotos) {
				let tourSiteName = fileName.split('@')[1];
				let activities = fileName.split('@')[0].split(',');

				if(tourSiteName.indexOf(info.name) !== -1) {
					for(let activity of activities) {
						tourSite.activity.push(activity);
					}
				}
			}
			tourSite.save()
			.then(() => {
				console.log(`Saved TourSite ${tourSite.name}`);
			});
		}
	}
}

module.exports.init();