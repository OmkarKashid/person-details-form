const addPerson = (people, currentPerson) => {
  people.push(currentPerson);
  currentPerson = {}; //reset current person
  return [people, currentPerson];
};

const savePerson = (people, currentPerson) => {
  const foundIndex = people.findIndex(
    (person) => person.id == currentPerson.id,
  );
  people[foundIndex] = currentPerson;
  currentPerson = {};
  return [people, currentPerson];
};

const deletePerson = (id, people) => {
  people = people.filter((person) => person.id != id);
  return people;
};

export { addPerson, savePerson, deletePerson };
