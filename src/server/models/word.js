import mongoose from 'mongoose';

const WordSchema = new mongoose.Schema({
    signature: String,
    translation: String,
    transcript: String,
    created: Date,
    success: Number,
    fail: Number,
    speechPartId: mongoose.Types.ObjectId,
    sourceId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
    languageId: mongoose.Types.ObjectId,
});

/*
 Defining our own custom document instance method
 */
WordSchema.methods = {}

/**
* Statics
*/
WordSchema.statics = {}

export default mongoose.model('Word', WordSchema)
