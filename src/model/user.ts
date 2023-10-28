import { Coffee } from "./coffee";

export interface User {
  _id?: string;
  username?: string;
  email?: string;
  password?: string;
  basket: string[] | Coffee[] 
}
