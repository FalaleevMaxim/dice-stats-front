import React, { useState, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from './cropImage'; // Утилита для обрезки изображения

const ImageCropper = ({ initialImage, onSave }) => {
    const [imageSrc, setImageSrc] = useState(null); // Источник изображения
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    // Устанавливаем начальное изображение, если оно передано
    useEffect(() => {
        if (initialImage) {
            setImageSrc(initialImage);
        }
        return () => setImageSrc(null)
    }, [initialImage]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageSrc(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCropComplete = (_, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const handleSave = async () => {
        if (!imageSrc || !croppedAreaPixels) return;

        const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
        onSave(croppedImage); // Передача обрезанного изображения наружу

        // Скрыть блок с обрезкой изображения
        setImageSrc(null);
    };

    return (
        <div>
            {!imageSrc && (
                <input type="file" accept="image/*" onChange={handleFileChange} />
            )}
            {imageSrc && (
                <div>
                    <div style={{ position: 'relative', width: '100%', height: '400px' }}>
                        <Cropper
                            image={imageSrc}
                            crop={crop}
                            zoom={zoom}
                            aspect={1} // Квадратная область обрезки
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={handleCropComplete}
                        />
                    </div>
                    <div>
                        <input
                            type="range"
                            min="1"
                            max="3"
                            step="0.1"
                            value={zoom}
                            onChange={(e) => setZoom(Number(e.target.value))}
                        />
                        <button onClick={handleSave}>Сохранить</button>
                        <button onClick={() => setImageSrc(null)}>Отмена</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageCropper;
