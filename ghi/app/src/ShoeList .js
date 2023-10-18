import { useEffect, useState } from 'react';

function ShoeList() {
  const [shoes, setShoes] = useState([])

  const getData = async () => {
    const response = await fetch('http://localhost:8080/api/shoes');

    if (response.ok) {
      const data = await response.json();
      setShoes(data.shoes)
    }
  };

  const handleDelete = async (shoeToDelete) => {
    const response = await fetch(`http://localhost:8080/api/shoes/${shoeToDelete.id}`,{
      method:"DELETE",

    });

    if(response.ok) {
      setShoes(delShoes => delShoes.filter(shoe => shoe.id != shoeToDelete.id))

    }
  };

  useEffect(()=>{
    getData()
  },[])

  return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Manufacturer</th>
            <th>Bin </th>
            <th>Model Name</th>
            <th>Color</th>
          </tr>
        </thead>
        <tbody>
          {shoes.map(shoe => {
            return (
              <tr key={shoe.id}>
                <td>{ shoe.manufacturer }</td>
                <td>{ shoe.bin }</td>
                <td>{ shoe.color }</td>
                <td>{ shoe.model_name }</td>
                <td>
                  <button onClick={() => handleDelete(shoe)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  export default ShoeList;
