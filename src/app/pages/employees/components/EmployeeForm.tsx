import { Input } from '@/components/ui/input';
import { ContentLayout } from '@/components/admin-panel/ContentLayout';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList,  BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import React, { useEffect, useState } from 'react'; 
import LinkButton from '@/components/ui/LinkButton';
import { ChevronLeft  } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {  z } from "zod"
import { useToast } from '@/hooks/use-toast';
import { useDropzone } from "react-dropzone";
import { ImagePlus } from "lucide-react";
import {  useNavigate, useParams } from 'react-router-dom';
import { ApiMediaRepository } from '@/infrastructure/repositories/ApiMediaRepository';
import { MediaImageUseCases } from '@/core/UseCases/MediaImageUseCases';
import { Imagens } from '@/core/entities/Imagens';
import { ApiMemberPerfilRepository } from '@/infrastructure/repositories/ApiMemberPerfil';
import { MemberPerfilUseCases } from '@/core/UseCases/MemberPerfilUseCases';
import { ApiEmployeeRepository } from '../infrastructure/EmployeeRepository';
import EmployeeUseCase from '../domain/usecases/EmployeeUseCase';
import { Employee } from '../domain/entities/Employee';
import EmployeeDTO from '../presentation/dto/EmployeeDTO';

const EmployeeForm = ({ action = 'add'}: {  action: string }) => {
  const title: string = (action === 'add') ? "Nuevo" : 'Editar';
  
  const [entity, setEntity] = React.useState<any>({});
  
  const { id } = useParams();
  const navigate = useNavigate();

  const { toast } = useToast();
  const [preview, setPreview] = React.useState<string | ArrayBuffer | null>(entity.miniature);

  const [perfil, setPerfil] = useState<any[]>([]);

    const employeeUseCases = new EmployeeUseCase(new ApiEmployeeRepository());
    const mediaImageUseCases = new MediaImageUseCases(new ApiMediaRepository());

    const perfilsUseCases = new MemberPerfilUseCases(new ApiMemberPerfilRepository());

    useEffect(() => {
        perfilsUseCases.getAll().then(result => {
            setPerfil(result);
        })
    },[])
    
    const FormSchema = z.object({
        firstname: z
        .string({
            required_error: "El nombre del empleado es requerido.",
            })
            .min(1, {
            message: "El nombre del empleado debe ser mayor a 2 caracteres.",
        }), 
        lastname: z
        .string({
            required_error: "El nombre del empleado es requerido.",
            })
            .min(1, {
            message: "El nombre del empleado debe ser mayor a 2 caracteres.",
        }),
        dateStart: z
        .string({
            required_error: "La fecha de inicio es requerida.",
            })
            .min(1, {
            message: "La fecha de inicio es requerida.",
        }), 
        dateEnd: z
        .string().optional(),
        perfil: z
          .string({
            required_error: "Por favor seleccione un perfil.",
          })
          .min(1, {
            message: "Por favor seleccione un perfil.",
        }),          
        miniature: z
        .instanceof(File)
        .optional()
      })

      const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema)
      })

      useEffect(() => {
        if (id) {
            employeeUseCases.getById(id as string).then((result) => {
                console.log("getById",result);
                setEntity(result);
                form.setValue("firstname", result.nombre);
                form.setValue("lastname", result.apellidos || "");
                form.setValue("dateStart", result.fecha_inicio || "");
                form.setValue("dateEnd", result.fecha_alta || "");
                form.setValue("perfil", result.perfil || "");
            });
        }
    },[id])

      const changeTypeHandler = () => {
        return (value: string) => {
          form.setValue("perfil",value);
        };
      };

      async function onSubmit(data: z.infer<typeof FormSchema>) {
          toast({
            title: "Éxito",
            description: "Socio guardado exitosamente.",
            className:"bg-[#518893] text-white"
          })     
          if (data.miniature?.size===0)   {
            delete data.miniature;
          }
           const employeetDTO = new EmployeeDTO(
            null, 
            data.firstname,
            data.lastname,
            data.dateStart,
            data.dateEnd,
            "",
            data.perfil
        );
          const _image: Imagens = {
            miniature: data.miniature
          }
          let newID: string = id as string;
          if (action === 'add'){
           const _member: Employee = await employeeUseCases.create(employeetDTO);
            newID = _member._id as string;  
          } else {
            await employeeUseCases.update(id as string, employeetDTO);
          }
          try {
            await mediaImageUseCases.uploadImage("member", newID, _image);  
          } catch (error) {
            console.log("error", error);
          } finally {
            navigate('/employees');
          }

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
              <a href="/exercises">Empleado</a>
            </BreadcrumbLink>
          </BreadcrumbItem>      
        </BreadcrumbList>
        </Breadcrumb>

        <div className="w-full px-2 mt-4">
        <Form {...form}>     
                <form onSubmit={form.handleSubmit(onSubmit)}>              
            <div className='flex items-center justify-between border-b-[1px] pb-4'>
               
                <div className='flex items-center gap-4'>
                    <LinkButton to="/employees"><ChevronLeft size={16} className='p-0'/></LinkButton>
                    <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">{title} empleado</h1>
                </div>
                <div className=''>
                    <div className='flex items-center justify-center gap-2'>
 
                        <LinkButton to={"/employees"}>Cerrar</LinkButton>
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
                                                name="firstname"
                                                render={({ field }) => (
                                                    <FormItem>
                                                    <FormLabel>Nombres del empleado</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Nombres del empleado" onChange={field.onChange} defaultValue={field.value}/>
                                                    </FormControl>
                                                    <FormMessage />
                                                    </FormItem>
                                                )}
                                                />
                                         </div>
                                         <div className="grid items-center gap-1.5 mt-4 w-full" >
                                            <FormField
                                                control={form.control}
                                                name="lastname"
                                                render={({ field }) => (
                                                    <FormItem>
                                                    <FormLabel>Apellidos del empleado</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="apellidos del empleado" onChange={field.onChange} defaultValue={field.value}/>
                                                    </FormControl>
                                                    <FormMessage />
                                                    </FormItem>
                                                )}
                                                />
                                         </div> 
                                         <div className="grid items-center gap-1.5 mt-4 w-1/2" >
                                            <FormField
                                                control={form.control}
                                                name="dateStart"
                                                render={({ field }) => (
                                                    <FormItem>
                                                    <FormLabel>Fecha de Inicio</FormLabel>
                                                    <FormControl>
                                                        <Input type="date" placeholder="dd/mm/yyyy" onChange={field.onChange} defaultValue={ field.value }/>
                                                    </FormControl>
                                                    <FormMessage />
                                                    </FormItem>
                                                )}
                                                />
                                         </div>  
                                         <div className="grid items-center gap-1.5 mt-4 w-1/2" >
                                            <FormField
                                                control={form.control}
                                                name="dateEnd"
                                                render={({ field }) => (
                                                    <FormItem>
                                                    <FormLabel>Fecha de alta</FormLabel>
                                                    <FormControl>
                                                        <Input type="date"  placeholder="dd/mm/yyyy" onChange={field.onChange} defaultValue={ field.value }/>
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
                                                name="perfil"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Perfil</FormLabel>
                                                        <Select onValueChange={changeTypeHandler()} defaultValue={field.value} value={field.value}>
                                                            <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Seleccione el Perfil" />
                                                            </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                            { perfil.map((row: any) => 
                                                                <SelectItem key={row._id} value={row._id}>{row.nombre}</SelectItem>      
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
                            
                                </div>
                        </div>  
                    </div>
                </form>
            </Form>                                              
        </div>
        </ContentLayout>
    ); 
};

export default EmployeeForm