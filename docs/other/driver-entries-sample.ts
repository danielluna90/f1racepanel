interface Driver {
  name: string,
  dob: string, // yyyy-mm-dd
  nationality: string, // Two letter country code
}

interface Result {
  car_number: number,
  position: number,
}

interface WeekendSession {
  session_number: number,
  session_status: "Unknown" | "Active" | "Future" | "Completed" | "Canceled",

  driver_entries: DriverEntry[],

  gp_weekend_id: string // Maps to Grand Prix Weekend

  results: Result[] // We will use car number to get result.
}

interface DriverEntry {
  driver_id: string, // Maps to Driver
  weekend_session: WeekendSession[], // Maps to Session

  car_number: string // This is the car number they part-took in the session with
};


// Note: So, you will have an array of DriverEntry objects which will all be for one specific driver.
// This will map to every session they ever participated. This is because there are drivers is might
// of participated in a practice session but not a Grand Prix Race. The way you would get all of the
// race results for a driver given an array of all of their DriverEntries is to iterate through the 'weekend_session'
// array of all of the DriverEntries. Then you assume there is a way to get back all of the grand-prix sessions
// only (there will be in the future). From there it is a case of displaying the results in order. You
// can assume you will have access ot all of these interfaces.
