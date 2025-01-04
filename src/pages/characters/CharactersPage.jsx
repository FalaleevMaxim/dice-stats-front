import {ToastContainer, toast} from 'react-toastify';
import {useState} from 'react'
import classes from './CharactersPage.module.css';
import CharacterList from "../../components/lists/CharacterList.jsx";


function CharactersPage() {
    const [inputName, setInputName] = useState("")
    const [refreshKey, setRefreshKey] = useState(0);
    const [selected, setSelected] = useState(null);

    async function saveCharacter() {
        let response
        if (selected) {
            response = await fetch('http://localhost:8080/character/' + selected.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: inputName
                })
            })
        } else {
            response = await fetch('http://localhost:8080/character/add', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: inputName
                })
            })
        }
        if (response.ok) {
            setRefreshKey((prevKey) => prevKey + 1)
            toast.success(`Успешно ${selected ? "обновлён" : "добавлен"}!`);
        }
    }

    function onSelectionChange(newSel) {
        setInputName(newSel ? newSel.name : "")
        setSelected(newSel)
    }

    return (
        <div className={classes.pageContainer}>
            <CharacterList refreshKey={refreshKey} onSelectionChange={onSelectionChange}/>
            <form>
                <label htmlFor="name">{selected ? "Переименовать" : "Добавить"} персонажа: </label>
                <input
                    name="name"
                    type="text"
                    value={inputName}
                    onChange={(event) => setInputName(event.target.value)}
                />
            </form>
            <button onClick={saveCharacter} disabled={!inputName}>Сохранить</button>
            <ToastContainer autoClose={5000} position="top-center"/>
        </div>
    );
}

export default CharactersPage