import React, { useState, useEffect } from 'react';
import NavBar from './secondary/NavBar';
import Outfit from './secondary/Outfit';
import './styles/Home.css';
import { IoRestaurantSharp } from "react-icons/io5";
import { MdFamilyRestroom } from "react-icons/md";
import { GiBalloons, GiBigDiamondRing } from "react-icons/gi";
import { PiPants } from "react-icons/pi";
import { FaClock } from "react-icons/fa";
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const Home = () => {
    const apiUrl = process.env.REACT_APP_API_URL;

    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [clothes, setClothes] = useState([]);
    const [date, setDate] = useState(new Date());

    const [categories, setCategories] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const answer = await axios.get(`${apiUrl}outfit/categories`);
                setCategories(answer.data);
            } catch (e) {
                console.log(e);
            }
        };
        getCategories();
    }, [apiUrl]);

    const sendOutfit = async () => {
        if (name === '') setName('Outfit');
        if (category === '') setCategory('CASUAL');
        const clothesIds = clothes.map(clothes => clothes.id);
        const outfitData = {
            name: name,
            category: category,
            clothesIds: clothesIds
        }
        await axios.post(`${apiUrl}outfit`, outfitData)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
        handleClose();
    }
    return (
        <div className='col-12'>
            <div className='col-12'>
                <NavBar />
                <NavBar />
            </div>
            <div className='row col-12 p-0 m-0'>
                <div className='col-8 offset-2 col-sm-6 offset-sm-3 col-md-4 offset-md-4 col-lg-3 offset-lg-2 mt-2'>
                    <Outfit makeOutfit={true}
                        handleSubmmit={(clothes) => {
                            setClothes(clothes);
                            handleShow();
                        }} />
                    <Outfit makeOutfit={true}
                        handleSubmmit={(clothes) => {
                            setClothes(clothes);
                            handleShow();
                        }} />
                </div>
                <div className='col-8 offset-2 col-sm-6 offset-sm-3 col-md-4 offset-md-4 col-lg-3   offset-lg-2 mt-5'>
                    <div className='col-12   mb-2 p-3 recommendations'>
                        <div className='col-12   mb-2 p-3 recommendations'>
                            <p><b>Recommendations</b></p>
                            <a href="/Community" className="custom-link"><b><IoRestaurantSharp size={24} /> BBQ</b></a>
                            <a href="/Community" className="custom-link"><b><MdFamilyRestroom size={24} /> Familiy</b></a>
                            <a href="/Community" className="custom-link"><b><GiBalloons size={24} /> Festival</b></a>
                            <a href="/Community" className="custom-link"><b><IoRestaurantSharp size={24} /> BBQ</b></a>
                            <a href="/Community" className="custom-link"><b><MdFamilyRestroom size={24} /> Familiy</b></a>
                            <a href="/Community" className="custom-link"><b><GiBalloons size={24} /> Festival</b></a>
                        </div>
                        <div className='col-12 mb-2 p-3 recommendations'>
                            <div className='col-12 mb-2 p-3 recommendations'>
                                <p><b>Community Ideas</b></p>
                                <a href="/Community" className="custom-link"><b><PiPants size={24} /> Bottoms</b></a>
                                <a href="/Community" className="custom-link"><b><GiBigDiamondRing size={24} /> Wedding Time</b></a>
                                <a href="/Community" className="custom-link"><b><FaClock size={24} /> Upcoming Events</b></a>
                                <a href="/Community" className="custom-link"><b><PiPants size={24} /> Bottoms</b></a>
                                <a href="/Community" className="custom-link"><b><GiBigDiamondRing size={24} /> Wedding Time</b></a>
                                <a href="/Community" className="custom-link"><b><FaClock size={24} /> Upcoming Events</b></a>
                            </div>
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
                                    {clothes.map((clothes, i) => (
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
                                            {categories.map((category, i) => (
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
