import CharacterList from "../../components/characterlist/CharacterList.jsx";
import DiceList from "../../components/dicelist/DiceList.jsx";
import {useState} from "react";
import {ToastContainer, toast} from "react-toastify";
import classes from "./RollPage.module.css";

function  RollPage() {
    const [rollResult, setRollResult] = useState(20)
    const [selectedCharacter, setSelectedCharacter] = useState(null)
    const [selectedDice, setSelectedDice] = useState(null)

    async function saveRoll() {
        if (selectedCharacter == null || selectedDice == null) {
            toast.error("Не выбран персонаж или дайс")
        }
        const response = await fetch('http://localhost:8080/roll/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                result: rollResult,
                character: selectedCharacter,
                dice: selectedDice.id
            })
        })
        if (response.ok) {
            console.log("Успешно добавлен!")
            toast.success("Успешно добавлен!");
        }
    }

    return (
        <div className={classes.pageContainer}>
            <div className={classes.selectionContainer}>
                <CharacterList
                    onSelectionChange={setSelectedCharacter}
                />
                <DiceList
                    onSelectionChange={setSelectedDice}
                />
            </div>
            <form className={classes.form}>
                <label htmlFor="roll">Введите результат броска:</label>
                <input
                    id="roll"
                    type="number"
                    value={rollResult}
                    onChange={(e) => setRollResult(e.target.value)}
                />
            </form>
            <button type="button" onClick={saveRoll}>Сохранить</button>
            <ToastContainer autoClose={5000} position="top-center" theme={"dark"}/>
        </div>
    );
}

export default RollPage;