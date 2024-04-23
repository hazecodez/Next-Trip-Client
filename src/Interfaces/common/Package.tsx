interface Package {
  _id?:string|undefined;
  name: string;
  capacity: string;
  destination: string;
  dur_start: string;
  dur_end: string;
  stay: string;
  room_type: string;
  amenities: string;
  food: string;
  depa_airport?: string;
  depa_time?: string;
  arrival_airport?: string;
  arrival_time?:string;
  book_start: string;
  book_end: string;
  activities: string;
  price: string;
  itinerary: string;
  host?:string;
  is_verified?:boolean;
  images?: string[];
}

export default Package;
