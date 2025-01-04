import {useEffect, useState} from "react";
import classes from "./CustomList.module.css";

function CustomList({requestFunction, hasImage, refreshKey, onSelectionChange, searchPlaceholder}) {
    const [content, setContent] = useState([])
    const [selected, setSelected] = useState(null)
    const [search, setSearch] = useState("")

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await requestFunction();
                setContent(data);
                console.log(JSON.stringify(data, (key, value) => {
                    if (key === 'image') return undefined; // Исключить поле image
                    return value;
                }, 2));
                setSelected(null);
            } catch (error) {
                console.error("Ошибка при загрузке данных:", error);
            }
        }

        fetchData();
    }, [refreshKey]);

    function changeSelection(clicked) {
        const newSelection = selected === clicked ? null : clicked;
        setSelected(newSelection)
        console.log("Selected: " + JSON.stringify(newSelection, (key, value) => {
            if (key === 'image') return undefined; // Исключить поле image
            return value;
        }, 2));
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
        <div className={classes.listContainer}>
            <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder={searchPlaceholder}
            />
            <ul className={classes.list}>
                {content.map((item) => (
                    <li key={item.id}
                        className={!item.name.toUpperCase().includes(search.toUpperCase()) ? classes.disable : selected?.id === item.id ? classes.active : ""}
                        onClick={() => changeSelection(item)}>
                        {hasImage && <img src={item.image} alt={item.name}/>}
                        <span>{item.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CustomList