    let database = require('./database')
    const Person = require('./models/person'); 

    database._connect();
    const newPerson = new Person({
        name: 'Bisiriyu Olugbenga',
        age: 29,
        favoriteFoods: ['Plantain', 'Beans'],
    });

    // Saving the new person to the database using async/await
    async function savePerson() {
        try {
            const savedPerson = await newPerson.save();
            console.log('New person saved:', savedPerson);
        } catch (err) {
            console.error('Error:', err);
        }
    }
    savePerson();



    // An array of objects representing multiple persons
    const arrayOfPeople = [
    {
        name: 'Sola',
        age: 27,
        favoriteFoods: ['snacks', 'Pasta'],
    },
    {
        name: 'Tolu',
        age: 18,
        favoriteFoods: ['ofada', 'sharwama'],
    },
    {
        name: 'Bimpe',
        age: 42,
        favoriteFoods: ['rice', 'Burrito'],
    },
    {
        name: 'Mary',
        age: 61,
        favoriteFoods: ['noodles', 'rice'],
    },
    {
        name: 'Soji',
        age: 22,
        favoriteFoods: ['poundo', 'Burrito'],
    },
    ];

    // Using Model.create() to insert multiple records with async/await
    async function createPeople() {
    try {
        const createdPeople = await Person.create(arrayOfPeople);
        console.log('People created:', createdPeople);
    } catch (err) {
        console.error('Error:', err);
    }
    }
    createPeople();


    const searchCriteria = {
    name: '', // Replace with the name you want to search for
    };


    // Using Model.find() with .exec() to return a promise
    const query = Person.find(searchCriteria);

    query.exec()
    .then(foundPeople => {
        console.log('People found:', foundPeople);
    })
    .catch(err => {
        console.error('Error:', err);
    });

    const search = {
        name: 'Sola', // Replace with the name you want to search for
    };
    
    // Use Model.findOne() with .exec() to return a promise
    const queryy = Person.findOne(search);
    
    queryy.exec()
        .then(foundPerson => {
        if (foundPerson) {
            console.log('Person found:', foundPerson);
        } else {
            console.log('Person not found.');
        }
        })
        .catch(err => {
        console.error('Error:', err);
        });




    // Function to find a person by _id
    async function findPersonById(personId) {
    try {
        const person = await Person.findById(personId).exec();
        if (!person) {
        console.log('No person found with the specified _id.');
        } else {
        console.log('Person found by _id:', person);
        }
    } catch (err) {
        console.error('Error:', err);
    }
    }

    // Usage example...
    const personIdToFind = '64faf4341789532921d14887';
    findPersonById(personIdToFind);




    // Function to update a person's favoriteFoods by _id
    async function updateFavoriteFoodsById(personId) {
    try {
        // Find the person by _id
        const person = await Person.findById(personId).exec();

        if (!person) {
        console.log('No person found with the specified _id.');
        } else {
        // Add "hamburger" to the favoriteFoods array
        person.favoriteFoods.push('hamburger');

        // Save the updated Person
        await person.save();

        console.log('Person updated with "hamburger" added to favoriteFoods:', person);
        }
    } catch (err) {
        console.error('Error:', err);
    }
    }

    // Usage example....
    const personIdToUpdate = '64faf4341789532921d14996';
    updateFavoriteFoodsById(personIdToUpdate);



    // Function to update a person's age by name
    async function updateAgeByName(personName) {
    try {
        // Find the person by name and update their age to 20
        const updatedPerson = await Person.findOneAndUpdate(
        { name: personName },
        { age: 20 },
        { new: true } // Return the updated document
        ).exec();

        if (!updatedPerson) {
        console.log(`No person found with the name "${personName}".`);
        } else {
        console.log("Updated Person's age:", updatedPerson);
        }
    } catch (err) {
        console.error('Error:', err);
    }
    }

    // Usage example...
    const personNameToUpdate = 'tolu';
    updateAgeByName(personNameToUpdate);



    // Function to delete a person by _id
    async function deletePersonById(personId) {
    try {
        // Find and remove the person by _id
        const removedPerson = await Person.findByIdAndRemove(personId).exec();

        if (!removedPerson) {
        console.log(`No person found with the specified _id.`);
        } else {
        console.log('Deleted Person:', removedPerson);
        }
    } catch (err) {
        console.error('Error:', err);
    }
    }

    // Usage example.....
    const personIdToDelete = '64fafb15cc0a1722e4081125';
    deletePersonById(personIdToDelete);




    // Function to delete people named "Mary"
    async function deletePeopleNamedMary() {
    try {
        const result = await Person.deleteMany({ name: 'Mary' }).exec();
        console.log(`Deleted ${result.deletedCount} people named Mary.`);
    } catch (err) {
        console.error('Error:', err);
    }
    }
    deletePeopleNamedMary();




        // Find people who like burritos, sort by name, limit to 2, and hide age
    function findBurritoLovers() {
        return Person.find({ favoriteFoods: 'Burritos' })
        .sort('name')
        .limit(2)
        .select({ age: 0 }) // Exclude the 'age' field
        .then(data => {
            console.log('Burrito Lovers:', data);
            return data; // You can return the data if needed
        })
        .catch(err => {
            console.error('Error:', err);
            throw err;
        });
    }
    
    // Usage example..... Call the function
    findBurritoLovers()
        .then(data => {
        // Use the data as needed
        console.log('Result:', data);
        })
        .catch(err => {
        // Handle any errors here
        console.error('Error:', err);
        });