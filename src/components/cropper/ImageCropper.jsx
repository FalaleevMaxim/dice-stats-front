import React, {useState, useImperativeHandle, forwardRef, useEffect} from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from './cropImage'; // Утилита для обрезки изображения

const ImageCropper = forwardRef(({ initialImage, onSelected }, ref) => {
    const [imageSrc, setImageSrc] = useState(null);
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

    // Делаем метод "получить изображение" доступным через ref
    useImperativeHandle(ref, () => ({
        getCroppedImage: async () => {
            console.log("getCroppedImage")
            if (!imageSrc || !croppedAreaPixels) {
                throw new Error('No image or cropped area specified');
            }
            return getCroppedImg(imageSrc, croppedAreaPixels);
        },
        cancel: () => {
            setImageSrc(null)
            onSelected(false)
        }
    }));

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageSrc(reader.result);
                onSelected(true)
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCropComplete = (_, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    return (
        <div>
            {!imageSrc && (
                <input type="file" accept="image/*" onChange={handleFileChange} />
            )}
            {imageSrc && (
                <div>
                    <div style={{ position: 'relative', width: '600px', height: '400px' }}>
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
                    </div>
                </div>
            )}
        </div>
    );
});

export default ImageCropper;
