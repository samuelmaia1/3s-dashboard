export interface Pageable {
    number: number,
    size: number,
    totalElements: number,
    totalPages: number
}

export interface Filters {
  page: number;
  size: number;
  sort: Sort[];
  name?: string;
}

export type SortDirection = "asc" | "desc";

export interface Sort {
  field: string;
  direction: SortDirection;
}