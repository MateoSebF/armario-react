import React, { useState, useEffect, useRef } from 'react';
import NavBar from '../../components/Navbar/NavBar';
import Outfit from '../../components/Outfit/Outfit';
import './Home.css';
import { IoRestaurantSharp } from "react-icons/io5";
import { MdFamilyRestroom } from "react-icons/md";
import { GiBalloons, GiBigDiamondRing } from "react-icons/gi";
import { PiPants } from "react-icons/pi";
import { FaClock } from "react-icons/fa";
import apiClient from '../../services/apiClient';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// This component is the main page of the application, it shows the navbar and the outfit component.
const Home = () => {

    // This state is used to show the modal to create an outfit.
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // These states are used to store the data of the outfit.
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
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
                    const answer = await apiClient.get('/outfit/categories?isStatic=true');
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
            <div className='row col-12 p-0 m-0'>
                <div className='col-8 offset-2 col-sm-6 offset-sm-3 col-md-4 offset-md-4 col-lg-3 offset-lg-2 mt-5'>
                    <Outfit
                        handleSubmmit={(clothes) => {
                            setClothes(clothes);
                            handleShow();
                        }} />
                </div>
                <div className='col-8 offset-2 col-sm-6 offset-sm-3 col-md-4 offset-md-4 col-lg-3   offset-lg-2 mt-5'>
                    <div className='col-12'>
                        <div className='col-12   mb-2 p-3 recommendations'>
                            <p><b>Recommendations</b></p>
                            <a href="/Community" className="custom-link"><b><IoRestaurantSharp size={24} /> BBQ</b></a>
                            <a href="/Community" className="custom-link"><b><MdFamilyRestroom size={24} /> Familiy</b></a>
                            <a href="/Community" className="custom-link"><b><GiBalloons size={24} /> Festival</b></a>
                        </div>
                        <div className='col-12 mb-2 p-3 recommendations'>
                            <p><b>Community Ideas</b></p>
                            <a href="/Community" className="custom-link"><b><PiPants size={24} /> Bottoms</b></a>
                            <a href="/Community" className="custom-link"><b><GiBigDiamondRing size={24} /> Wedding Time</b></a>
                            <a href="/Community" className="custom-link"><b><FaClock size={24} /> Upcoming Events</b></a>
                        </div>
                    </div>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Creating a outfit</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <h3>Outfit preview</h3>
                                <div className='col-4 offset-4'>
                                    {Array.isArray(clothes) && clothes.map((clothes, i) => (
                                        <img key={i} src={`data:image/jpeg;base64,${clothes.image}`} alt="" className="custom-carousel-image" />
                                    ))}
                                </div>
                            </div>
                            <Form>
                                <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
                                    <Form.Label column sm={2}>Name</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control onChange={(e) => setName(e.target.value)}
                                            type="text" placeholder="Name" />
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
            </div>
        </div>
    );
}

export default Home;
