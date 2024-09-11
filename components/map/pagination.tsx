import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  _pagination: kakao.maps.Pagination;
}

export const CustomPagination = ({ _pagination }: PaginationProps) => {
  const pageCount = [];

  const currentPages = _pagination.current;
  const totalPages = _pagination.last;
  const pagesToShow = 3;
  let startPage = Math.max(1, currentPages - 1);
  let endPage = Math.min(totalPages, currentPages + 1);

  if (currentPages === 1 && totalPages <= pagesToShow) {
    startPage = currentPages;
    endPage = totalPages;
  }

  if (currentPages === totalPages && totalPages === pagesToShow) {
    startPage = totalPages - (pagesToShow - 1);
    endPage = totalPages;
  }

  for (let i = startPage; i <= endPage; i++) {
    pageCount.push(i);
  }

  return (
    <Pagination className="cursor-pointer">
      <PaginationContent>
        <PaginationItem onClick={() => _pagination.prevPage()}>
          <PaginationPrevious />
        </PaginationItem>
        {pageCount.map((count) => {
          return (
            <PaginationItem onClick={() => _pagination.gotoPage(count)}>
              <PaginationLink>{count}</PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext onClick={() => _pagination.nextPage()} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
