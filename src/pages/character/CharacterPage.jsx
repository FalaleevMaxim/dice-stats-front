import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import RollHistogram from "../../components/histogram/RollHistogram.jsx";
import RollHistoryChart from "../../components/chart/RollHistoryChart.jsx";
import classes from "./CharacterPage.module.css";

function CharacterPage() {
    const [character, setCharacter] = useState(null);
    const [rolls, setRolls] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        async function fetchCharacter() {
            try {
                const response = await fetch("http://localhost:8080/character/" + id);
                const data = await response.json();
                setCharacter(data);
            } catch (e) {
                console.error("Ошибка получения данных о персонаже", e);
            }
        }

        async function fetchRolls() {
            try {
                const baseURL = "http://localhost:8080/roll/history";
                const params = { characterId: id };
                const url = new URL(baseURL);
                url.search = new URLSearchParams(params).toString();
                const response = await fetch(url);
                const data = await response.json();
                setRolls(data);
            } catch (e) {
                console.error("Ошибка получения истории бросков", e);
            }
        }

        fetchCharacter();
        fetchRolls();
    }, [id]);

    const getAverage = () =>
        rolls?.map((roll) => roll.result).reduce((sum, num) => sum + num, 0) / rolls?.length;

    const getCount = (value) => rolls?.filter((roll) => roll.result === value).length;

    const countAll = () => {
        const data = Array(21).fill(0);
        rolls?.map((roll) => roll.result).forEach((result) => (data[result] += 1));
        return data;
    };

    return (
        <div className={classes.pageContainer}>
            {!character && <h1>Загрузка персонажа...</h1>}
            {character && <h1 className={classes.characterName}>{character.name}</h1>}
            {rolls === null
                ? <h2>Загрузка истории бросков...</h2>
                : rolls.length > 0
                    ? null
                    : <h2>Нет бросков</h2>}

            {rolls && rolls.length > 0 && (
                <>
                    <table className={classes.statsTable}>
                        <thead>
                        <tr>
                            <th>Среднее значение</th>
                            <th>Выпало 1</th>
                            <th>Выпало 20</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{getAverage().toFixed(2)}</td>
                            <td>{getCount(1)}</td>
                            <td>{getCount(20)}</td>
                        </tr>
                        </tbody>
                    </table>
                    <div className={classes.graphContainer}>
                        <div className={classes.graphWrapper}>
                            <RollHistogram
                                rollStats={countAll()}
                                height={500}
                                width={600}
                            />
                        </div>
                        <div className={classes.graphWrapper}>
                            <RollHistoryChart
                                rolls={rolls}
                                height={500}
                                width={600}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default CharacterPage;
