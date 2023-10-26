export interface IQuery {
  page: string;
  limit: string;
  [key: string]: string;
  sortedBy: string;
}

export interface IPaginationResponse<T> {
  page: number;
  limit: number;
  itemsFound: number;
  data: T[];
}
