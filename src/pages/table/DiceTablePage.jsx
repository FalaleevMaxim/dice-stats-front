import ImageCropper from "../../components/cropper/ImageCropper.jsx";
import {useEffect, useState} from "react";
import classes from "./DiceTablePage.module.css"

const DiceTablePage = () => {
    const [dice, setDice] = useState([])
    const [inputName, setInputName] = useState("")

    async function fetchDice() {
        const response = await fetch("http://localhost:8080/dice/all")
        const chars = await response.json();
        setDice(chars)
    }

    useEffect(() => {
        fetchDice()
    }, [dice]);


    const handleSave = async (croppedImageUrl) => {
        // Получение Blob из Object URL
        const responseImage = await fetch(croppedImageUrl);
        const blob = await responseImage.blob();

        // Создание файла для отправки
        const file = new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' });

        // Пример отправки на сервер
        const formData = new FormData();
        formData.append('image', file);
        formData.append('name', inputName);

        const response = await fetch('http://localhost:8080/dice/add', {
            method: 'POST',
            body: formData,
        });
        const newDice = await response.json();
        setDice((prevDice) => [...prevDice, newDice])
    };

    return <div className={classes.pageContainer}>
        <ul className={classes.diceList}>
            {dice.map((d) => (
                <li key={d.id}>
                    <img src={d.image} alt={d.name}/>
                    <span>{d.name}</span>
                </li>
            ))}
        </ul>
        <form>
            <label htmlFor="name">Добавить куб: </label>
            <input
                name="name"
                type="text"
                value={inputName}
                onChange={(event) => setInputName(event.target.value)}
            />
        </form>
        <ImageCropper onSave={handleSave}/>
    </div>
}
export default DiceTablePage