const PersonForm = (props) => {
  const { 
    newName, newNumber, handleNewName, handleNewNumber, onSubmit
  } = props;
  
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input onChange={handleNewName} value={newName} />
      </div>
      <div>
        number: <input onChange={handleNewNumber} value={newNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

export default PersonForm;