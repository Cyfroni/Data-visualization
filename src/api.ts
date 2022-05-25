import axios from "axios";

const client = axios.create({
  baseURL: "https://breakingbadapi.com/api",
});

export interface Character {
  char_id: number;
  name: string;
}

export const fetchCharacterList = async () => {
  const response = await client.get<Character[]>("/characters");
  return response.data;
};

export interface Quote {
  quote_id: number;
  quote: string;
}

export const fetchCharacterQuotes = async (characterName: string) => {
  const response = await client.get<Quote[]>("/quote", { params: { author: characterName } });
  return response.data;
};
