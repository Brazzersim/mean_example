import {Guest} from "./guest.interface";

export interface User {
  name: string;
  email: string;
  guests: Guest[];
}
