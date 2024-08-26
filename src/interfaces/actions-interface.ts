export interface PaginatedRequest {
  take?: number;
  page?: number;
}

export interface PaginatedResponse<T> {
  current: number;
  total: number;
  data: T[];
}

export interface ApiResponse<T> {
  ok: boolean;
  value?: T;
  message?: string;
}
