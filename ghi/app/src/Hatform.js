import React, { useState, useEffect } from 'react';
import './hatform.css';

function HatForm(props) {
  const [fabric, setFabric] = useState('');
  const [style_name, setStyleName] = useState('');
  const [color, setColor] = useState('');
  const [image_url, setImageUrl] = useState('');
  const [location, setLocation] = useState('');
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    async function fetchLocations() {
      try {
        const response = await fetch('http://localhost:8100/api/locations');
        if (response.ok) {
          const data = await response.json();
          setLocations(data.locations);
        }
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    }

    fetchLocations();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      fabric,
      style_name,
      color,
      image_url,
      location,
    };

    const hatUrl = 'http://localhost:8090/api/hats/';
    const fetchConfig = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(hatUrl, fetchConfig);
    if (response.ok) {
      const newHat = await response.json();
      setFabric('');
      setStyleName('');
      setColor('');
      setImageUrl('');
      setLocation('');
    }
  }

  function handleFabricChange(event) {
    const { value } = event.target;
    setFabric(value);
  }

  function handleStyleNameChange(event) {
    const { value } = event.target;
    setStyleName(value);
  }

  function handleColorChange(event) {
    const { value } = event.target;
    setColor(value);
  }

  function handleImageUrlChange(event) {
    const { value } = event.target;
    setImageUrl(value);
  }

  function handleLocationChange(event) {
    const { value } = event.target;
    setLocation(value);
  }

  return (
    <div className="background-container">
      <div className="hat-form-container">
        <div className="row">
          <div className="offset-5 col-6 custom-hat-form">
            <div className="shadow p-4 mt-4 custom-hat-form">
              <h1 className="title-create-hat">Create a New Hat</h1>
              <form onSubmit={handleSubmit} id="create-hat-form" className="form-box">
                <div className="form-floating mb-3">
                  <input onChange={handleFabricChange} value={fabric} placeholder="Fabric" required type="text" id="fabric" className="form-control custom-hat-form" />
                  <label htmlFor="fabric">Fabric</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleStyleNameChange} value={style_name} placeholder="Style Name" required type="text" id="style_name" className="form-control custom-hat-form" />
                  <label htmlFor="style_name">Style Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleColorChange} value={color} placeholder="Color" required type="text" id="color" className="form-control custom-hat-form" />
                  <label htmlFor="color">Color</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleImageUrlChange} value={image_url} placeholder="Picture URL" required type="url" id="image_url" className="form-control custom-hat-form" />
                  <label htmlFor="image_url">Picture URL</label>
                </div>
                <div className="form-floating mb-3">
                  <select onChange={handleLocationChange} value={location} required className="form-select custom-hat-form" id="location">
                    <option value="">Choose a location</option>
                    {locations.map(loc => (
                      <option key={loc.id} value={loc.id}>
                        {loc.closet_name}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="location">Location in Wardrobe</label>
                </div>
                <button className="btn btn-primary custom-hat-form">Create</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HatForm;