"use client";
import { TableContextValue, TableProvider, useTableContext } from "@/lib/context/TableProvider";
import {
  ColumnDef,
  RowSelectionState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import { usePaginationState } from "./hooks/usePaginationState";
import { ReactTableProvider } from "@/lib/context/ReactTableContext";
import { ReactTableContextValue } from "@/lib/types/context";
import { PaginationParams } from "@/lib/types/pagination";
import { TablePagination } from "./TablePagination";
import { Progress } from "../ui/progress";

interface TableProps {
  columns: ColumnDef<any>[];
  data: any;
  onRowClick?: () => void;
  paginationProps?: any;
  children?: React.ReactNode;
  onCopy?: () => void;
  tableProps?: any;
  loading?: boolean;
}

const ReactTable: React.FC<TableProps> = ({ columns, data, onRowClick, paginationProps, children, onCopy, tableProps, loading }) => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const { handleChangePagination, pagination } =
    useTableContext() as TableContextValue<unknown, PaginationParams>;
  const { pagiState, pagiTableOptions, pagiMeta } =
    usePaginationState(paginationProps);

  const instance = useReactTable({
    data,
    columns,
    state: {
      ...pagiState,
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    ...pagiTableOptions,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    defaultColumn: {
      sortingFn: 'alphanumericCaseSensitive',
      sortDescFirst: false,
    },
    pageCount: paginationProps?.pageCount,
  });

  const value = useMemo(
    () => ({
      instance,
      onRowClick,
      loading,
      pagination: pagiMeta,
      data,
      tableProps,
      onCopy,
      children,
    }),
    [instance, onRowClick, loading, pagiMeta, data, tableProps, onCopy, children]
  );  
  
  if (loading) {
    return <>loading...</>
  }

  if (data.length === 0 && !loading) {
    return <>Không có dữ liệu</>;
  }

  return (
    <TableProvider>
       <ReactTableProvider value={value as ReactTableContextValue<unknown>}>
      <div className="p-4 rounded-[8px]">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            {instance.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-gray-200 border-b">
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className="px-4 py-2 text-left text-gray-600 font-semibold cursor-pointer"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {header.isPlaceholder ? null : (
                        <div className="flex items-center">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {instance.getRowModel().rows.map((rowEl, rowIndex) => {
              return (
                <tr
                  key={rowEl.id}
                  className={`border-b ${
                    rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100 cursor-pointer`}
                >
                  {rowEl.getVisibleCells().map((cellEl) => {
                    return (
                      <td
                        key={cellEl.id}
                        onClick={onRowClick}
                        className="px-4 py-2 text-gray-700"
                      >
                        {flexRender(
                          cellEl.column.columnDef.cell,
                          cellEl.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <TablePagination />
    </ReactTableProvider>
    </TableProvider>
  );
};

export default ReactTable;
