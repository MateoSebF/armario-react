import React from "react";
import { Button } from "react-bootstrap";
import { useState, useEffect, useRef } from 'react';
import apiClient from '../../services/apiClient';
import { Modal, Form, Row, Col } from 'react-bootstrap';
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import './Sections.css';
import '../../i18n';
import { useTranslation } from 'react-i18next';


const Sections = ({ handleLayersTypes }) => {
    const { t } = useTranslation();

    const [layersType, setLayersType] = useState([]);
    const [upperLayers, setUpperLayers] = useState([]);
    const [lowerLayers, setLowerLayers] = useState([]);
    const [show, setShow] = useState(false);
    const [lower, setLower] = useState(false);
    const [layer, setLayer] = useState('');

    const isInitialMount = useRef(true);

    const handleClose = () => setShow(false);
    const handleShow = (lower) => { setLower(lower); setShow(true); }

    const addUpperLayer = async () => {
        try {
            var layerT = layer;
            if (layerT === '') layerT = upperLayers[0];
            await apiClient.post(`/wardrobe/upperLayers/${layerT}`)
                .then((response) => {
                    isInitialMount.current = true;
                    handleLayersTypes(response.data.map(layer => layer));
                    setShow(false);
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
                    isInitialMount.current = true;
                    handleLayersTypes(response.data.map(layer => layer));
                    setShow(false);
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
                    isInitialMount.current = true;
                    handleLayersTypes(response.data.map(layer => layer));
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
                    const layersTypes = await apiClient.get('/wardrobe/layersTypes');
                    console.log(layersTypes);
                    const layersType = layersTypes.data.map(layer => layer);
                    const upperLayers = await apiClient.get(`/wardrobe/upperLayers/${layersType[0]}`);
                    const lowerLayers = await apiClient.get(`/wardrobe/lowerLayers/${layersType[layersType.length - 1]}`);
                    setUpperLayers(upperLayers.data);
                    setLowerLayers(lowerLayers.data);
                    setLayersType(layersType);
                    handleLayersTypes(layersType);

                } catch (e) {
                    console.log(e);
                }
            };
            getLayers();
        }
    }, [handleLayersTypes]);
    return (
        <div className="recommendations">
            <p className='m-3'><b>{t('Your layers')}</b></p>
            {upperLayers.length > 0 &&
                <Button onClick={() => handleShow(false)} className="mb-3 mx-3 adding" size='sm'>
                    {t('Add upper layer')}
                </Button>
            }
            {layersType.map((layer, i) => (
                <div key={i} className="section d-flex align-items-center justify-content-between mx-3 mb-3">
                    <p className="text-sections m-0"><b>{t('Layer name')}: </b>{layer.toLowerCase()}</p>
                    <div className="icons">
                        <button onClick={() => handleDeleteLayer(i)} className="buttonT">
                            <FaRegTrashAlt color="#A4826D" className="mx-1" />
                        </button>
                        <a href={`/Wardrobe/FormGetClothing?type=${layer}`}>
                            <FaPlus color="#A4826D" />
                        </a>
                    </div>
                </div>
            ))}
            {lowerLayers.length > 0 &&
                <Button onClick={() => handleShow(true)} className="mb-3 mx-3 adding" size='sm'>
                    {t('Add lower layer')}
                </Button>
            }
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{t('Adding a')} {lower ? t('lower layer') : t('upper layer')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="formGridType">
                            <Form.Label column sm={2}>{t('Layer')}</Form.Label>
                            <Col sm={10}>
                                <Form.Select onChange={(e) => setLayer(e.target.value)}
                                    defaultValue={lower ? lowerLayers[0] : upperLayers[0]}>
                                    {(lower ? lowerLayers : upperLayers).map((l, i) => (
                                        <option key={i} value={l}>{l}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('Close')}
                    </Button>
                    <Button variant="primary" onClick={() => { lower ? addLowerLayer() : addUpperLayer() }}>
                        {t('Save Changes')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
    
};

export default Sections;