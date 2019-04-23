import mongoose from 'mongoose';

const SpeechPartSchema = new mongoose.Schema({
	name: String,
    code: String,
    verbose: String
});

/*
 Defining our own custom document instance method
 */
SpeechPartSchema.methods = {}

/**
* Statics
*/
SpeechPartSchema.statics = {}

export default mongoose.model('SpeechPart', SpeechPartSchema)

