import { GlobalResponse } from "@/feature/_global/interface/global.interface";

export interface IResLogin extends GlobalResponse {
  token: string;
  data: {
    username: string;
    name: string;
    email: string;
    userType: string;
  };
}
