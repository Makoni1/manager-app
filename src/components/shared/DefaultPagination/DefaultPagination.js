import React, {useMemo} from 'react';
import DefaultPaginationWrapper from "./components/DefaultPaginationWrapper";
import DefaultPaginationButton from "./components/DefaultPaginationButton";

const DefaultPagination = ({ total = 0, currentPage = 1, limit = 10, changePage = (page)=> alert('page-' + page), maxVisibleButtons = 5}) => {
  const pagesTotal = Math.ceil(total / limit)

  const startPage = useMemo(() => {
    if (currentPage === 1) {
      return 1;
    }
    if (currentPage === pagesTotal) {
      const count = pagesTotal - maxVisibleButtons + 1;
      return count < 1 ? 1 : count;
    }
    return currentPage - 1;

  }, [currentPage, pagesTotal, maxVisibleButtons])

  const endPage = useMemo(() => {
    return Math.min(
      startPage + maxVisibleButtons - 1,
      pagesTotal
    );
  }, [startPage, maxVisibleButtons, pagesTotal])


  const displayDots = useMemo(() => {
    return {
      start: startPage > 2,
      end:
        endPage >= maxVisibleButtons &&
        endPage !== pagesTotal,
    };

  }, [maxVisibleButtons, pagesTotal, endPage, startPage])
  const pages = useMemo(() => {
    const range = [];
    for (let i = startPage; i <= endPage; i += 1) {
      range.push(i);
    }
    return range;
  }, [total, limit, startPage, endPage])

  const updatePage = (page = 1) => {
    changePage(page)
  }

  return (
    <DefaultPaginationWrapper>

      <DefaultPaginationButton
        isPrev
        updatePage={() => updatePage(currentPage - 1)}
        isDisabled={currentPage === 1}
      />

      { displayDots.start && (
        <>
          <DefaultPaginationButton
            key={'page-force-start'}
            text={1}
            updatePage={updatePage}
            currentPage={currentPage}
          />
          <DefaultPaginationButton
            key={'page-start-dots'}
            text={'...'}
          />
        </>
      )}

      { pages.map(page => <DefaultPaginationButton
          key={'page-' + page}
          text={page}
          updatePage={updatePage}
          currentPage={currentPage}
          isDisabled={page === currentPage}
        />
      )}

      { displayDots.end && (
        <>
          <DefaultPaginationButton
            key={'page-end-dots'}
            text={'...'}
          />
          <DefaultPaginationButton
            key={'page-force-end'}
            text={pagesTotal}
            updatePage={updatePage}
            currentPage={currentPage}
          />
        </>
      )}

      <DefaultPaginationButton
        isNext
        updatePage={() => updatePage(currentPage + 1)}
        isDisabled={currentPage === pagesTotal}
      />

    </DefaultPaginationWrapper>
  );
};

export default DefaultPagination;