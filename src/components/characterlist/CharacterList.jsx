import {useEffect, useState} from "react";
import classes from "./CharacterList.module.css";

function CharacterList({refreshKey, onSelectionChange}) {
    const [characters, setCharacters] = useState([])
    const [selected, setSelected] = useState(null)
    const [search, setSearch] = useState("")

    async function fetchCharacters() {
        const response = await fetch("http://localhost:8080/character/all")
        const chars = await response.json();
        setCharacters(chars)
    }

    useEffect(() => {
        fetchCharacters()
    }, [refreshKey]);

    function changeSelection(clicked) {
        const newSelection = selected === clicked ? null : clicked;
        setSelected(newSelection)
        onSelectionChange(newSelection)
    }

    function handleSearchChange(e) {
        setSearch(e.target.value);
        if (selected) {
            setSelected(null)
            onSelectionChange(null)
        }
    }

    return (
        <div className={classes.characterContainer}>
            <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Поиск персонажей..."
            />
            <ul className={classes.characterList}>
                {characters.map((d) => (
                    <li key={d.id}
                        className={!d.name.toUpperCase().includes(search.toUpperCase()) ? classes.disable : selected?.id === d.id ? classes.active : ""}
                        onClick={() => changeSelection(d)}>
                        {d.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CharacterList