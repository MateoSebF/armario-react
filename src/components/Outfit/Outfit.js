import React, { useRef } from 'react';
import Carousel from './CarouselI';
import Button from 'react-bootstrap/Button';
import './Outfit.css';
import { useState, useEffect } from 'react';
import apiClient from '../../services/apiClient';
import { FiPlus } from "react-icons/fi";
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { FiX } from 'react-icons/fi'; // Importa el icono de cierre

// This component is used to show the outfit.
const Outfit = ({ handleSubmmit }) => {
    const [layers, setLayers] = useState([]);
    const [layersType, setLayersType] = useState([]);
    const [carouselIndex, setCarouselIndex] = useState([]);
    const [upperLayers, setUpperLayers] = useState([]);
    const [lowerLayers, setLowerLayers] = useState([]);
    const [show, setShow] = useState(false);
    const [lower, setLower] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (lower) => { setLower(lower); setShow(true); }
    const [layer, setLayer] = useState('');
    const isInitialMount = useRef(true);

    const handleSave = async (event) => {
        event.preventDefault();
        const clothes = [];
        for (let i = 0; i < layers.length; i++) {
            clothes.push(layers[i][carouselIndex[i]]);
        }
        handleSubmmit(clothes);
    };

    const addUpperLayer = async () => {
        try {
            var layerT = layer;
            if (layerT === '') layerT = upperLayers[0];
            await apiClient.post(`/wardrobe/upperLayers/${layerT}`)
                .then((response) => {
                    window.location.reload();
                });
        }
        catch (e) {
            console.log(e);
        }
        setLayer('');
    };

    const addLowerLayer = async () => {
        try {
            var layerT = layer;
            if (layerT === '') layerT = lowerLayers[0];
            await apiClient.post(`/wardrobe/lowerLayers/${layerT}`)
                .then((response) => {
                    window.location.reload();
                });
        }
        catch (e) {
            console.log(e);
        }
        setLayer('');
    };

    const handleDeleteLayer = async (index) => {
        try {
            await apiClient.delete(`/wardrobe/layers/${layersType[index]}`)
                .then((response) => {
                    window.location.reload();
                });
        }
        catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            const getLayers = async () => {
                try {
                    const layers = [];
                    const layersType = [];
                    const carouselIndex = [];
                    const layersTypes = await apiClient.get('/wardrobe/layersTypes');
                    for (let i = 0; i < layersTypes.data.length; i++) {
                        layers.push([]);
                        layersType.push(layersTypes.data[i]);
                        carouselIndex.push(0);
                        const answer = await apiClient.get(`/clothing/byType/${layersTypes.data[i]}`);
                        layers[i] = answer.data;
                    }
                    const upperLayers = await apiClient.get(`/wardrobe/upperLayers/${layersType[0]}`);
                    const lowerLayers = await apiClient.get(`/wardrobe/lowerLayers/${layersType[layersType.length - 1]}`);
                    setUpperLayers(upperLayers.data);
                    setLowerLayers(lowerLayers.data);
                    setLayers(layers);
                    setLayersType(layersType);
                    console.log(layersType);
                    console.log(layers);
                    setCarouselIndex(carouselIndex);
                } catch (e) {
                    console.log(e);
                }
            };
            getLayers();
        }
    }, []);

    return (
        <div className='row col-10 offset-1'>
            {upperLayers.length > 0 ? (
                <>
                    <Button variant="secondary" className='mb-1' onClick={() => handleShow(false)}>
                        <FiPlus size={30} />
                    </Button>
                </>
            ) : (
                <>
                </>
            )}
            {layers.map((layer, index) => (
                <div key={"d"+index} style={{position : 'relative'}} >
                    <Button key={"k"+index} variant="danger" size="sm"
                        style={{ position: 'absolute', top: 0, right: 0 }}
                        onClick={() => {handleDeleteLayer(index)}}
                    >
                        <FiX key={"f"+index} size={10}/>
                    </Button>

                    <Carousel key={index} clothes={layer} type={layersType[index]}
                        handleChange={(clohingIndex) => {
                            carouselIndex[index] = clohingIndex;
                        }} />
                </div>
            ))}
            {lowerLayers.length > 0 ? (
                <>
                    <Button variant="secondary" className='mt-1' onClick={() => handleShow(true)}>
                        <FiPlus size={30} />
                    </Button>
                </>
            ) : (
                <>
                </>
            )}
            <Button onClick={handleSave} className='col-4 offset-4 mt-3 circular-button'>SAVE</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Adding a {lower ? "lower" : "upper"} layer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="formGridType">
                            <Form.Label column sm={2}>Layer</Form.Label>
                            <Col sm={10}>
                                <Form.Select onChange={(e) => setLayer(e.target.value)}
                                    defaultValue={lower ? lowerLayers[0] : upperLayers[0]}>
                                    {lower ? (
                                        Array.isArray(lowerLayers) && lowerLayers.map((l, i) => (
                                            <option key={i}>{l}</option>
                                        ))
                                    ) :
                                        (
                                            Array.isArray(upperLayers) && upperLayers.map((l, i) => (
                                                <option key={i}>{l}</option>
                                            ))
                                        )}

                                </Form.Select>
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => { lower ? addLowerLayer() : addUpperLayer() }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>


    );
}

export default Outfit;