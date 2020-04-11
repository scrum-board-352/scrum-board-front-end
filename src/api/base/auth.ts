import { getApiMappingName } from "./api-name-mapping";
import { post } from "./fetch";

type ApiCallFunc = (...args: any[]) => any;

interface AuthParams {
  projectId?: string;
  teamId?: string;
}

const apiUrl = process.env.REACT_APP_REST_API_URL;
if (!apiUrl) {
  throw new Error("'REACT_APP_REST_API_URL' not set!");
}

const authUrl = apiUrl + "/checkAuth";

let uidCache: string = "";

function setUid(uid: string) {
  uidCache = uid;
  window.localStorage.setItem("uid", uid);
}

export function getUid() {
  if (!uidCache) {
    const uid = window.localStorage.getItem("uid");
    if (uid) {
      uidCache = uid;
    }
  }
  return uidCache;
}

export default async function auth<T extends ApiCallFunc>(
  authParams: AuthParams | null,
  apiCall: T,
  ...apiParams: Parameters<T>
): Promise<ReturnType<T>> {
  // register oparetion through RESTful api.
  const res = await post(authUrl, {
    ...authParams,
    functionName: getApiMappingName(apiCall),
  });
  if (!res.success) {
    // window.location.replace("/login");
    throw new Error(res.message);
  }
  // set global uid.
  if (res.uid) {
    setUid(res.uid);
  }
  // call graphql api.
  return await apiCall(...apiParams);
}