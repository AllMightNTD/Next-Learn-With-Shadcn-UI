import { Cell, Column, ColumnMeta, PaginationState, Row, RowData, Table } from "@tanstack/react-table"
import { PaginationProps } from "./pagination"
import { ReactNode } from "react"

export type ActionConfig<T extends RowData> = {
    onDetail?: (id: string | number, row: Row<T>) => void
    disabledDetail?: boolean
    detailIcon?: React.ReactNode
    renderLeft?: (row: Row<T>) => React.ReactNode
    renderRight?: (row: Row<T>) => React.ReactNode
    meta?: ColumnMeta<T, unknown>
}
  
export type Action<T extends RowData> = ActionConfig<T> | boolean

export interface ReactTableContextValue<T> {
    instance: Table<T>
    onRowClick?: () => void
    loading?: boolean
    data: T[]
    tableProps?: any
    pagination: PaginationProps & { state: PaginationState }
    onCopy?: (id: string | number) => void
    children?: ReactNode
}

export type ReactTableCellProps<TData extends RowData, TValue = unknown> = {
    table: Table<TData>
    row: Row<TData>
    column: Column<TData, TValue>
    cell: Cell<TData, TValue>
    getValue: () => unknown
    renderValue: () => unknown
}