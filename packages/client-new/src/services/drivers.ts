import { getSecret } from "astro:env/server";
import { DatabaseTypes } from "f1racepanel-common";

export const getAllDrivers = async (): Promise<DatabaseTypes.Driver[]> => {
  let rv: DatabaseTypes.Driver[] = [];

  const API_URL = getSecret("API_URL");
  const API_DRIVERS_URL = `${API_URL}/search/drivers`;
  
  let complete: boolean = false;
  let url: string = API_DRIVERS_URL;
  
  while (!complete) {
    const rawRes = await fetch(url);
    const resJSON = await rawRes.json();
    const res = DatabaseTypes.Drivers.parse(resJSON);
  
    rv.push(...res.items);
  
    if (res.next == null) {
      complete = true;
    } else {
      url = res.next;
    }
  }

  return rv;
}
