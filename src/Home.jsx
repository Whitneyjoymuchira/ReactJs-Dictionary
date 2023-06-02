import React, { useEffect, useState } from "react";
import "./assets/Styles.css";
const Home = () => {
  const [input, setInput] = useState("");
  const [info, setInfo] = useState([]);

  const handleChange = (event) => {
    setInput(event.target.value);
  };
 

  const handleSearch = (e) => {
    e.preventDefault()
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {

const definitions=data[0].meanings.map((meaning)=>{
    meaning.definitions[0].definition
});

          setInfo({
            definition:definitions,
            partsOfSpeech: definitions.partOfSpeech
          });
        } else {
          setInfo("hi");
        }
        console.log(info);
      });

    console.log(info);
  };

  return (
    <>
      <h2 className="header">Dictionary</h2>

      <form>
        <input type="text" placeholder="Type word" onChange={handleChange} />
        <button className="btn" onClick={handleSearch}>
          Look Up Definition
        </button>
      </form>
      {info.length >0  && (
        <div>
            {info.map((definition,index,partOfSpeech)=>{
                <>
                 <h3 key= {index}>{partOfSpeech}</h3>
                 <p>{definition}</p>
                </>
               
               
            })}
        </div>
      )} 
    </>
  );
};

export default Home;
