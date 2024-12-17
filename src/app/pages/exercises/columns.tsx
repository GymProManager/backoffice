import {  ColumnDef} from "@tanstack/react-table"
import { ArrowUpDown,  MoreHorizontal } from "lucide-react"
 
import { Button } from "../../../components/ui/button"
import { Checkbox } from "../../../components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu"

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
} from "../../../components/ui/alert-dialog"
import { LinkTo } from "../../../components/ui/LinkButton"
import React from "react"
import { ExerciseUseCases } from "@/core/UseCases/ExerciseUseCases"
import { ApiExerciseRepository } from "@/infrastructure/repositories/ApiExerciseRepository"
import { CONFIG } from "@/Config"

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
    accessorKey: "miniature",
    header: "Miniatura",
    cell: ({ row }) => {
      const imageUrl = row.getValue("miniature");
      // const thum = row.getValue(`${accessorKey}`);
      return (
        <div>
          <img
            alt={`Miniature`}
            className="aspect-square rounded-md object-cover"
            height="50"
            src={`${CONFIG.IMAGES_URL}${imageUrl}`}
            width="50"
          />
        </div>
      );  
    },
  },
  {
    accessorKey: "name",
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
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const [open, setIsOpen] = React.useState(false)
      const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)
      
      const payment = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Ver video
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LinkTo to={`/exercises/edit/${payment.id}`}>Editar</LinkTo>
            </DropdownMenuItem>
            <DeleteDialog id={payment.id}/>
          </DropdownMenuContent>
        </DropdownMenu>
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
          Esto borrará el ejercicio permanentemente. 
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction className="bg-[#CC7751] text-white"
            onClick={async() => {
              const exerciseUseCases = new ExerciseUseCases(new ApiExerciseRepository());
              exerciseUseCases.deleteExercise(id);
            }}
        >Delete</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  );
};