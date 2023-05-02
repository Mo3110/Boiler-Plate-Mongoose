require('dotenv').config();
// const express = require("express");
// var mongodb = require("mongodb");
const mongoose = require('mongoose');

const URI = process.env.MONGO_URI;
mongoose.connect(URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
  }, () => {
    console.log("DB connection successful");
});


const personSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: [String],
});

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const person = new Person({
    name:"Beko",
    age:32,
    favoriteFoods: ['Stuffed Burger'],
  });

  person.save(function(err, data) {
    done(null, data);
  });
};

const arrayOfPeople = [
  {name:'Suzy', age:22, favoriteFoods:['Fried Chicken']},
  {name:'Anas', age:3, favoriteFoods:['Chipsy']},
  {name:'Walaa', age:28, favoriteFoods:['Chicken Liver']},
]

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    done(null, people);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, person) => {
    done(null, person);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food}, (err, person) => {
    done(null, person);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, foundPerson) => {
    if (err) done(err)
    done(null, foundPerson)
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger"
  Person.findById(personId, (err, foundPerson) => {
    if (err) done(err)
    foundPerson.favoriteFoods.push(foodToAdd)
    foundPerson.save((err, updatedPerson) => {
      if (err) done(err)
      done(null, updatedPerson)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, (err, updatedPerson) => {
      if (err) done(err)
      done(null, updatedPerson)
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedPerson) => {
    if (err) done(err)
    done(null, removedPerson)
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, response) => {
    if (err) done(err)
    done(null, response)
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 'ascending' })
    .limit(2)
    .select({ age: 0 })
    .exec((err, foundPeople) => {
      if (err) done(err)
      done(null, foundPeople);
    })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
