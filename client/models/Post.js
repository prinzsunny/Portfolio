import mongoose from 'mongoose';

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
 
const BlogPost = new Schema({
 author: ObjectId,
 title: String,
 body: String,
 createdon: Date,
 deletedon: Date
});