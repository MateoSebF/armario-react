import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function FormGetClothing() {
    const [name, setName] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [color, setColor] = useState(null);
    const [size, setSize] = useState(null);
    const [type, setType] = useState(0);
    const apiUrl = process.env.REACT_APP_API_URL;
    const [types, setTypes] = useState([]);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    useEffect(() => {
        const getTypes = async () => {
            try {
                const answer = await axios.get(`${apiUrl}clothing/ClothingsTypes`);
                setTypes(answer.data);
            } catch (e) {
                console.log(e);
            }
        };

        getTypes();
    }, [apiUrl]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (selectedFile) {
            const reader = new FileReader();
            reader.readAsArrayBuffer(selectedFile);
            reader.onloadend = () => {
                const imageData = reader.result;
                const clothingData = {
                    name: name,
                    image: Array.from(new Uint8Array(imageData)),
                    color: color,
                    size: size,
                    type: type,
                    wardrobeIds: [],
                    outfitIds: []
                };
                axios.post(`${apiUrl}clothing/aed01e26-1d1b-479e-a2aa-c8acc92f03c0`, clothingData)
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
            <div className='col-12'>
                <NavBar />
            </div>
            <div className='container'>
                <div className='row'>
                    <div className='col-10 offset-1 col-sm-8 offset-sm-2 col-md-5 offset-md-1 col-lg-5 offset-lg-1 mt-3'>
                        <h2>Submmit clothing</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
                                <Form.Label column sm={2}>Name</Form.Label>
                                <Col sm={10}>
                                    <Form.Control onChange={(e) => setName(e.target.value)} required={true}
                                        type="text" placeholder="Name" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formFile">
                                <Form.Label column sm={2}>Photo</Form.Label>
                                <Col sm={10}>
                                    <Form.Control onChange={handleFileChange} required={true}
                                        type="file" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalColor">
                                <Form.Label column sm={2}>Color</Form.Label>
                                <Col sm={10}>
                                    <Form.Control onChange={(e) => setColor(e.target.value)} required={true}
                                        type="text" placeholder="color" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalSize">
                                <Form.Label column sm={2}>Size</Form.Label>
                                <Col sm={10}>
                                    <Form.Control onChange={(e) => setSize(e.target.value)} required={true}
                                        type="text" placeholder="size" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formGridType">
                                <Form.Label column sm={2}>Type</Form.Label>
                                <Col sm={10}>
                                    <Form.Select onChange={(e) => setType(e.target.value)} required={true}
                                        defaultValue="Select a type...">
                                        {types.map((type,i) => (
                                                <option key={i}>{type}</option>
                                            ))}
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Col sm={{ span: 10, offset: 2 }}>
                                    <Button type="submit">Submmit</Button>
                                </Col>
                            </Form.Group>
                        </Form>

                    </div>
                    <div className='col-10 offset-1 col-sm-8 offset-sm-2 col-md-4 offset-md-1 col-lg-3 mt-5'>
                        {selectedFile && (
                            <div className='text-center'>
                                <h4>Selected image</h4>
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