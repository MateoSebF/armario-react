import React, { useState, useEffect, useRef } from 'react';
import NavBar from '../../components/Navbar/NavBar';
import Outfit from '../../components/Outfit/Outfit';
import './Home.css';
import apiClient from '../../services/apiClient';
import Modal from 'react-bootstrap/Modal';
import { Button, Form, Row, Col } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Sections from '../../components/Outfit/Sections';
import { CgProfile } from "react-icons/cg";
import InputGroup from 'react-bootstrap/InputGroup';

// This component is the main page of the application, it shows the navbar and the outfit component.
const Home = () => {
    // This state is used to show the modal to create an outfit.
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [layersTypes, setLayersTypes] = useState([]);

    // These states are used to store the data of the outfit.
    const [name, setName] = useState('');
    const [category, setCategory] = useState('WINTER');
    const [clothes, setClothes] = useState([]);
    const [date, setDate] = useState(new Date());

    // This state is used to store the categories of the outfits.
    const [categories, setCategories] = useState([]);
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            const getCategories = async () => {
                try {
                    const answer = await apiClient.get('/outfit/categories');
                    console.log(answer.data);
                    setCategories(answer.data);
                } catch (e) {
                    console.log(e);
                }
            };
            getCategories();
        }
    }, []);

    // This function is used to send the outfit to the backend.
    const sendOutfit = async () => {
        // If the name or the category are empty, they are set to default values.
        console.log(name);
        if (name === '') setName('Casual Outfit');
        if (category === '') setCategory('CASUAL');
        // The clothes ids are stored in an array.
        const clothesIds = clothes.map(clothes => clothes.id);
        const outfitData = {
            name: name,
            category: category,
            clothesIds: clothesIds
        }
        // The outfit is sent to the backend.
        await apiClient.post('/outfit', outfitData)
            .then(response => {
                const params = {
                    date: date,
                    outfitId: response.data.id
                }
                // The outfit is added to the user's calendary.
                apiClient.post('/day/user', params)
                    .then(response => {
                        console.log(response.data);
                    }
                    )
                    .catch(error => {
                        console.log(error);
                    }
                    );
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
        // The modal is closed.
        handleClose();
    }
    return (
        <div className='col-12'>
            <div className='col-12'>
                <NavBar />
            </div>
            <div className='col-10 offset-1 col-lg-7 offset-lg-1 d-flex mt-4 mb-3'>
                <CgProfile className='mx-2' size={40} color='#86654B'/>
                <InputGroup >
                    <Form.Control
                        onChange={(e) => setName(e.target.value)}
                        className='detailsInput'
                        placeholder="Enter the outfit details"
                        aria-label="Enter the outfit details"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>

            </div>
            <div className='row col-12 p-0 m-0'>
                <div className='col-10 offset-1 col-sm-6 offset-sm-3 col-md-4 offset-md-4 col-lg-3 offset-lg-2 mt-0'>
                    <Outfit layersTypes={layersTypes}
                        handleSubmmit={(clothes) => {
                            setClothes(clothes);
                            handleShow();
                        }}
                    />
                </div>
                <div className='col-8 offset-2 col-sm-6 offset-sm-3 col-md-4 offset-md-4 col-lg-3 offset-lg-2 mt-5 recommendations'>
                    <Sections
                        handleLayersTypes={(layers) => {
                            setLayersTypes(layers);
                        }}
                    />

                </div>

            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Creating a outfit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='text-center'>
                        <h3>Outfit preview</h3>
                        <div className='col-4 offset-4'>
                            {Array.isArray(clothes) && clothes.map((clothes, i) => (
                                <img key={i} src={`data:image/jpeg;base64,${clothes.image}`} alt="" className="custom-carousel-image" />
                            ))}
                        </div>
                    </div>
                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
                            <Form.Label column sm={2}>Description</Form.Label>
                            <Col sm={10}>
                                <Form.Control onChange={(e) => setName(e.target.value)}
                                    type="text" value={name} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formGridType">
                            <Form.Label column sm={2}>Category</Form.Label>
                            <Col sm={10}>
                                <Form.Select onChange={(e) => setCategory(e.target.value)}
                                    defaultValue="Select a category...">
                                    {Array.isArray(categories) && categories.map((category, i) => (
                                        <option key={i}>{category}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formGridType">
                            <Form.Label column sm={2}>Date</Form.Label>
                            <Col sm={10}>
                                <DatePicker selected={date} onChange={(date) => setDate(date)} />
                            </Col>
                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={sendOutfit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Home;
