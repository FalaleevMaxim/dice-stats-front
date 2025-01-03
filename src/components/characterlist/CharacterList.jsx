import {useEffect, useState} from "react";
import classes from "./CharacterList.module.css";

function CharacterList({refreshKey, onSelectionChange}) {
    const [characters, setCharacters] = useState([])
    const [selected, setSelected] = useState(null)

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

    return (
        <ul className={classes.characterList}>
            {characters.map((d) => (
                <li key={d.id}
                    className={selected === d.id ? classes.active : ""}
                    onClick={() => changeSelection(d.id)}>
                    {d.name}
                </li>
            ))}
        </ul>
    )
}

export default CharacterList