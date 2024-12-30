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

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../../components/ui/alert-dialog"
import { LinkTo } from "../../../../components/ui/LinkButton"
import { ExerciseUseCases } from "@/core/UseCases/ExerciseUseCases"
import { ApiExerciseRepository } from "@/infrastructure/repositories/ApiExerciseRepository"
import { CONFIG } from "@/Config"
import { MemberUseCases } from "@/core/UseCases/MemberUseCases"
import { ApiMemberRepository } from "@/infrastructure/repositories/ApiMemberRepository"
import { ApiEmployeeRepository } from "../infrastructure/EmployeeRepository"
import EmployeeUseCase from "../domain/usecases/EmployeeUseCase"



export const columns: ColumnDef<any>[] = [
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
      const data = row.original
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
            <DropdownMenuItem>
              <LinkTo to={`/employees/edit/${data.id}`}>Editar</LinkTo>
            </DropdownMenuItem>
            <DeleteDialog id={data.id}/>
          </DropdownMenuContent>
        </DropdownMenu>
        </>
      )
    },
  },
]

const DeleteDialog = ({id}:{id:string}) => {
  return (
    <AlertDialog>
    <AlertDialogTrigger asChild className="text-sm w-full text-left hover:bg-primary hover:text-[#ffffff] rounded-sm">
      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Eliminar</DropdownMenuItem>
    </AlertDialogTrigger>
    <AlertDialogContent className="border-r-2">
      <AlertDialogHeader>
        <AlertDialogTitle>¿Está completamente seguro?</AlertDialogTitle>
        <AlertDialogDescription>
          Esto borrará el empleado permanentemente. 
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction className="bg-[#CC7751] text-white"
            onClick={async() => {
              const employeeUseCases = new EmployeeUseCase(new ApiEmployeeRepository());
              employeeUseCases.delete(id);
            }}
        >Borrar</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  );
};

