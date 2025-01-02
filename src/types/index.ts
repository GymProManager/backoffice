import type { Row } from "@tanstack/react-table"

export interface DataTableRowAction<TData> {
    row: Row<TData>
    type: "update" | "delete"
  }
  