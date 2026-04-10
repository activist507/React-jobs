import { type Company } from "./company";

export interface Listing {
  id: string;
  title: string;
  type: string;
  description: string;
  location: string;
  salary: string;
  company: Company;
}