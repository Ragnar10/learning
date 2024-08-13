// Core
import { useState } from 'react';
// Instruments
import JSZip from 'jszip';
// Styles
import Styles from './styles.module.scss';
// Images
import fileUrl from '../../theme/assets/images/photos.zip';

export const TestDownloadFiles = () => {
    const [images, setImages] = useState([]);

    const downloadAndUnzip = async () => {
        try {
            const res = await fetch(fileUrl);
            const blob = await res.blob();
            const zip = await JSZip.loadAsync(blob);

            zip.forEach(
                async (relativePath, file) => {
                    if (file.name.match(/\.(jpg|jpeg|png|gif)$/i)) {
                        const fileContent = await file.async('blob');
                        const imageUrl = URL.createObjectURL(fileContent);
                        setImages((prevImages) => [...prevImages, imageUrl]);
                    }
                },
            );
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className = { Styles.container }>
            {
                images.length > 0
                    ? <button className = { Styles.btn_clear } onClick = { () => setImages([]) }>Clear</button>
                    : <button className = { Styles.btn_download } onClick = { downloadAndUnzip }>Download</button>
            }
            <div className = { Styles.images_wrapper }>
                {
                    images.length > 0 && images.map((image, index) => {
                        return (
                            <img
                                key = { index } src = { image }
                                alt = { `${index}_image` } />
                        );
                    })
                }
            </div>
        </div>
    );
};
