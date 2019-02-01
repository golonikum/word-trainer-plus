/** Important **/
/** You should not be committing this file to GitHub **/
/** Repeat: DO! NOT! COMMIT! THIS! FILE! TO! YOUR! REPO! **/

const secrets = {
	db: process.env.MONGODB_URI || "mongodb://localhost:27017/WordTrainerPlus",
	sessionSecret: "letthisbeyoursecret"
}

export default secrets