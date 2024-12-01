import { getSecret } from "astro:env/server";
import { ResponseTypes } from "f1racepanel-server";

export const getAllDrivers = async (): Promise<ResponseTypes.Driver[]> => {
  let rv: ResponseTypes.Driver[] = [];

  const API_URL = getSecret("API_URL");
  const API_DRIVERS_URL = `${API_URL}/search/drivers`;
  
  let complete: boolean = false;
  let url: string = API_DRIVERS_URL;
  
  while (!complete) {
    const rawRes = await fetch(url);

    if (rawRes.status != 200) {
      break;
    }

    const resJSON = await rawRes.json();
    const res = ResponseTypes.Drivers.parse(resJSON);
  
    rv.push(...res.items);
  
    if (res.next == null) {
      complete = true;
    } else {
      url = res.next;
    }
  }

  return rv;
}

export const toDriverPath = (name: string): string => {
  return name.toLowerCase().replace(" ", "-");
}
