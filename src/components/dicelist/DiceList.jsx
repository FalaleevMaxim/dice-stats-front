import {useEffect, useState} from "react";
import classes from "./DiceList.module.css";

function DiceList({refreshKey, onSelectionChange}) {
    const [dice, setDice] = useState([])
    const [selected, setSelected] = useState(null)
    const [search, setSearch] = useState("")

    async function fetchDice() {
        const response = await fetch("http://localhost:8080/dice/all")
        const chars = await response.json();
        setDice(chars)
    }

    useEffect(() => {
        fetchDice()
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
        <div className={classes.diceContainer}>
            <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Поиск кубиков..."
            />
            <ul className={classes.diceList}>
                {dice.map((d) => (
                    <li key={d.id}
                        className={!d.name.toUpperCase().includes(search.toUpperCase()) ? classes.disable : selected === d.id ? classes.active : ""}
                        onClick={() => changeSelection(d.id)}>
                        <img src={d.image} alt={d.name}/>
                        <span>{d.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default DiceList