import joinUrl from "utils/join-url";
import { getUid } from "./auth";
import { restApiUrl } from "./url";

function toUrlEncoded(data: object) {
  return Object.entries(data)
    .map((entry) => `${entry[0]}=${entry[1]}`)
    .join("&");
}

function toMuiltipart(data: object) {
  const formData = new FormData();
  Object.entries(data).forEach((entry) => formData.append(entry[0], entry[1]));
  return formData;
}

type PostContentType = "urlencoded" | "multipart";

export async function post(url: string, data: object, type: PostContentType = "urlencoded") {
  const headers: RequestInit["headers"] = {
    Authorization: "Bearer " + getUid(),
  };
  let body: string | FormData;

  if (type === "urlencoded") {
    headers["Content-Type"] = "application/x-www-form-urlencoded";
    body = toUrlEncoded(data);
  } else if (type === "multipart") {
    body = toMuiltipart(data);
  } else {
    throw new Error(`unknown content type '${type}'`);
  }

  const res = await fetch(joinUrl(restApiUrl, url), {
    method: "POST",
    body,
    headers,
  });
  return await res.json();
}
