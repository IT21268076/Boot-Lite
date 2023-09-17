import React, { useState, useEffect } from "react";
import axios from "axios";
import '../FootballBootsList.css'

const FootballBootList = () => {
  const [footballBoots, setFootballBoots] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/footballboots").then((response) => {
      setFootballBoots(response.data);
      console.log(response.data)
    });
  }, []);

  const handleAddToCart = (footballBoot) => {
    axios.post("http://localhost:4000/api/cart/add", {
      footballBootId: footballBoot._id,
      quantity: 1,
      
    });
    
  };

  return (
    <ul>
      {footballBoots.map((footballBoot) => (
        <li key={footballBoot._id}>
          {footballBoot.brand} {footballBoot.model} -  $ {footballBoot.price}
          <button onClick={() => handleAddToCart(footballBoot)}>Add to Cart</button>
        </li>
      ))}
    </ul>
  );
};

export default FootballBootList;


