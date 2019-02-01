"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
/** Important **/
/** You should not be committing this file to GitHub **/
/** Repeat: DO! NOT! COMMIT! THIS! FILE! TO! YOUR! REPO! **/

var secrets = {
	db: process.env.MONGODB_URI || "mongodb://localhost:27017/WordTrainerPlus",
	sessionSecret: "letthisbeyoursecret"
};

exports.default = secrets;