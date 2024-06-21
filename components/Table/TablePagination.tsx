import { useReactTableContext } from "@/lib/context/ReactTableContext";
import { usePaginationHandler } from "./hooks/usePaginationHandler";

export const PAGINATION_HEIGHT = 66;

const TablePagination = () => {
  const { pageCount, pageIndex, setPageIndex, handleChangePagination } =
    usePaginationHandler();
  const { instance } = useReactTableContext();

  const handlePageChange = (newPageIndex: number) => {
    setPageIndex(newPageIndex);
    if (typeof handleChangePagination === "function") {
      handleChangePagination({ page: newPageIndex + 1 });
    }
  };

  return (
    <div className="w-full h-[66px] bg-white flex justify-end items-center p-8">
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
                pageIndex === index
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
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
      <div className="flex items-center justify-end gap-1">
        <select
          value={instance.getState().pagination.pageSize}
          onChange={(e) => {
            console.log(e.target.value);
            instance.setPageSize(Number(e.target.value));
            typeof handleChangePagination === "function" &&
              handleChangePagination({
                page: 1,
                per_page: Number(e.target.value),
              });
          }}
        >
          {[10, 50, 100].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export { TablePagination };
