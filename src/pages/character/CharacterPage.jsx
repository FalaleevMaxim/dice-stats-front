import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import RollHistogram from "../../components/histogram/RollHistogram.jsx";
import RollHistoryChart from "../../components/chart/RollHistoryChart.jsx";

function CharacterPage() {
    const [character, setCharacter] = useState(null)
    const [rolls, setRolls] = useState(null)
    const { id } = useParams();

    function fetchCharacter() {
        try {
            fetch("http://localhost:8080/character/" + id)
                .then(response => response.json())
                .then(data => {
                    setCharacter(data)
                    console.log("Данные персонажа: ", JSON.stringify(data))
                })
        } catch (e) {
            console.error("Ошибка получения данных о персонаже", e)
        }
    }

    function fetchRolls() {
        try {
            const baseURL = 'http://localhost:8080/roll/history';
            const params = { characterId: id };
            const url = new URL(baseURL);
            url.search = new URLSearchParams(params).toString();
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    setRolls(data)
                    console.log("История бросков: ", JSON.stringify(data))
                })
        } catch (e) {
            console.error("Ошибка получения истории бросков", e)
        }
    }

    useEffect(() => {
        fetchCharacter()
        fetchRolls()
    }, []);

    function getAverage() {
        return rolls?.map(roll => roll.result).reduce((sum, num) => sum + num, 0) / rolls?.length
    }

    function getCount(value) {
        return rolls?.filter(roll => roll.result === value).length
    }

    function countAll() {
        const data = Array(21).fill(0)
        rolls.map(roll => roll.result).forEach(result => data[result] += 1 )
        return data
    }

    return (<>
        {!character && <h1>Загрузка персонажа...</h1>}
        {character && <h1>{character.name}</h1>}

        <h2>
            {rolls === null
                ? 'Загрузка истории бросков...'
                : rolls.length > 0
                    ? 'Статистика:'
                    : 'Нет бросков'}
        </h2>
        {rolls && rolls.length > 0 && <>
            <h3>Среднее значение: {getAverage()}</h3>
            <h3>Выпало 1: {getCount(1)}</h3>
            <h3>Выпало 20: {getCount(20)}</h3>
            <RollHistogram rollStats={countAll()} height={500} width={600}/>
            <RollHistoryChart rollHistory={rolls.map(roll => roll.result)} height={500} width={600} />
        </>}
    </>)
}

export default CharacterPage