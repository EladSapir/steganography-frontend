import React, { useState } from 'react';
import SelectionScreen from './components/SelectionScreen';
import UploadForm from './components/UploadForm';
import ImageDisplay from './components/ImageDisplay';
import WatermarkDisplay from './components/WatermarkDisplay';
import Header from './components/Header';
import { Container } from '@mui/material';
import './App.css';

const App = () => {
    const [mode, setMode] = useState(null);
    const [image, setImage] = useState(null);
    const [watermark, setWatermark] = useState(null);

    const reset = () => {
        setMode(null);
        setImage(null);
        setWatermark(null);
    };

    return (
        <div className="App">
            <Header />
            <Container className="fade-in">
                {!mode ? (
                    <SelectionScreen setMode={setMode} />
                ) : (
                    <>
                        <UploadForm mode={mode} setImage={setImage} setWatermark={setWatermark} reset={reset} />
                        {(mode === 'hide-text' || mode === 'hide-image') && image && <ImageDisplay image={image} />}
                        {mode === 'extract-text' && watermark && <WatermarkDisplay watermark={watermark} />}
                        {mode === 'extract-image' && image && <ImageDisplay image={image} />} {/* Display extracted image */}
                    </>
                )}
            </Container>
        </div>
    );
};

export default App;
