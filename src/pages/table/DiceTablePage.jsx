import ImageCropper from "../../components/cropper/ImageCropper.jsx";
import { ToastContainer, toast } from 'react-toastify';
import {useState} from "react";
import classes from "./DiceTablePage.module.css"
import DiceList from "../../components/dicelist/DiceList.jsx";

const DiceTablePage = () => {
    const [inputName, setInputName] = useState("")
    const [refreshKey, setRefreshKey] = useState(0);

    const handleSave = async (croppedImageUrl) => {
        if (!inputName) {
            toast.error("Не введено имя")
        }

        // Получение Blob из Object URL
        const responseImage = await fetch(croppedImageUrl);
        const blob = await responseImage.blob();

        // Создание файла для отправки
        const file = new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' });

        const formData = new FormData();
        formData.append('image', file);
        formData.append('name', inputName);

        const response = await fetch('http://localhost:8080/dice/add', {
            method: 'POST',
            body: formData,
        });
        if (response.ok) {
            setRefreshKey((prevKey) => prevKey + 1)
            toast.success("Успешно добавлен!");
        }
    };

    function onSelectionChange(newSel) {
        console.log(`Selected: ${newSel}`)
    }

    return <div className={classes.pageContainer}>
        <DiceList refreshKey={refreshKey} onSelectionChange={onSelectionChange}/>
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
        <ToastContainer autoClose={5000} position="top-center" />
    </div>
}
export default DiceTablePage