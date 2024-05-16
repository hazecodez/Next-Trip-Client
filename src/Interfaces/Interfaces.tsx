export interface LoginType {
  email?: string;
  password?: string;
  name?: string;
  sub?: string;
}

export interface User {
  _id?: string;
  name?: string;
  email?: string;
  image?: string;
  wallet?: number;
  walletHistory?: object[];
  password?: string;
}

export interface Package {
  _id?: string | undefined;
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
  arrival_time?: string;
  book_start: string;
  book_end: string;
  activities: string;
  price: string;
  itinerary: string;
  host?: string;
  is_verified?: boolean;
  images?: string[];
}

export enum Who {
  Traveler = "traveler",
  Host = "host",
}

export interface MessageType {
  sender: string;
  text: string;
  createdAt: Date;
  conversationId: string;
  senderId: string;
}

export interface Conversation {
  _id: string;
  members: string[];
}

export interface pagination {
  currentPage: number;
  setCurrentPage: (value: number) => void;
  totalPages: number;
}

export enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}

export interface BookedTravelers {
  name: string;
  age: number;
}

export interface BookTravelerList {
  name: string;
  age: number;
  gender: string;
}

export interface bookingData {
  name?: string;
  packageId: string | undefined;
  hostId?: string;
  totalPrice: number;
  travelers: BookTravelerList[];
  travelerId?:string;
  status?:string;
  packageName?:string;
}
export interface walletHistory {
  packageName: string;
  travelerName:string;
  amount:number;
  status:string;
  date:string;
}

export interface changePass {
  newPass: string;
  currPass: string;
}

export interface rootReducersType {
  host?: {
    host: User;
  };
  traveler?: {
    traveler: User;
  };
}