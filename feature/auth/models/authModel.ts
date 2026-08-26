import { GlobalResponse } from "@/feature/_global/interface/global.interface";

export interface User {
  id?: string;
  username: string;
  name?: string;
  email?: string;
  userType?: string;
}

export interface IResLogin extends GlobalResponse {
  token?: string;
  data: {
    id?: string;
    username: string;
    name?: string;
    email?: string;
    userType?: string;
  };
}
