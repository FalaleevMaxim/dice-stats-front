import {ToastContainer, toast} from 'react-toastify';
import {useState} from 'react'
import classes from './CharactersPage.module.css';
import CharacterList from "../../components/characterlist/CharacterList.jsx";


function CharactersPage() {
    const [inputName, setInputName] = useState("")
    const [refreshKey, setRefreshKey] = useState(0);

    async function saveCharacter() {
        if (!inputName) {
            toast.error("Не введено имя")
        }
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
        if (response.ok) {
            setRefreshKey((prevKey) => prevKey + 1)
            console.log("Успешно добавлен!")
            toast.success("Успешно добавлен!");
        }
    }

    function onSelectionChange(newSel) {
        console.log(`Selected: ${newSel}`)
    }

    return (
        <div className={classes.pageContainer}>
            <CharacterList refreshKey={refreshKey} onSelectionChange={onSelectionChange}/>
            <form>
                <label htmlFor="name">Добавить персонажа: </label>
                <input
                    name="name"
                    type="text"
                    value={inputName}
                    onChange={(event) => setInputName(event.target.value)}
                />
            </form>
            <button onClick={saveCharacter}>Сохранить</button>
            <ToastContainer autoClose={5000} position="top-center"/>
        </div>
    );
}

export default CharactersPage