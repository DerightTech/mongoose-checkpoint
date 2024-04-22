const mongoose = require('mongoose');

// Define the schema for the "Person" model
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Makes the "name" field required
    },
    age: {
        type: Number,
        min: 0, // Sets a minimum age value
    },
    favoriteFoods: {
        type: [String], // An array of strings
        default: [], // Default value is an empty array
    },
});

// Create the "Person" model using the schema
const Person = mongoose.model('Person', personSchema);

// Export the model for use in other parts of your application
module.exports = Person;