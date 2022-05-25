import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { VictoryPie } from "victory";
import {
  Character, fetchCharacterList, fetchCharacterQuotes, Quote
} from "./api";

const lettersToChoose = ["e", "a", "r", "i", "o", "t", "n", "s"];

function App() {
  const [characterList, setCharacterList] = useState([] as Character[]);
  const [characterName, setCharacterName] = useState("");
  const [characterQuotes, setCharacterQuotes] = useState([] as Quote[]);
  const [countedLetter, setCountedLetter] = useState(lettersToChoose[0]);

  const loadCharacterList = async () => {
    const characterList = await fetchCharacterList();
    setCharacterList(characterList);
    setCharacterName(characterList[0].name);
  };

  const loadCharacterQuotes = async (characterName: string) => {
    const characterQuotes = await fetchCharacterQuotes(characterName);
    setCharacterQuotes(characterQuotes);
  };

  useEffect(() => {
    loadCharacterList();
  }, []);

  useEffect(() => {
    if (characterName !== "") {
      loadCharacterQuotes(characterName);
    }
  }, [characterName]);

  const lengthToQuantityMap = {} as { [length: number]: number };

  characterQuotes.forEach(({ quote }) => {
    const match = quote.match(new RegExp(countedLetter, "gi"));
    const length = match ? match.length : 0;
    const quantity = lengthToQuantityMap[length];
    lengthToQuantityMap[length] = quantity ? quantity + 1 : 1;
  });

  const data = Object.entries(lengthToQuantityMap).map(([x, y]) => ({ x, y }));
  
  return (
    <div className="container">
      <h1 className="text-center">
        Histogram of letter {countedLetter} in {characterName}'s quotes
      </h1>
      <Row style={{ height: "70vh" }}>
        <Col lg={4} sm={12} className="my-auto">
          <Form.Group className="mb-3">
            <Form.Label>Character</Form.Label>
            <Form.Select
              onChange={(event) => setCharacterName(event.target.value)}
            >
              {characterList.map(({ char_id, name }) => (
                <option key={char_id} value={name}>
                  {name}
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
        <Col className="my-auto">
          {data.length === 0 ? (
            <h2 className="text-center">no quotes to display</h2>
          ) : (
            <VictoryPie data={data} />
          )}
        </Col>
      </Row>
    </div>
  );
}

export default App;
