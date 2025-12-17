

const mongoose = require('mongoose');


const DetailInfoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    paragraph: { type: String, required: true },
});

const BlogSchema = new mongoose.Schema({
    
    title: { type: String, required: true, trim: true },
    authorName: { type: String, required: true },
    authorRole: { type: String },
    image: { url: { type: String, required: true } }, 
    slug: { type: String, required: true, unique: true }, 
    
    
    smallDescription: { type: String, required: true }, 
    largeImage: { url: { type: String, required: true } }, 
    detailInfo: [DetailInfoSchema], 
    datePublished: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Blog', BlogSchema);