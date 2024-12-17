import { Input } from '../../../components/ui/input';
import { ContentLayout } from '../../../components/admin-panel/ContentLayout';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList,  BreadcrumbSeparator } from '../../../components/ui/breadcrumb';
import React, { useEffect, useState } from 'react'; 
import LinkButton from '../../../components/ui/LinkButton';
import { ChevronLeft  } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "../../../components/ui/form"
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../../../components/ui/select"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Textarea } from '../../../components/ui/textarea';
import { useToast } from '../../../hooks/use-toast';
import { useDropzone } from "react-dropzone";
import { ImagePlus } from "lucide-react";
import { useNavigate, useParams } from 'react-router-dom';
import { ApiExerciseTypeRepository } from '@/infrastructure/repositories/ApiExerciseTypeRepository';
import { ApiGroupMuscleRepository } from '@/infrastructure/repositories/ApiGroupMuscleRepository';
import { ExerciseType } from '@/core/entities/ExerciseType';
import { GroupMuscle } from '@/core/entities/GroupMuscle';
import { ExerciseTypeUseCases } from '@/core/UseCases/ExerciseTypeUseCases';
import { GroupMuscleUseCases } from '@/core/UseCases/GroupMuscleUseCases';
import { ExerciseUseCases } from '@/core/UseCases/ExerciseUseCases';
import { ApiExerciseRepository } from '@/infrastructure/repositories/ApiExerciseRepository';
import { Exercise } from '@/core/entities/Exercise';
import { ApiMediaRepository } from '@/infrastructure/repositories/ApiMediaRepository';
import { MediaImageUseCases } from '@/core/UseCases/MediaImageUseCases';
import { Imagens } from '@/core/entities/Imagens';

