import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import {variables} from "./variables";
import {Item} from "./types";

function App() {
  const [data, setData] = useState<Item[]>([]);

  useEffect(() => {
    axios.get(variables.API_URL)
        .then(response => {
          setData(response.data);
            console.log(response.data);
        })
        .catch(error => {
          console.log(error)
        });
  }, []);

  return (
      <ul>
          {data.map(Item => (
              <li key={Item.id}>{Item.date}</li>
          ))}
      </ul>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
