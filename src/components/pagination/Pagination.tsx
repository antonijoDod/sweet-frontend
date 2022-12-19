import React, { ReactElement } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import ReactPaginate from "react-paginate";
import { Box } from "@chakra-ui/react";
import styles from "./pagination.module.css";

type TPaginationProps = {
    pageCount: number;
    onPageChange: (selectedPageId: number) => void;
};

const Pagination = ({
    pageCount,
    onPageChange,
}: TPaginationProps): ReactElement => {
    const handlePageClick = (event: { selected: number }) => {
        onPageChange(event.selected + 1);
    };

    return (
        <Box display="flex" w="full">
            <ReactPaginate
                breakLabel="..."
                previousLabel={<HiChevronLeft />}
                nextLabel={<HiChevronRight />}
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                // @ts-ignore
                renderOnZeroPageCount={null}
                containerClassName={styles.container}
                pageLinkClassName={styles.pagination__link}
                previousLinkClassName={styles.pagination__link__prev}
                nextLinkClassName={styles.pagination__link__next}
                disabledClassName={styles.pagination__link_disabled}
                activeClassName={styles.pagination__link__active}
            />
        </Box>
    );
};

export default Pagination;
