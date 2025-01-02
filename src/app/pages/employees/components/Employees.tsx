import React, { useEffect, useState } from 'react'; 
import { ContentLayout } from '@/components/admin-panel/ContentLayout';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
  } from "@/components/ui/breadcrumb";
import { Exercise } from '@/core/entities/Exercise';
import { DataTable } from './DataTable';
import { getColumns } from './Columns';
import { ApiEmployeeRepository } from '../infrastructure/EmployeeRepository';
import EmployeeUseCase from '../domain/usecases/EmployeeUseCase';
import { off, on } from '@/lib/events';
import EmployeeDTO from '../presentation/dto/EmployeeDTO';
import { toast } from '@/hooks/use-toast';
import { DataTableRowAction } from '@/types';
import { Employee } from '../domain/entities/Employee';

function getToken() {
  const tokenString = sessionStorage.getItem('token') || "{}";
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}

const EmployeesPage: React.FC = () => {
   const [employees, setEmployees] = useState<EmployeeDTO[]>([]);

  const [filter, setFilter] = useState<any>("enable");
   
  const employeeUseCases = new EmployeeUseCase(new ApiEmployeeRepository());
  const token = getToken();
    if(!token) {
      window.location.href = '/login';
    }
  
    const hanleFilterMember = async (value: string) => {
      setFilter(value);
  };

    useEffect(() => {
      const fetchCategories = async () => { 
        try {
          const allEmployees: any = await employeeUseCases.getAll({});
          setEmployees(allEmployees);
        } catch (error) {
          toast({
            title: "Error",
            description: "Falló la obtención de empleados.",
            className:"bg-[#CC7751] text-white"
        }) 
        }
      };
      fetchCategories();
    },[]);

    const handleDelete = async (id: string) => {
      const employeeUseCases = new EmployeeUseCase(new ApiEmployeeRepository());
      try {
          await employeeUseCases.delete(id);
          toast({
            title: "Éxito",
            description: "Empleado eliminado exitosamente.",
            className:"bg-[#518893] text-white"
          })   
      } catch (error) {
        toast({
          title: "Éxito",
          description: "Falló la eliminación del empleado.",
          className:"bg-[#CC7751] text-white"
        })
      }
      await employeeUseCases.getAll(filter);      
    };

    useEffect(() => { 
      const fetchCategories = async () => { 
        const data: any = await employeeUseCases.getAll(filter);
        setEmployees(data);
      };
      fetchCategories();
    },[filter]);

    return (
        <ContentLayout title='Empleados'>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                        <a href="/dashboard">Dashboard</a>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage><strong>Empleados</strong></BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="w-full px-2">
                <DataTable data={employees} onChangeFilter={hanleFilterMember} onDelete={handleDelete}/>
            </div>
        </ContentLayout>
    ); 
}; 

export default EmployeesPage