import React, { useState, useEffect } from 'react';
import NavBar from '../../../components/Navbar/NavBar';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import apiClient from '../../../services/apiClient';
import axios from 'axios';
import '../../../i18n';
import { useTranslation } from 'react-i18next';


// This component is used to get the clothing data from the user.
function FormGetClothing() {
    const { t } = useTranslation();

    // These states are used to store the data of the clothing.
    const [name, setName] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [color, setColor] = useState(null);
    const [size, setSize] = useState(null);
    
    const [type, setType] = useState(0);
    // This state is used to store the types of the clothing.
    const [types, setTypes] = useState([]);

    const apiKey = 'KPtCBmuy3iD2c2j1pyGXdTsM';
    const apiUrlBG = 'https://api.remove.bg/v1.0/removebg';

    async function removeBackground(image) {
        const formData = new FormData();
        formData.append('image_file', image);
        formData.append('size', 'auto');

        try {
            const response = await axios.post(apiUrlBG, formData, {
                headers: {
                    'X-Api-Key': apiKey,
                    'Content-Type': 'multipart/form-data',
                },
                responseType: 'arraybuffer', // Cambiado de 'stream' a 'arraybuffer'
            });

            // Create a Blob from the array buffer
            const blob = new Blob([response.data]);
            // Create a File from the Blob
            const file = new File([blob], 'no-bg.png', { type: 'image/png' });
            console.log(file);
            return file;
        } catch (error) {
            console.error('Failed to remove background:', error.message);
            throw error;
        }
    }

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        try {
            const newFile = await removeBackground(file);
            setSelectedFile(newFile);
        } catch (error) {
            console.log("i dont make it")
        }
    };


    // This function is used to get the types of the clothing.
    useEffect(() => {
        const getTypes = async () => {
            try {
                const answer = await apiClient.get('/clothing/ClothingsTypes');
                setTypes(answer.data);
                const urlParams = new URLSearchParams(window.location.search);
                const initialType = urlParams.get('type');
                if (initialType) {
                    setType(answer.data.indexOf(initialType));
                }
            } catch (e) {
                console.log(e);
            }
        };

        getTypes();
    }, []);

    // This function is used to send the clothing to the backend.
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (selectedFile) {
            const reader = new FileReader();
            reader.readAsDataURL(selectedFile); // Cambiar a Data URL en lugar de Array Buffer
            reader.onloadend = () => {
                const imageData = reader.result;
                const clothingData = {
                    name: name,
                    image: imageData.split(',')[1], // Extraer solo el contenido Base64 sin el encabezado
                    color: color,
                    size: size,
                    type: type,
                    wardrobeIds: [],
                    outfitIds: [],
                    likedBy: []
                };
                console.log(document.cookie)
                apiClient.post('/clothing', clothingData)
                    .then(response => {
                        console.log(response.data);
                        window.location.href = '/Wardrobe';
                    })
                    .catch(error => {
                        console.log(error);
                    });
            };
        } else {
            console.warn('No se ha seleccionado ningún archivo');
        }
    };
    

    return (
        <div className='col-12'>
            <NavBar />
            <div className='container'>
                <div className='row'>
                    <div className='col-10 offset-1 col-sm-8 offset-sm-2 col-md-5 offset-md-1 col-lg-5 offset-lg-1 mt-3'>
                        <h2>{t('Submit clothing')}</h2> {/* Translated */}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
                                <Form.Label column sm={2}>{t('Name')}</Form.Label> {/* Translated */}
                                <Col sm={10}>
                                    <Form.Control onChange={(e) => setName(e.target.value)} required={true}
                                        type="text" placeholder={t('Name')} /> {/* Translated */}
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formFile">
                                <Form.Label column sm={2}>{t('Photo')}</Form.Label> {/* Translated */}
                                <Col sm={10}>
                                    <Form.Control onChange={handleFileChange} required={true}
                                        type="file" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalColor">
                                <Form.Label column sm={2}>{t('Color')}</Form.Label> {/* Translated */}
                                <Col sm={10}>
                                    <Form.Control onChange={(e) => setColor(e.target.value)} required={true}
                                        type="text" placeholder={t('Color')} /> {/* Translated */}
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalSize">
                                <Form.Label column sm={2}>{t('Size')}</Form.Label> {/* Translated */}
                                <Col sm={10}>
                                    <Form.Control onChange={(e) => setSize(e.target.value)} required={true}
                                        type="text" placeholder={t('Size')} /> {/* Translated */}
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formGridType">
                                <Form.Label column sm={2}>{t('Type')}</Form.Label> {/* Translated */}
                                <Col sm={10}>
                                    <Form.Select onChange={(e) => setType(e.target.value)} required={true}
                                        value={new URLSearchParams(window.location.search).get("type")}>
                                        {types.map((type, i) => (
                                            <option key={i}>{t(type)}</option> // Assuming types are also translated
                                        ))}
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Col sm={{ span: 10, offset: 2 }}>
                                    <Button type="submit">{t('Submit')}</Button> {/* Translated */}
                                </Col>
                            </Form.Group>
                        </Form>
                    </div>
                    <div className='col-10 offset-1 col-sm-8 offset-sm-2 col-md-4 offset-md-1 col-lg-3 mt-5'>
                        {selectedFile && (
                            <div className='text-center'>
                                <h4>{t('Selected image')}</h4> {/* Translated */}
                                <img src={URL.createObjectURL(selectedFile)} alt="Selected" style={{ maxWidth: '100%', marginTop: '10px' }} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormGetClothing;
