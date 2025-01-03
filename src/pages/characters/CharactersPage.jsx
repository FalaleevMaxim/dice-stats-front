import {useState, useEffect} from 'react'
import classes from './CharactersPage.module.css';


function CharactersPage() {
    const [characters, setCharacters] = useState([])
    const [inputName, setInputName] = useState("")

    async function fetchCharacters() {
        const response = await fetch("http://localhost:8080/character/all")
        const chars = await response.json();
        setCharacters(chars)
    }

    useEffect(() => {
        fetchCharacters()
    }, [characters]);

    async function saveCharacter() {
        const response = await fetch('http://localhost:8080/character/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: inputName
            })
        })
        const char = await response.json();
        setCharacters((prevCharacters) => [...prevCharacters, char])
    }

    return (
        <div className={classes.pageContainer}>
            <ul className={classes.characterList}>
                {characters.map((char) => (
                    <li key={char.id}>{char.name}</li>
                ))}
            </ul>
            <form>
                <label htmlFor="name">Добавить персонажа: </label>
                <input
                    name="name"
                    type="text"
                    value={inputName}
                    onChange={(event) => setInputName(event.target.value)}
                />
                <button onClick={saveCharacter}>Сохранить</button>
            </form>
        </div>
    );

}

export default CharactersPage