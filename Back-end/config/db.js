const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect(process.env.DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
  console.log(`MongoDB is connected`);
};

module.exports = connectDB;



