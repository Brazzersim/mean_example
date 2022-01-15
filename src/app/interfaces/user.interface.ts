import {Guest} from "./guest.interface";

export interface User {
  _id: string;
  username: string;
  guests: Guest[];
}
