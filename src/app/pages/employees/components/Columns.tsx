import {  ColumnDef} from "@tanstack/react-table"
import { ArrowUpDown,  MoreHorizontal } from "lucide-react"
 
import { Button } from "../../../../components/ui/button"
import { Checkbox } from "../../../../components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu"


import { CONFIG } from "@/Config"
import { DataTableRowAction } from "@/types"
import { Employee } from "../domain/entities/Employee"
import EmployeeDTO from "../presentation/dto/EmployeeDTO"
interface GetColumnsProps {
  setRowAction: React.Dispatch<
    React.SetStateAction<DataTableRowAction<any> | null>
  >
}

export function getColumns({
  setRowAction,
}: GetColumnsProps): ColumnDef<EmployeeDTO>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "avatar",
      header: "Avatar",
      cell: ({ row }) => {
        const imageUrl = row.getValue("avatar");
      
        return (
          <>
          <div className="relative">
            <img
              alt={`avatar`}
              className="aspect-square rounded-md object-cover"
              height="30"
              width="30"
              src={imageUrl ? `${CONFIG.IMAGES_URL}${imageUrl}`: `/assets/images/member.png `}
            />
          </div>
          </>
        );  
      },
    },
    {
      accessorKey: "nombre",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
          Nombre
            <ArrowUpDown size={15} className="ml-2" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="capitalize">{row.getValue("nombre")}</div>,
    },
    {
      accessorKey: "apellidos",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
          Apellidos
            <ArrowUpDown size={15} className="ml-2" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="capitalize">{row.getValue("apellidos")}</div>,
    }, 
    {
      accessorKey: "fecha_inicio",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
          Fecha de Inicio
            <ArrowUpDown size={15} className="ml-2" />
          </Button>
        )
      },
      cell:({ row }) => {
        let date : String | null = row.getValue("fecha_inicio");
        if(row.getValue("fecha_inicio")){
          date = new Date(row.getValue("fecha_inicio")).toLocaleDateString('es-ES', {
            day : 'numeric',
            month : '2-digit',
            year : 'numeric'
          }).split(' ').join('-');
        }
        return (
          <div className="capitalize">{date ?? "-"}</div>
        )
      },
    },  
    {
      accessorKey: "fecha_alta",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
          Fecha de Alta
            <ArrowUpDown size={15} className="ml-2" />
          </Button>
        )
      },
      cell:({ row }) => {
        let date : String | null = row.getValue("fecha_alta");
        if(row.getValue("fecha_alta")){
          date = new Date(row.getValue("fecha_alta")).toLocaleDateString('es-ES', {
            day : 'numeric',
            month : '2-digit',
            year : 'numeric'
          }).split(' ').join('-');
        }
        return (
          <div className="capitalize">{date ?? "-"}</div>
        )
      },
    },    
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={() => setRowAction({ row, type: "update" })}
              >
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => setRowAction({ row, type: "delete" })}
              >
                Borrar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </>
        )
      },
    }
  ]
}
