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

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {  z } from "zod"
import { useToast } from '../../../hooks/use-toast';
import { useParams } from 'react-router-dom';
import { ProfileMemberUseCases } from '@/core/UseCases/ProfileMemberUseCases';
import { ProfileMember } from '@/core/entities/ProfileMember';
import { ApiProfileMemberRepository } from '@/infrastructure/repositories/ApiProfileMemberRepository';

const ProfileFormEdit = ({entity, action = 'add'}: { entity: any, action: string }) => {
  const title: string = (action === 'add') ? "Nuevo" : 'Editar';
  
  const { toast } = useToast();
    const perfilsUseCases = new ProfileMemberUseCases(new ApiProfileMemberRepository());

    const param: any = useParams();

    const FormSchema = z.object({
        name: z
        .string({
            required_error: "El nombre del socio es requerido.",
            })
            .min(1, {
            message: "El nombre del socio debe ser mayor a 2 caracteres.",
        }), 
        description: z
        .string({
            required_error: "El nombre del socio es requerido.",
            })
            .min(1, {
            message: "El nombre del socio debe ser mayor a 2 caracteres.",
        })
    })

      const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: entity.nombre,
            description: entity.descripcion,
        }
      })

      async function onSubmit(data: z.infer<typeof FormSchema>) {
          toast({
            title: "Éxito",
            description: "Perfil guardado exitosamente.",
            className:"bg-[#518893] text-white"
          })     
          const newData: ProfileMember = {
            name: data.name,
            description: data.description,
          }
          let id: string  = param.id;
          if (action === 'add'){
           const _member: ProfileMember = await perfilsUseCases.createProfile(newData);
           id = _member.id as string;  
          } else {
            await perfilsUseCases.updateProfile(param.id,newData);
          }
         // window.location.href = `/profiles`;
      }
      
      
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
              <a href="/profiles">perfiles</a>
            </BreadcrumbLink>
          </BreadcrumbItem>      
        </BreadcrumbList>
        </Breadcrumb>

        <div className="w-full px-2 mt-4">
        <Form {...form}>     
                <form onSubmit={form.handleSubmit(onSubmit)}>              
            <div className='flex items-center justify-between border-b-[1px] pb-4'>
               
                <div className='flex items-center gap-4'>
                    <LinkButton to="/profiles"><ChevronLeft size={16} className='p-0'/></LinkButton>
                    <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">{title} perfil</h1>
                </div>
                <div className=''>
                    <div className='flex items-center justify-center gap-2'>
 
                        <LinkButton to={"/profiles"}>Cerrar</LinkButton>
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
                                                    <FormLabel>Nombre del perfil</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Nombre del perfil" onChange={field.onChange} defaultValue={field.value}/>
                                                    </FormControl>
                                                    <FormMessage />
                                                    </FormItem>
                                                )}
                                                />
                                         </div>
                                         <div className="grid items-center gap-1.5 mt-4 w-full" >
                                            <FormField
                                                control={form.control}
                                                name="description"
                                                render={({ field }) => (
                                                    <FormItem>
                                                    <FormLabel>Descripción</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Descripción del perfil" onChange={field.onChange} defaultValue={field.value}/>
                                                    </FormControl>
                                                    <FormMessage />
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

export default ProfileFormEdit