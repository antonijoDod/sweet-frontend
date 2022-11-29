export type TPaginationDetails = {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
};

export type TPagination = {
    pagination: TPaginationDetails;
};
