import { useEffect, useState } from 'react';
import './hatlist.css';

function HatList() {
  const [hats, setHats] = useState([])
  const [image_url, setImageUrl] = useState('');

  const getData = async () => {
    const response = await fetch('http://localhost:8090/api/hats');

    if (response.ok) {
      const data = await response.json();
      setHats(data.hats)
    }
  };

  const handleDelete = async (hatToDelete) => {
    const response = await fetch(`http://localhost:8090/api/hats/${hatToDelete.id}`,{
      method:"DELETE",

    });

    if(response.ok) {
      setHats(delHats => delHats.filter(hat => hat.id != hatToDelete.id))

    }
  };

  useEffect(()=>{
    getData()
  },[])

  return (
    <div className="image-table-container">
      <div className="image-table">
        {hats.map((hat) => (
          <div className="hat-card" key={hat.id}>
            <img src={hat.image_url} alt={hat.style_name} />
            <table>
              <tbody>
                <tr>
                  <td>Style Name:</td>
                  <td>{hat.style_name}</td>
                </tr>
                <tr>
                  <td>Location:</td>
                  <td>{hat.location}</td>
                </tr>
                <tr>
                  <td>Color:</td>
                  <td>{hat.color}</td>
                </tr>
                <tr>
                  <td>Fabric:</td>
                  <td>{hat.fabric}</td>
                </tr>
              </tbody>
            </table>
            <button onClick={() => handleDelete(hat)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HatList;