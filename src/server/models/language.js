import mongoose from 'mongoose';

const LanguageSchema = new mongoose.Schema({
	name: String,
});

/*
 Defining our own custom document instance method
 */
LanguageSchema.methods = {}

/**
* Statics
*/
LanguageSchema.statics = {}

export default mongoose.model('Language', LanguageSchema)

