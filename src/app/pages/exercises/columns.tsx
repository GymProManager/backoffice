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
import React, { useEffect, useState } from "react"
import { ExerciseUseCases } from "@/core/UseCases/ExerciseUseCases"
import { ApiExerciseRepository } from "@/infrastructure/repositories/ApiExerciseRepository"
import { CONFIG } from "@/Config"
import ReactPlayer from "react-player"
import { Exercise } from '@/core/entities/Exercise'; 
import { cn } from "@/lib/utils"



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
      const [playing, setPlaying] = useState(false);

      const exercise = row.original
      const imageUrl = row.getValue("miniature");
      const HandleThum = () =>{
        setPlaying((prev) => !prev);
      }
    
      return (
        <>
        <div className="relative" onMouseEnter={() => HandleThum()} onMouseLeave={() => HandleThum()}>
          <img
            alt={`Miniature`}
            className="aspect-square rounded-md object-cover"
            height="50"
            src={`${CONFIG.IMAGES_URL}${imageUrl}`}
            width="50"
          />
          { playing && exercise.video.trim()!="" && <VideoMiniatureDialog urlVideo={exercise.video} /> }
        </div>
        </>
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
            <VideoDialog id={payment.id}/>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LinkTo to={`/exercises/edit/${payment.id}`}>Editar</LinkTo>
            </DropdownMenuItem>
            <DeleteDialog id={payment.id}/>
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

const VideoDialog = ({id}:{id:string}) => {
  const [playing, setPlaying] = useState(true);
  const [exercise, setExercise] = useState<Exercise>({} as Exercise);
  const exerciseUseCases = new ExerciseUseCases(new ApiExerciseRepository());

  const HandlePlay = () => {
    setPlaying((prev) => !prev);
  }


  useEffect(() => {
    const getExercise = async () => {
    const data: any = await exerciseUseCases.getExerciseById(id);
    setExercise(data);
    };
    getExercise();
  },[]);

  return (
    <AlertDialog>
    <AlertDialogTrigger asChild className="text-sm w-full text-left hover:bg-primary hover:text-[#ffffff] rounded-sm">
      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Video</DropdownMenuItem>
    </AlertDialogTrigger>
    <AlertDialogContent className="border-r-2 p-2">
      <AlertDialogHeader>
      <AlertDialogTitle>Video</AlertDialogTitle>
        <AlertDialogDescription>
          <ReactPlayer className="max-h-[360px]" width='100%' height={240} playing={ playing } volume={0.1}  controls={true} url={exercise.video}> </ReactPlayer>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogAction onClick={() => HandlePlay()}>Cerrar</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}

const VideoMiniatureDialog = ({urlVideo}:{urlVideo:string}) => {
	const [loading, setLoading] = useState(false);

	const LoadingSpinner = ({className}: {className: string}): JSX.Element => {
		return <svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={cn("animate-spin", className)}
		>
			<path d="M21 12a9 9 0 1 1-6.219-8.56" />
		</svg>
	  }

	const handleReady = () => {
		return () => {
			setLoading(true);
		}
	}
  return (
    <div className="absolute z-[9999] -top-12 left-12 bg-white border-2 border-slate-500 rounded-sm text-center">
		<div className="absolute flex flex-col justify-center items-center h-full w-full">
		{!loading && <><LoadingSpinner className="w-8 h-8 text-slate-500" /><p className="text-sm text-black-500">Cargando...</p></>}
		</div>
    	<ReactPlayer onReady={handleReady()} muted playing={true} width='150px' height='90px' volume={0.1}  url={urlVideo}> </ReactPlayer>
    </div>
  )
  

}

