import mongoose from 'mongoose';

const TagSchema = new mongoose.Schema({
    name: String,
    userId: mongoose.Types.ObjectId,
    languageId: mongoose.Types.ObjectId,
});

/*
 Defining our own custom document instance method
 */
TagSchema.methods = {}

/**
* Statics
*/
TagSchema.statics = {}

export default mongoose.model('Tag', TagSchema)
