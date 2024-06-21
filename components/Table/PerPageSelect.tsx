'use client';
import { useReactTableContext } from "@/lib/context/ReactTableContext";
import { TableContextValue, useTableContext } from "@/lib/context/TableProvider";
import { PaginationParams } from "@/lib/types/pagination";

const PerPageSelect = () => {
  const { instance } = useReactTableContext();
  const { handleChangePagination, pagination } =
  useTableContext() as TableContextValue<unknown, PaginationParams>

  return (
    <div
       className='flex items-center justify-end gap-1'
    >
      <select
         value={instance.getState().pagination.pageSize}
        onChange={(e) => {
          console.log(e.target.value);
          instance.setPageSize(Number(e.target.value))
          typeof handleChangePagination === 'function' &&
            handleChangePagination({
              page: 1,
              per_page: Number(e.target.value)
            })
        }}
      >
        {[10 , 50 , 100].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            {pageSize}
          </option>
        ))}
      </select>
    </div>
  )
}

export { PerPageSelect };

