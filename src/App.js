import React, { useState } from 'react';
import SelectionScreen from './components/SelectionScreen';
import UploadForm from './components/UploadForm';
import ImageDisplay from './components/ImageDisplay';
import WatermarkDisplay from './components/WatermarkDisplay';
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
        <Container>
            {!mode ? (
                <SelectionScreen setMode={setMode} />
            ) : (
                <>
                    <UploadForm mode={mode} setImage={setImage} setWatermark={setWatermark} reset={reset} />
                    {mode === 'hide' && image && <ImageDisplay image={image} />}
                    {mode === 'extract' && watermark && <WatermarkDisplay watermark={watermark} />}
                </>
            )}
        </Container>
    );
};

export default App;
