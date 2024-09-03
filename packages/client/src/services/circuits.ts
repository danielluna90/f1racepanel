import { getSecret } from "astro:env/server";
import { ResponseTypes } from "f1racepanel-server";

export const getAllCircuits = async (): Promise<ResponseTypes.Circuit[]> => {
  let rv: ResponseTypes.Circuit[] = [];

  const API_URL = getSecret("API_URL");
  const API_CIRCUITS_URL = `${API_URL}/search/circuits`;

  let complete: boolean = false;
  let url: string = API_CIRCUITS_URL;
  
  while (!complete) {
    const rawRes = await fetch(url);

    if (rawRes.status != 200) {
      break;
    }

    const resJSON = await rawRes.json();
    const res = ResponseTypes.Circuits.parse(resJSON);
  
    rv.push(...res.items);
  
    if (res.next == null) {
      complete = true;
    } else {
      url = res.next;
    }
  }

  return rv;
}
