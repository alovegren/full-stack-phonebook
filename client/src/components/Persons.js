const Person = ({ name, number, deleteHandler }) => {
  return (
  <p>
    {name} {number}
    <button onClick={deleteHandler} type="button">delete</button>
  </p>
  );
}

const Persons = ({ personsToDisplay, deleteHandler }) => (
  <div>
    {personsToDisplay.map(person => (
      <Person 
        key={person.id}
        name={person.name}
        number={person.number}
        deleteHandler={() => deleteHandler(person.id)}
       />
    ))}
  </div>
)

export default Persons;