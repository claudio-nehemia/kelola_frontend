import { GlobalResponse } from "@/feature/_global/interface/global.interface";

export interface UserItem {
  id: string;
  username: string;
  name: string;
  email: string | null;
  phone: string | null;
  role: "Owner" | "Admin" | "Kasir" | string;
  userType?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IResGetUsers extends GlobalResponse {
  data: UserItem[];
}

export interface IResGetUserDetail extends GlobalResponse {
  data: UserItem;
}
