import React from 'react';
import { usePaginationHandler } from './hooks/usePaginationHandler';
import { useReactTableContext } from '@/lib/context/ReactTableContext';
import { PerPageSelect } from './PerPageSelect';

export const PAGINATION_HEIGHT = 66;

const TablePagination = () => {
  const { pageCount, pageIndex, setPageIndex, handleChangePagination } = usePaginationHandler();
  const { instance } = useReactTableContext();

  const handlePageChange = (newPageIndex : number) => {
    setPageIndex(newPageIndex);
    if (typeof handleChangePagination === 'function') {
      handleChangePagination({ page: newPageIndex + 1 });
    }
  };

  return (
    <div className="fixed bottom-0 right-10 w-full h-[66px] bg-white flex justify-end items-center p-8">
        {instance.getPageCount() > 1 && (
          <div className="flex space-x-2">
            <button
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() => handlePageChange(pageIndex - 1)}
              disabled={pageIndex === 0}
            >
              Previous
            </button>
            {Array.from({ length: pageCount }).map((_, index) => (
              <button
                key={index}
                className={`px-3 py-1 rounded ${
                  pageIndex === index ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                }`}
                onClick={() => handlePageChange(index)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() => handlePageChange(pageIndex + 1)}
              disabled={pageIndex === pageCount - 1}
            >
              Next
            </button>
          </div>
        )}
        <PerPageSelect />
      </div>
  );
};

export { TablePagination };
