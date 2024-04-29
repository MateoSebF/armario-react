import React, { useState } from 'react';
import axios from 'axios';

function FormGetClothing() {
    const [id, setId] = useState(null);
    const [name, setName] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [color, setColor] = useState(null);
    const [size, setSize] = useState(null);
{/*const [wadrobesIds, setWadrobesIds] = useState(null);*/}
{/*const [outfitIds, setOutfitIds] = useState(null);*/}

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (selectedFile) {
            const reader = new FileReader();
            reader.readAsArrayBuffer(selectedFile);
            reader.onloadend = () => {
                const imageData = reader.result;
                const clothingData = {
                    id: id,
                    name: name,
                    image: Array.from(new Uint8Array(imageData)),
                    color: color,
                    size: size,
                    wardrobeIds: [],
                    outfitIds: []
                };
                const url = "backweb.azurewebsites.net";
                axios.post(url, clothingData)
                    .then(response => {
                        console.log(response.data);
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
        <div className='col-6 offset-3 text-center'>
            <h2>Submmit clothing</h2>
            <form onSubmit={handleSubmit}>
                <div className = 'row'>
                    <input type="text" className='col-4 offset-4 mt-2 text-center' onChange={(e) => setId(e.target.value)} 
                    required='true' placeholder="Id"></input>
                    <input type="text" className='col-4 offset-4 mt-2 text-center'  onChange={(e) => setName(e.target.value)} 
                    required='true' placeholder="Name"></input>
                    <input type="file" className='col-4 offset-4 mt-2 text-center'  onChange={handleFileChange} accept="image/*" />
                    <input type="text" className='col-4 offset-4 mt-2 text-center'  onChange={(e) => setColor(e.target.value)} 
                    required='true' placeholder="Color"></input>
                    <input type="text" className='col-4 offset-4 mt-2 text-center'  onChange={(e) => setSize(e.target.value)} 
                    required='true' placeholder="Size"></input>
                    <button type="submit" className='col-4 offset-4 mt-2 text-center' >Submmit</button>
                </div>
                
            </form>
        </div>
    );
}

export default FormGetClothing;