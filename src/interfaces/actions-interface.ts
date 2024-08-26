export interface PaginatedRequest {
  take?: number;
  page?: number;
}

export interface PaginatedResponse<T> {
  current: number;
  total: number;
  data: T[];
}
