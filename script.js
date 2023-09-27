import states from "./modules/states.js";
import Person from "./modules/Person.js";
import inputFields from "./modules/input-fields.js";
import getIdCounter from "./modules/id-counter.js";
import displayPeople from "./modules/display-people.js";
import {
  getPersonDetails,
  loadPersonDetails,
  resetForm,
} from "./modules/person-form-actions.js";
import {
  addPerson,
  deletePerson,
  savePerson,
} from "./modules/event-listeners.js";

let people = []; //people data array

let formMode = "new";

const tableHeaders = `<th>ID</th>
<th>First Name</th>
<th>Last Name</th>
<th>Birth Date</th>
<th>Email</th>
<th>Contact</th>
<th>State</th>
<th>Actions</th>`;

// For adding event listners on edit and delete button clicks
const addDeleteEventListner = () => {
  const delBtns = document.querySelectorAll(".delete-btn");
  delBtns.forEach((delBtn) =>
    delBtn.addEventListener("click", () => handleDeletePerson(delBtn.id)),
  );
};
const addEditEventListner = () => {
  const editBtns = document.querySelectorAll(".edit-btn");
  editBtns.forEach((editBtn) =>
    editBtn.addEventListener("click", () => handleEditPerson(editBtn.id)),
  );
};

//Event listners for CRUD operation on people array
const handleAddPerson = (e) => {
  e.preventDefault();
  currentPerson = getPersonDetails(inputFields, currentPerson);
  currentPerson.id = getIdCounter();
  [people, currentPerson] = addPerson(people, currentPerson);
  resetForm(inputFields);
  displayPeople(people, peopleTable, tableHeaders, [
    addEditEventListner,
    addDeleteEventListner,
  ]);
};
const handleEditPerson = (id) => {
  currentPerson = loadPersonDetails(id, people, inputFields, currentPerson);
  changeSubmitBtn("edit");
};
const handleSavePerson = (e) => {
  e.preventDefault();
  currentPerson = getPersonDetails(inputFields, currentPerson);
  [people, currentPerson] = savePerson(people, currentPerson);
  resetForm(inputFields);
  changeSubmitBtn("new");
  displayPeople(people, peopleTable, tableHeaders, [
    addEditEventListner,
    addDeleteEventListner,
  ]);
};
const handleDeletePerson = (id) => {
  people = deletePerson(id, people);
  displayPeople(people, peopleTable, tableHeaders, [
    addEditEventListner,
    addDeleteEventListner,
  ]);
};

//Change button submit button text based on formMode
const changeSubmitBtn = (updatedFormMode) => {
  const addBtn = document.querySelector("#add-btn");
  if (updatedFormMode === "edit") {
    addBtn.textContent = "Save";
    formMode = updatedFormMode; // edit
  } else if (updatedFormMode === "new") {
    addBtn.textContent = "Add";
    formMode = updatedFormMode; //new
  }
};

//Toggle between Adding new person details and editing a person details based on formMode
const submitBtnAction = (e) => {
  if (formMode === "new") {
    handleAddPerson(e);
  } else if (formMode === "edit") {
    handleSavePerson(e);
  }
};

//Add options in State selector
const loadStateOptions = (states) => {
  const stateInput = document.querySelector("#state");
  const stateOptions = states.map(
    (state) => `<option value="${state}">${state}</option>`,
  );
  stateInput.innerHTML = stateOptions;
};

const initializeForm = () => {
  loadStateOptions(states);
  const addBtn = document.querySelector("#add-btn");
  addBtn.addEventListener("click", (e) => submitBtnAction(e));
  displayPeople(people, peopleTable, tableHeaders, [
    addEditEventListner,
    addDeleteEventListner,
  ]);
};

//demo person for testing
const demoPerson = new Person({
  id: getIdCounter(),
  firstName: "Deepak",
  lastName: "Sharma",
  birthDate: "1998-12-24",
  email: "deepak@gmail.com",
  contact: "9834567120",
  state: "Delhi",
});
people.push(demoPerson);

let currentPerson = new Person({
  id: null,
  firstName: "",
  lastName: "",
  birthDate: "",
  email: "",
  contact: "",
  state: "",
});
const peopleTable = document.querySelector("#people-table");
initializeForm();
