const getPersonDetails = (inputFields, currentPerson) => {
  let updatedPerson = { id: currentPerson.id };
  inputFields.forEach((field) => {
    updatedPerson[field] = document.querySelector(`#${field}`).value;
  });
  return updatedPerson;
};

const loadPersonDetails = (id, people, inputFields, currentPerson) => {
  const person = people.find((person) => person.id == id);
  currentPerson.id = id;
  inputFields.forEach((field) => {
    document.querySelector(`#${field}`).value = person[field];
  });
  return currentPerson;
};
const resetForm = (inputFields) => {
  inputFields.forEach((field) => {
    document.querySelector(`#${field}`).value = "";
  });
};

export { getPersonDetails, loadPersonDetails, resetForm };
