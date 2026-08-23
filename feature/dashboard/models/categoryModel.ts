import { GlobalResponse } from "@/feature/_global/interface/global.interface";

export interface IResGetCategory extends GlobalResponse {
  data: {
    id: string;
    name: string;
  }[];
}
