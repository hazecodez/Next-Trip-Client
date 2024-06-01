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
  walletHistory?: WalletHistoryItem[];
  password?: string;
}

interface WalletHistoryItem {
  status: string;
  travelerName?: string;
  packageName: string;
  amount: number;
  date: string;
}

export interface PackageType {
  _id?: string | undefined;
  name?: string;
  capacity?: number;
  destination?: string;
  dur_start?: string;
  dur_end?: string;
  stay?: string;
  room_type?: string;
  amenities?: string;
  food?: string;
  depa_airport?: string;
  depa_time?: string;
  arrival_airport?: string;
  arrival_time?: string;
  book_start?: string;
  book_end?: string;
  activities?: string;
  price?: number;
  itinerary?: string;
  host?: string;
  is_verified?: boolean;
  images?: string[];
}

export enum Who {
  Traveler = "traveler",
  Host = "host",
}

export interface MessageType {
  sender?: string;
  senderName?: string;
  text?: string;
  createdAt?: Date;
  conversationId?: string;
  senderId?: string;
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
  _id?: string;
  name?: string;
  packageId: string | undefined;
  hostId?: string;
  totalPrice: number;
  travelers: BookTravelerList[];
  travelerId?: string;
  status?: string;
  packageName?: string;
  cancelDate?: string;
  startDate?: string;
  endDate?: string;
  method?:string;
}
export interface walletHistory {
  packageName: string;
  travelerName: string;
  amount: number;
  status: string;
  date: string;
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

export interface Blog {
  _id?: string;
  liked?: boolean;
  caption: string;
  location: string;
  experience: string;
  image?: string;
  time?: Date;
  liked_users?: string[];
  comments?: comments[];
  userId?: string;
  userName?: string;
  isBlocked: boolean;
}

export interface comments {
  senderId?: string;
  comment?: string;
  time?: string;
}

export interface UserData {
  host?: {
    host: User;
  };
  traveler?: {
    traveler: User;
  };
}

export interface CallDetails {
  username: string;
  roomId: string;
}
interface Segment {
  departure: {
    at: string;
    iataCode: string;
  };
  arrival: {
    at: string;
    iataCode: string;
  };
  duration: string;
}

interface Itinerary {
  segments: Segment[];
}

interface Price {
  grandTotal: string;
}

export interface FlightData {
  price: Price;
  itineraries: Itinerary[];
  lastTicketingDate: string;
}

interface Address {
  countryCode: string;
  // Add other address-related properties if needed
}

interface Distance {
  value: number;
  unit: string;
  // Add other distance-related properties if needed
}

interface GeoCode {
  latitude: string;
  longitude: string;
  // Add other geoCode-related properties if needed
}

export interface Hotel {
  name: string;
  address: Address;
  distance: Distance;
  geoCode: GeoCode;
  // Add other properties if needed
}