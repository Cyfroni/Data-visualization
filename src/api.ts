import axios from "axios";

const client = axios.create({
  baseURL: "https://anime-facts-rest-api.herokuapp.com/api/v1",
});

export interface Anime {
  anime_id: number;
  anime_name: string;
  anime_img: string;
}

export const fetchAnimeList = async () => {
  const response = await client.get("/");
  return response.data.data as Anime[];
};

export interface Fact {
  fact_id: number;
  fact: string;
}

export const fetchAnimeFacts = async (animeName: string) => {
  const response = await client.get("/" + animeName);
  return response.data.data as Fact[];
};
