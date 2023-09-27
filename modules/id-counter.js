let idCounter = 0;

const getIdCounter = () => {
  idCounter++;
  return idCounter;
};

export default getIdCounter;
