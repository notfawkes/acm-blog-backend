const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); 
app.use(express.json()); 

const blogRoutes = require('./routes/blogRoutes');

app.use('/blogs', blogRoutes); 

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        
        console.log(' MongoDB Connected Successfully!');
        
        app.listen(PORT, () => {
            console.log(` Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
      
        console.error(' MongoDB Connection Error:', err.message);
    });
