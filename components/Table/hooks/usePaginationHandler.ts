import { useReactTableContext } from '@/lib/context/ReactTableContext'
import { useEffect } from 'react'

export const usePaginationHandler = () => {
  const { instance, pagination } = useReactTableContext()
  const { setPageIndex, setPageSize } = instance

  const {
    state: { pageIndex, pageSize },
    handleChangePagination,
    paginationParams,
    manualPagination
  } = pagination

  // handle controlled pagination
  useEffect(() => {
    if (!manualPagination) return
    if (
      paginationParams &&
      (paginationParams.page !== pageIndex + 1 ||
        paginationParams?.per_page !== pageSize)
    ) {
      setPageIndex(paginationParams.page - 1)
      setPageSize(paginationParams.per_page)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setPageIndex, paginationParams, setPageSize, manualPagination])

  return {
    pageCount: instance.getPageCount(),
    pageIndex: instance.getState().pagination.pageIndex,
    setPageIndex,
    setPageSize,
    pageSize,
    handleChangePagination
  }
}
