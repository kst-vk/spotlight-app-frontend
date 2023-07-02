import { Streamer } from "../utils/Types";

const url = "http://localhost:8000";

export async function getAllStreamers() {
  return customFetch(url + "/streamers", "GET");
}

export async function getStreamer(id: string) {
  return customFetch(url + "/streamer/" + id, "GET");
}

export function addStreamer(streamer: Streamer) {
  return customFetch(url + "/streamers", "POST", streamer);
}

export function upvoteStreamer(id: string) {
  return customFetch(url + "/streamers/" + id + "/vote", "PUT", {
    type: "upvote",
  });
}

export function downvoteStreamer(id: string) {
  return customFetch(url + "/streamers/" + id + "/vote", "PUT", {
    type: "downvote",
  });
}

async function customFetch(url: string, method: string, body?: object) {
  const response = await fetch(url, {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const result = await response.json();
  return result;
}
