import React from "react";
// import Home from './Home'
import { useState } from "react";

const App = () => {
  const [input, setInput] = useState("");
  const [word, setWord] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    const getDefinition = async () => {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`);
      const data = await response.json();
      setWord(data[0]);
      console.log(word);
    };
    getDefinition();
    setInput("");
  };
  return (
    <>
      <section className="max-w-2xl mx-auto p-5">
        <h1
          className="text-3xl text-slate-800
        font-bold mb-8  text-center"
        >
          Dictionary
        </h1>
        <form onSubmit={handleSubmit} autoComplete="off">
          <input
            onChange={(e) => setInput(e.target.value)}
            className="py-2 px-4 border-b-2 border-blue-600 outline-none focus:border-blue-800 transition w-full text-lg  lg:text-3xl"
            type="search"
            name="search"
            id="search"
            placeholder="Search word"
            required
            value={input}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white text-xl lg:text-2xl py-2 px-4 rounded shadow mt-4 hover:bg-blue-800 transition-all duration-200"
          >
            Look Up definition
          </button>
        </form>
        {word && (
          <div className="mt-20">
            <h2 className="capitalize text-slate-700 font-bold text-5xl ">
              {word.word}
              <span className="text-xl text-slate-500 inline-block ml-4">{word.phonetic}</span>
            </h2>
            <ul className="mt-8 flex-col gap-4">
              {word.phonetics.map((phonetic, index) => (
                <React.Fragment key={index}>
                  <li className="font-bold  text-lg text-slate-500 ">{phonetic.text}</li>
                  <audio controls>
                    <source src={phonetic.audio} />
                  </audio>
                </React.Fragment>
              ))}
            </ul>

            <ol className="my-10  flex-col">
              {word.meanings.map((meaning, index) => (
                <div className="mt-8"
                 key={index}>
                  <li className="font-bold  text-lg text-slate-500">{meaning.partOfSpeech}</li>
                  <>
                    {meaning.definitions.map((definition, index) => (
                      <li 
                      className="text-xl lg:text-2xl mt-3"
                      style={{color:" #333"}}
                      key={index}>{definition.definition}


                      {definition.example &&
                      <small className="text-lg 
                      lg:text-xl block text-slate-400 ">
                       Example:{definition.example}
                      </small>
                      }
                      
                      
                      </li>
                    ))}
                  </>

                  <ul className="flex items-center justify-start flex-wrap gap-4">
                  {meaning.synonyms.map((synonym, index) =>(
                    <li key={index}
                    className="bg-slate-200 py-2
                    px-3 rounded shadow text-sm mt-4"
                    >
                {synonym}
                    </li>
                  ))}
                  </ul>
                </div>
              ))}
            </ol>
          </div>
        )}
      </section>
    </>
  );
};

export default App;
