export interface GlobalResponse {
  status: string;
  statusCode: number;
  message?: string;
  meta?: {
    totalItems: number;
    totalPages: number;
    currentPage: number | string;
  };
}
