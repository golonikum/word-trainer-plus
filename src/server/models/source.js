import mongoose from 'mongoose';

const SourceSchema = new mongoose.Schema({
    name: String,
    userId: mongoose.Types.ObjectId,
    languageId: mongoose.Types.ObjectId,
});

/*
 Defining our own custom document instance method
 */
SourceSchema.methods = {}

/**
* Statics
*/
SourceSchema.statics = {}

export default mongoose.model('Source', SourceSchema)