const ExerciseFormEdit = ({entity, action = 'add'}: { entity: any, action: string }) => {
  const title: string = (action === 'add') ? "Nuevo" : 'Editar';
  let navigate = useNavigate();
  
  const { toast } = useToast();
  const [preview, setPreview] = React.useState<string | ArrayBuffer | null>(entity.miniature);
  const [previewCover, setPreviewCover] = React.useState<string | ArrayBuffer | null>(entity.cover);

  const [exerciseType, setExerciseType] = useState<ExerciseType[]>([]);
  const [groupMuscle, setGroupMuscle] = useState<GroupMuscle[]>([]);

    const exerciseUseCases = new ExerciseUseCases(new ApiExerciseRepository());
    const mediaImageUseCases = new MediaImageUseCases(new ApiMediaRepository());

    const exerciseTypeUseCases = new ExerciseTypeUseCases(new ApiExerciseTypeRepository());
    const groupMuscleUseCases = new GroupMuscleUseCases(new ApiGroupMuscleRepository());
    const param: any = useParams();

    useEffect(() => {
        exerciseTypeUseCases.getAll().then(result => {
            setExerciseType(result);
        })
        groupMuscleUseCases.getAll().then(result => {
            setGroupMuscle(result);
        })
    },[])

    const FormSchema = z.object({
        name: z
        .string({
          required_error: "El nombre del ejercicio es requerido.",
        })
        .min(1, {
          message: "El nombre del ejercicio debe ser mayor a 2 caracteres.",
        }), 
        groupmuscle: z
          .string({
            required_error: "Por favor seleccione el grupo muscular.",
          })
          .min(1, {
            message: "Por favor seleccione el grupo muscular.",
          }),          
        typeexercise: z
          .string({
            required_error: "Por favor seleccione un tipo de ejercicio.",
          })
          .min(1, {
            message: "Por favor seleccione un tipo de ejercicio.",
          }),          
          description: z
          .string({
              required_error: "La descripción es requerida.",
          })
          .max(160, {
            message: "La descripción no debe superar los 200 caracteres.",
          }).optional(),
          video: z.union([z.literal(""), z.string().trim().url({
            message: "Por favor ingrese un enlace vídeo válido."
          })]),          
            cover: z
            .instanceof(File)
            //.refine((file) => file.size !== 0, "Please upload an image").optional(),  
            .optional(),  
            miniature: z
            .instanceof(File)
            .optional(),                   
      })

      const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: entity.name,
            video: entity.video,
            typeexercise: entity.typeexercise,
            groupmuscle: entity.groupmuscle,
            description: entity.description
        }
      })
         
      const changeTypeHandler = () => {
        return (value: string) => {
          form.setValue("typeexercise",value);
          form.setValue("groupmuscle", "675abde605ee714112f01eb5");
          form.trigger("groupmuscle");
        };
      };
      async function onSubmit(data: z.infer<typeof FormSchema>) {
          toast({
            title: "Éxito",
            description: "Ejercicio guardado exitosamente.",
            className:"bg-[#518893] text-white"
          })     
          if (data.miniature?.size===0)   {
            delete data.miniature;
          }
          if (data.cover?.size===0)   {
            delete data.cover;
          }    
          const newExercise: Exercise = {
            name: data.name,
            description: data.description,
            video: data.video,
            typeexercise: data.typeexercise,
            groupmuscle: data.groupmuscle,
          }
          const _image: Imagens = {
            miniature: data.miniature,
            cover: data.cover,
          }
          let id: string  = param.id;
          if (action === 'add'){
           const _exercise: Exercise = await exerciseUseCases.createExercise(newExercise);
           id = _exercise.id as string;  
          } else {
            await exerciseUseCases.updateExercise(param.id,newExercise);
          }
          await mediaImageUseCases.uploadImage("exercise", id, _image);

          window.location.href = `/exercises`;
      }
      
      const { getRootProps:getRootProps, getInputProps:getInputProps, isDragActive:isDragActive,fileRejections :fileRejections } =
      useDropzone({
        onDrop:  (acceptedFiles) => { 
            const reader = new FileReader();
            try {
              reader.onload = () => setPreview(reader.result);
              reader.readAsDataURL(acceptedFiles[0]);
              form.setValue("miniature", acceptedFiles[0]);
              form.clearErrors("miniature");
            } catch (error) {
              setPreview(null);
              form.resetField("miniature");
            }
        },
        maxFiles: 1,
        maxSize: 1000000,
        accept: { "image/png": [], "image/jpg": [], "image/jpeg": [] },
      });

      const { getRootProps:getRootPropsCover, getInputProps: getInputPropsCover, isDragActive: isDragActiveCover,fileRejections: fileRejectionsCover } =
      useDropzone({
        onDrop:  (acceptedFiles) => { 
            const reader = new FileReader();
            try {
              reader.onload = () => setPreviewCover(reader.result);
              reader.readAsDataURL(acceptedFiles[0]);
              form.setValue("cover", acceptedFiles[0]);
              form.clearErrors("cover");
            } catch (error) {
              setPreview(null);
              form.resetField("cover");
            }
        },
        maxFiles: 1,
        maxSize: 1000000,
        accept: { "image/png": [], "image/jpg": [], "image/jpeg": [] },
      });
 
    return (
        <ContentLayout title='Exercises'>
            <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <a href="/dashboard">Dashboard</a>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <a href="/exercises">Ejercicios</a>
            </BreadcrumbLink>
          </BreadcrumbItem>      
        </BreadcrumbList>
        </Breadcrumb>

        <div className="w-full px-2 mt-4">
        <Form {...form}>     
                <form onSubmit={form.handleSubmit(onSubmit)}>              
            <div className='flex items-center justify-between border-b-[1px] pb-4'>
                <div className='flex items-center gap-4'>
                    <LinkButton to="/exercises"><ChevronLeft size={16} className='p-0'/></LinkButton>
                    <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">{title} ejercicio</h1>
                </div>
                <div className=''>
                    <div className='flex items-center justify-center gap-2'>
 
                        <LinkButton to={"/exercises"}>Cerrar</LinkButton>
                        <Button type="submit">Guardar</Button>
                    </div>
                </div>
            </div>
                    <div className='grid grid-cols-12 gap-6 py-4'>
                        <div className='lg:col-span-8 col-span-full space-y-3'>
                            <div className='rounded-lg border bg-card text-card-foreground shadow-sm p-4'>
                                    
                                    <div  className="space-y-6">
                                        <div className="grid items-center gap-1.5 mt-4 w-full" >
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                <FormLabel>Nombre del ejercicio</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Nombre del ejercicio" onChange={field.onChange} defaultValue={field.value}/>
                                                </FormControl>
                                                <FormMessage />
                                                </FormItem>
                                            )}
                                            />
                                        </div>
                                        <div className='flex flex-row'>
                                            <div className="grid items-center gap-1.5 mt-2 w-1/2 mr-1" >
                                                <FormField
                                                control={form.control}
                                                name="typeexercise"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Tipo de ejercicio</FormLabel>
                                                        <Select onValueChange={changeTypeHandler()} defaultValue={field.value}>
                                                            <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Seleccione el tipo de ejercicio" />
                                                            </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                            { exerciseType.map((row: ExerciseType) => 
                                                                <SelectItem key={row.id} value={row.id}>{row.name}</SelectItem>      
                                                                )
                                                            }
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                                />                                
                                            </div>
                                            <div className="grid items-center gap-1.5 mt-2 w-1/2 ml-1" >
                                                <FormField
                                                control={form.control}
                                                name="groupmuscle"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Grupo Muscular</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                                            <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Seleccione el grupo muscular" />
                                                            </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                            { groupMuscle.map((row: ExerciseType) => 
                                                                <SelectItem key={row.id} value={row.id}>{row.name}</SelectItem>      
                                                                )
                                                            }
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                                />                                
                                            </div>                                        
                                        </div>
                                        <div className="grid items-center gap-1.5 mt-2 w-full">
                                            <FormField
                                            control={form.control}
                                            name="description"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Descripción</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                        placeholder="Descripción del ejercicio"
                                                        className="resize-none"
                                                        {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                            />                                 
                                        </div>
                                        <div className="grid items-center gap-1.5 mt-4 w-full" >
                                        <FormField
                                            control={form.control}
                                            name="video"
                                            render={({ field }) => (
                                                <FormItem>
                                                <FormLabel>Url de video</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Url de video" onChange={field.onChange} defaultValue={field.value}/>
                                                </FormControl>
                                                <FormMessage />
                                                </FormItem>
                                            )}
                                            />
                                        </div>                                        
                                    </div>
                            </div>
                        </div>
                        <div className='lg:col-span-4 col-span-full'>
                            <div className="grid items-center gap-1.5 w-full">
                                <div className='rounded-lg border bg-card text-card-foreground shadow-sm p-4 '>
                                    <div className='mb-4'>
                                        <FormField
                                            control={form.control}
                                            name="miniature"
                                            render={() => (
                                                <FormItem className="mx-auto w-full">
                                                <FormLabel
                                                    className={`${
                                                    fileRejections.length !== 0 && "text-destructive"
                                                    }`}
                                                >
                                                    <h2 className="text-center font-semibold tracking-tight">
                                                    Imagen Miniatura
                                                    <span
                                                        className={
                                                        form.formState.errors.miniature || fileRejections.length !== 0
                                                            ? "text-destructive"
                                                            : "text-muted-foreground"
                                                        }
                                                    ></span>
                                                    </h2>
                                                </FormLabel>
                                                <FormControl>
                                                    <div
                                                    {...getRootProps()}
                                                    className="mx-auto flex cursor-pointer flex-col items-center justify-center gap-y-2 p-4"
                                                    >
                                                    {preview && (
                                                        <img
                                                        src={preview as string}
                                                        alt="Imagen Miniatura"
                                                        className="max-h-[400px] rounded-lg"
                                                        />
                                                    )}
                                                    <ImagePlus
                                                    color="#e5e5e5"
                                                        className={`size-20 ${preview ? "hidden" : "block"}`}
                                                    />
                                                    <Input {...getInputProps()} type="file" />
                                                    {isDragActive ? (
                                                        <p>Drop the image!</p>
                                                    ) : (
                                                        <p className='text-sm'>Arrastre una imagen o presione Click</p>
                                                    )}
                                                    </div>
                                                </FormControl>
                                                <FormMessage>
                                                    {fileRejections.length !== 0 && (
                                                    <p>
                                                        Image must be less than 1MB and of type png, jpg, or jpeg
                                                    </p>
                                                    )}
                                                </FormMessage>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                    <div className='rounded-lg border bg-card text-card-foreground shadow-sm p-4 '>
                                        <FormField
                                            control={form.control}
                                            name="cover"
                                            render={() => (
                                                <FormItem className="mx-auto w-full">
                                                <FormLabel
                                                    className={`${
                                                    fileRejectionsCover.length !== 0 && "text-destructive"
                                                    }`}
                                                >
                                                    <h2 className="text-center font-semibold tracking-tight">
                                                    Imagen Cover
                                                    <span
                                                        className={
                                                        form.formState.errors.cover || fileRejectionsCover.length !== 0
                                                            ? "text-destructive"
                                                            : "text-muted-foreground"
                                                        }
                                                    ></span>
                                                    </h2>
                                                </FormLabel>
                                                <FormControl>
                                                    <div
                                                    {...getRootPropsCover()}
                                                    className="mx-auto flex cursor-pointer flex-col items-center justify-center gap-y-2 p-4"
                                                    >
                                                    {previewCover && (
                                                        <img
                                                        src={previewCover as string}
                                                        alt="Imagen Vista Previa"
                                                        className="max-h-[400px] rounded-lg"
                                                        />
                                                    )}
                                                    <ImagePlus
                                                        color="#e5e5e5"
                                                        className={`size-20 ${previewCover ? "hidden" : "block"}`}
                                                    />
                                                    <Input {...getInputPropsCover()} type="file" />
                                                    {isDragActiveCover ? (
                                                        <p>Drop the image!</p>
                                                    ) : (
                                                        <p className='text-sm'>Arrastre una imagen o presione Click</p>
                                                    )}
                                                    </div>
                                                </FormControl>
                                                <FormMessage>
                                                    {fileRejectionsCover.length !== 0 && (
                                                    <p>
                                                        Image must be less than 1MB and of type png, jpg, or jpeg
                                                    </p>
                                                    )}
                                                </FormMessage>
                                                </FormItem>
                                            )}
                                        />
                                    </div>                                
                                </div>
                            </div>  
                        </div>
                </form>
            </Form>                                              
        </div>
        </ContentLayout>
    ); 
};

export default ExerciseFormEdit