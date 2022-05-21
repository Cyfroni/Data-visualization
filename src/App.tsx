import axios from "axios";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { VictoryPie } from "victory";
import "./App.css";

const client = axios.create({
  baseURL: "https://anime-facts-rest-api.herokuapp.com/api/v1",
});

interface Anime {
  anime_id: number;
  anime_name: string;
  anime_img: string;
}

interface Fact {
  fact_id: number;
  fact: string;
}

function App() {
  const [animeList, setAnimeList] = useState([] as Anime[]);
  const [animeName, setAnimeName] = useState("bleach");
  const [animeFacts, setAnimeFacts] = useState([] as Fact[]);
  const [countedLetter, setCountedLetter] = useState("e");

  const loadAnimeList = async () => {
    const response = await client.get("/");
    setAnimeList(response.data.data);
  };

  const loadAnimeQuotes = async (animeName: string) => {
    const response = await client.get("/" + animeName);
    setAnimeFacts(response.data.data);
  };

  useEffect(() => {
    loadAnimeList();
  }, []);

  useEffect(() => {
    loadAnimeQuotes(animeName);
  }, [animeName]);

  // console.log(animeFacts);

  const lengthToQuantityMap = {} as { [length: number]: number };

  animeFacts.forEach(({ fact }) => {
    const match = fact.match(new RegExp(countedLetter, "gi"));
    const length = match ? match.length : 0;
    const quantity = lengthToQuantityMap[length];
    lengthToQuantityMap[length] = quantity ? quantity + 1 : 1;
  });

  console.log(lengthToQuantityMap);

  const data = [] as { x: string; y: number }[];

  Object.keys(lengthToQuantityMap).forEach((key) =>
    data.push({ x: key, y: lengthToQuantityMap[parseInt(key)] })
  );

  return (
    <div className="App">
      <Form.Select
        aria-label="Default select"
        onChange={(event) => setAnimeName(event.target.value)}
      >
        {animeList.map(({ anime_id, anime_name }) => (
          <option key={anime_id} value={anime_name}>
            {anime_name}
          </option>
        ))}
      </Form.Select>
      <Form.Select
        aria-label="Default select"
        onChange={(event) => setCountedLetter(event.target.value)}
      >
        {["e", "a", "r", "i", "o", "t", "n", "s"].map((letter) => (
          <option key={letter} value={letter}>
            {letter}
          </option>
        ))}
      </Form.Select>
      <VictoryPie data={data} />
    </div>
  );
}

export default App;
