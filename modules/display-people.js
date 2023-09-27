const displayPeople = (people, peopleTable, tableHeaders, eventListners) => {
  const peopleRowsArray = people.map((person) => {
    return `<tr id="${person.id}">
          <td>${person.id}</td>
          <td>${person.firstName}</td>
          <td>${person.lastName}</td>
          <td>${person.birthDate}</td>
          <td>${person.email}</td>
          <td>${person.contact}</td>
          <td>${person.state}</td>
          <td><button type="button" class="delete-btn" id="${person.id}">Del</button>
          <button type="button" class="edit-btn" id="${person.id}">Edit</button>
          </td>
        </tr>`;
  });
  const peopleRows = peopleRowsArray.reduce(
    (rowsHTML, currentRow) => (rowsHTML = rowsHTML + currentRow),
    "",
  );
  peopleTable.innerHTML = tableHeaders + peopleRows;
  eventListners.forEach((eventListner) => {
    eventListner();
  });
};

export default displayPeople;
