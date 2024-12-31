import { SlidersHorizontal,ChevronLeft,ChevronRight,ChevronsLeft,ChevronsRight, Plus } from "lucide-react"
import { Link } from 'react-router-dom';
import {
    ColumnDef,
    SortingState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    ColumnFiltersState,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
    VisibilityState,
    PaginationState,
  } from "@tanstack/react-table"

  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
  } from "@/components/ui/table"

    import React, { useState } from "react"
    import { Input } from "@/components/ui/input"
    import {
        DropdownMenu,
        DropdownMenuCheckboxItem,
        DropdownMenuContent,
        DropdownMenuTrigger,
        DropdownMenuLabel,
        DropdownMenuSeparator,
      } from "../../../../components/ui/dropdown-menu"
import { Button } from "../../../../components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

  interface DataTableProps<onChangeFilter,TData, TValue> {
    onChangeFilter: (value: string) => void, 
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
  }

  export function DataTable<onChangeFilter,TData, TValue>({
    onChangeFilter,
    columns,
    data,
  }: DataTableProps<onChangeFilter,TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] =  React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
      })
    const [filterMember, setFilterMember] = useState('enable');

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        getSortedRowModel: getSortedRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
          sorting,
          columnFilters,
          columnVisibility,
          rowSelection,
        },
    })
    const hanleFilterMember = (value: string) => {
       setFilterMember(value);
       onChangeFilter(value);
    };

    return (
      <>
       <div className="flex items-center justify-between py-4 w-full">
          <div className="flex items-center gap-2">
            <Input
                placeholder="Filtro de Empleados..."
                value={(table.getColumn("nombre")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                table.getColumn("nombre")?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
            />
          </div>
        <div className="flex gap-2">
                <span className="text-sm font-bold mt-2">Filtrar por: </span>
                <Select value= {filterMember}
                 onValueChange={(value) => {
                  hanleFilterMember(value);
                  }}
                >
                    <SelectTrigger className="w-[180px]" >
                        <SelectValue placeholder="Empleados Activos" />
                    </SelectTrigger>
                    <SelectContent >
                        <SelectItem value="enable">Empleados Activos</SelectItem>
                        <SelectItem value="disabled">Empleados Inactivos</SelectItem>
                        <SelectItem value="all">Todos</SelectItem>
                    </SelectContent>
                </Select>          
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                <SlidersHorizontal size={15} className="mr-2"/>Ver
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Columnas</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {table
                .getAllColumns()
                .filter(
                    (column) => column.getCanHide()
                )
                .map((column) => {
                    return (
                    <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                        }
                    >
                        {column.id}
                    </DropdownMenuCheckboxItem>
                    )
                })}
            </DropdownMenuContent>
            </DropdownMenu>            
            <div className='flex justify-end items-center border-b border-gray-200 dark:border-gray-600'>
              <Link to="/employees/new">
                <Button className="hover:bg-hover hover:border-[#B0A462]">
                  <Plus size={16} />
                  Añadir empleado
                </Button>
              </Link>            
            </div>              
        </div>
        </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className={cell.column.id === "actions" ? "text-right": "text-left"}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No hay resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center mt-2">
        <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} fila(s) seleccionada(s).
        </div> 
        <div className="flex items-center justify-end space-x-2">
            <span className="flex items-center gap-1 mr-12">
                <div className="text-sm">Página</div>
                <span className="text-sm">
                    {table.getState().pagination.pageIndex + 1} de {' '}
                    {table.getPageCount()}
                </span>
            </span>
            <Button
                className="border rounded p-1"
                variant="outline"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                >
                <ChevronsLeft size={16}/>                  
            </Button>        
            <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            >
                <ChevronLeft size={16}/>
            </Button>
            <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            >
            <ChevronRight  size={16}/>
            </Button>
            <Button
                className="border rounded p-1"
                variant="outline"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
                >
                <ChevronsRight size={16}/>   
            </Button>              
        </div>       
      </div>

      </>        
    )

  }
  
  