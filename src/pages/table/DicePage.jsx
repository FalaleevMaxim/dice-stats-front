import ImageCropper from "../../components/cropper/ImageCropper.jsx";
import {ToastContainer, toast} from 'react-toastify';
import {useState} from "react";
import classes from "./DiceTablePage.module.css"
import DiceList from "../../components/dicelist/DiceList.jsx";

const DicePage = () => {
    const [inputName, setInputName] = useState("")
    const [refreshKey, setRefreshKey] = useState(0);
    const [selected, setSelected] = useState(null);

    const handleSave = async (croppedImageUrl) => {
        if (!inputName) {
            toast.error("Не введено имя")
            return
        }

        // Получение Blob из Object URL
        const responseImage = await fetch(croppedImageUrl);
        const blob = await responseImage.blob();

        // Создание файла для отправки
        const file = new File([blob], 'cropped-image.jpg', {type: 'image/jpeg'});

        const formData = new FormData();
        formData.append('image', file);
        formData.append('name', inputName);

        let response
        if (selected) {
            response = await fetch('http://localhost:8080/dice/' + selected.id, {
                method: 'PUT',
                body: formData,
            });
        } else {
            response = await fetch('http://localhost:8080/dice/add', {
                method: 'POST',
                body: formData,
            });
        }
        if (response.ok) {
            setRefreshKey((prevKey) => prevKey + 1)
            toast.success(`Успешно ${selected ? "обновлён" : "добавлен"}!`);
        }
    };

    function onSelectionChange(newSel) {
        setInputName(newSel ? newSel.name : "")
        setSelected(newSel)
    }

    return <div className={classes.pageContainer}>
        <DiceList refreshKey={refreshKey} onSelectionChange={onSelectionChange}/>
        <form>
            <label htmlFor="name">{selected ? "Редактировать" : "Добавить"} куб: </label>
            <input
                name="name"
                type="text"
                value={inputName}
                onChange={(event) => setInputName(event.target.value)}
            />
        </form>
        <ImageCropper onSave={handleSave} initialImage={selected?.image} />
        <ToastContainer autoClose={5000} position="top-center" />
    </div>
}
export default DicePage