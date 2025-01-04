import ImageCropper from "../../components/cropper/ImageCropper.jsx";
import {ToastContainer, toast} from 'react-toastify';
import {useRef, useState} from "react";
import classes from "./DiceTablePage.module.css"
import DiceList from "../../components/lists/DiceList.jsx";

const DicePage = () => {
    const [inputName, setInputName] = useState("")
    const [refreshKey, setRefreshKey] = useState(0);
    const [selected, setSelected] = useState(null);
    const [selectedImage, setSelectedImage] = useState(false);
    const cropperRef = useRef();

    const handleSave = async () => {
        console.log("Saving")
        const croppedImage = await cropperRef.current.getCroppedImage();
        console.log(croppedImage)

        const formData = JSON.stringify({
            image: croppedImage,
            name: inputName
        })

        let response
        if (selected) {
            response = await fetch('http://localhost:8080/dice/' + selected.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: formData,
            });
        } else {
            response = await fetch('http://localhost:8080/dice/add', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: formData,
            });
        }
        if (response.ok) {
            setRefreshKey((prevKey) => prevKey + 1)
            toast.success(`Успешно ${selected ? "обновлён" : "добавлен"}!`);
            setInputName("")
            setSelected(null)
        } else {
            toast.error("Ошибка сохранения")
        }
    };

    function onSelectionChange(newSel) {
        setInputName(newSel ? newSel.name : "")
        setSelected(newSel)
        setSelectedImage(true)
    }

    function cancelCropper() {
        cropperRef.current.cancel();
        setSelectedImage(false)
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
        <ImageCropper ref={cropperRef} initialImage={selected?.image} onSelected={setSelectedImage}/>
        { selectedImage && <>
            <button onClick={handleSave} disabled={!inputName || !selectedImage}>Сохранить</button>
            <button onClick={cancelCropper}>Отмена</button>
        </>}
        <ToastContainer autoClose={5000} position="top-center"/>
    </div>
}
export default DicePage