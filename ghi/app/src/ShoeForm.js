import React, { useState, useEffect } from 'react';

function ShoeForm({getShoes}){
    const [bins, setBins] = useState([])
    const [manufacturer, setManufacturer] = useState('')
    const [modelName, setModelName] = useState('')
    const [color, setColor] = useState('')
    const [pictureUrl, setPictureUrl] = useState('')
    const [bin, setBin] = useState('')



    async function fetchBins()  {
        const url = 'http://localhost:8100/api/bins/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setBins(data.bins)
        }
    }
    useEffect(() => {
        fetchBins();
    }, [])
    async function handleSubmit(event) {
        event.preventDefault();
        const data = {
            manufacturer,
            model_name : modelName,
            color,
            picture_url: pictureUrl,
            bin,
        }
        const binUrl = "http://localhost:8080/api/shoes/"
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        };
        const response = await fetch(binUrl, fetchConfig);
        if (response.ok) {
            const newShoe = await response.json();
            setManufacturer('')
            setModelName('')
            setColor('')
            setPictureUrl('')
            setBin('')
            getShoes()
        }
    }
    function handleManufacturer(event){
        const {value}= event.target;
        setManufacturer(value)
    }
    function handleModelName(event){
        const {value}= event.target;
        setModelName(value)
    }
    function handleColor(event){
        const {value}= event.target;
        setColor(value)
    }
    function handlePicture(event){
        const {value}= event.target;
        setPictureUrl(value)
    }
    function handleBin(event){
        const {value}= event.target;
        setBin(value)
    }


    return(
        <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new Shoe</h1>
          <form onSubmit={handleSubmit} id="create-conference-form">
            <div className="form-floating mb-3">
              <input value={manufacturer} onChange={handleManufacturer} placeholder="manufacturer" required type="text" name="manufacturer" id="manufacturer" className="form-control" />
              <label htmlFor="manufacturer">Manufacturer</label>
            </div>
            <div className="form-floating mb-3">
              <input value={modelName} onChange={handleModelName} placeholder="Model" required type="text" name="model" id="model" className="form-control" />
              <label htmlFor="modelName">Model</label>
            </div>
            <div className="form-floating mb-3">
              <input value={color} onChange={handleColor} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
              <label htmlFor="color">Color</label>
            </div>
            <div className="form-floating mb-3">
              <input value={pictureUrl} onChange={handlePicture} placeholder="Picture" required type="url" name="pictureUrl" id="pictureUrl" className="form-control" />
              <label htmlFor="pictureUrl">Picture Url</label>
            </div>
            <div className="mb-3">
              <select value={bin} onChange={handleBin} required name="bin" id="bin" className="form-select">
                <option value="">Choose a location</option>
                {bins.map(bin => {
                  return (
                    <option key={bin.id} value={bin.id}>
                      {bin.closet_name}
                    </option>
                  )
                })}
              </select>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default ShoeForm
