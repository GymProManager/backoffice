import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ApiUserRepository } from "@/infrastructure/repositories/ApiUser";
import { UserUseCases } from "@/core/UseCases/UserUseCases";
import { Label } from "@/components/ui/label";

export const LoginFormSchema = z.object({
    usuario: z.string()
    .min(5, 'Usuario es requerido'),
    password: z
      .string()
      .min(5, 'Contraseña debe tener al menos 5 caracteres')
      .max(16, 'Contraseña debe tener menos de 16 caracteres'),
  });

export default function Login({ setToken }: { setToken: any }) {
    const userUseCases = new UserUseCases(new ApiUserRepository());

    const [isSubmitting, SetIsSubmitting] = React.useState<boolean>(false);
    const [error, setError] = React.useState<any>({message:""});

    const form =  useForm<z.infer<typeof LoginFormSchema>>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            usuario:"admin",
            password: ""
        }
      })

      async function onSubmit(data: z.infer<typeof LoginFormSchema>) {
        setError({});

        SetIsSubmitting(true);

        const formData = {
            usuario: data.usuario,
            password: data.password
        }
        const response = await userUseCases.login(formData);
        if (response && response.message === 'Usuario no autorizado'){
            setError(response);
        } else {
            setToken({token:'12345'});
            window.location.href = '/exercises';
        }
       SetIsSubmitting(false);
      }
    return (
        <div className="flex justify-center items-center h-screen flex-col">
            <div className='flex justify-center items-center'>
                <img width="100"  src={"/assets/images/logo.png"} alt=""/> 
            </div>
            <Form {...form}>     
                <form onSubmit={form.handleSubmit(onSubmit)}> 
                <div className='rounded-lg border bg-card text-card-foreground shadow-sm p-4 min-w-80'>
                      <div className="grid items-center gap-1.5 mt-4 w-full" >
                        <FormField
                        control={form.control}
                        name="usuario"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Usuario</FormLabel>
                                <FormControl>
                                    <Input placeholder="Usuario" onChange={field.onChange} defaultValue={field.value}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                    <div className="grid items-center gap-1.5 mt-4 w-full" >
                    <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contraseña</FormLabel>
                            <FormControl>
                                <Input placeholder="Contraseña" onChange={field.onChange} defaultValue={field.value}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />  
                    </div>
                    <div className="grid items-center gap-1.5 mt-4 w-full" >
                        <Label className="text-red-500">{error.message}</Label>
                    </div>
                    <Button
                    type="submit"
                    className="w-full  text-white py-2 mt-4"
                    disabled={isSubmitting}
                    >
                    {isSubmitting ? "Loading..." : "Acceso"}
                    </Button>    
                </div>                                  
                </form>
            </Form>
      </div>
    )
};

