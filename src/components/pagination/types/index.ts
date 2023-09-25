export type TVmPaginationPage = number;
export type TVmPaginationCount = number;
export type TVmPaginationCountOnPage = number;

export interface IVmPaginationProps {
  page: TVmPaginationPage;
  count: TVmPaginationCount;
  countOnPage: TVmPaginationCountOnPage;
}
