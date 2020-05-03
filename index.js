const mongoose = require('mongoose');
const Dishes = require('./models/dishes');
const url = 'mongodb://localhost:27017/confusion';
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log('Successfully Connected to the Database .. !!');
    console.log('***********************************************');
    Dishes.create({
        name: 'xyz',
        description: 'Test'
    })
    .then((dish) => {
        console.log(dish);
        Dishes.findByIdAndUpdate(dish._id, { $set: {description: "Updated Test"} }.exec());
    })
    .then((dish) => {
        console.log(dish);
        dish.comments.push({
            rating: 5,
            comment: 'xyz',
            author: 'abc'
        })
        return dish.save();
    })
    .then((dishes) => {
        console.log(dishes);
        return Dishes.remove({});
    })
    .then(() => {
        return mongoose.connection.close();
    })
    .catch((err) => { console.log(err); })
})