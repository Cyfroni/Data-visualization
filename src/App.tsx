import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { VictoryPie } from "victory";
import { Anime, Fact, fetchAnimeFacts, fetchAnimeList } from "./api";

const lettersToChoose = ["e", "a", "r", "i", "o", "t", "n", "s"];

function App() {
  const [animeList, setAnimeList] = useState([] as Anime[]);
  const [animeName, setAnimeName] = useState("");
  const [animeFacts, setAnimeFacts] = useState([] as Fact[]);
  const [countedLetter, setCountedLetter] = useState(lettersToChoose[0]);

  const loadAnimeList = async () => {
    const animeList = await fetchAnimeList();
    setAnimeList(animeList);
    setAnimeName(animeList[0].anime_name);
  };

  const loadAnimeFacts = async (animeName: string) => {
    const animeFacts = await fetchAnimeFacts(animeName);
    setAnimeFacts(animeFacts);
  };

  useEffect(() => {
    loadAnimeList();
  }, []);

  useEffect(() => {
    if (animeName !== "") {
      loadAnimeFacts(animeName);
    }
  }, [animeName]);

  const lengthToQuantityMap = {} as { [length: number]: number };

  animeFacts.forEach(({ fact }) => {
    const match = fact.match(new RegExp(countedLetter, "gi"));
    const length = match ? match.length : 0;
    const quantity = lengthToQuantityMap[length];
    lengthToQuantityMap[length] = quantity ? quantity + 1 : 1;
  });

  const data = Object.entries(lengthToQuantityMap).map(([x, y]) => ({ x, y }));

  return (
    <div className="container">
      <h1 className="text-center">
        Histogram of letter {countedLetter} in facts from {animeName} anime
      </h1>
      <Row>
        <Col lg={4} sm={12} className="my-auto">
          <Form.Group className="mb-3">
            <Form.Label>Anime</Form.Label>
            <Form.Select onChange={(event) => setAnimeName(event.target.value)}>
              {animeList.map(({ anime_id, anime_name }) => (
                <option key={anime_id} value={anime_name}>
                  {anime_name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Letter</Form.Label>
            <Form.Select
              onChange={(event) => setCountedLetter(event.target.value)}
            >
              {lettersToChoose.map((letter) => (
                <option key={letter} value={letter}>
                  {letter}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <VictoryPie data={data} />
        </Col>
      </Row>
    </div>
  );
}

export default App;
