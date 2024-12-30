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
import { MemberUseCases } from '@/core/UseCases/MemberUseCases';
import { ApiMemberRepository } from '@/infrastructure/repositories/ApiMemberRepository';
import { DataTable } from './DataTable';
import { columns } from './Columns';
import { ApiEmployeeRepository } from '../infrastructure/EmployeeRepository';
import EmployeeUseCase from '../domain/usecases/EmployeeUseCase';

function getToken() {
  const tokenString = sessionStorage.getItem('token') || "{}";
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}

const EmployeesPage: React.FC = () => {
  const [product, setProduct] = useState<Exercise[]>([]);
  const [filter, setFilter] = useState<any>("enable");
   
  const employeeUseCases = new EmployeeUseCase(new ApiEmployeeRepository());
  const token = getToken();
    if(!token) {
      window.location.href = '/login';
    }

    useEffect(() => { const fetchCategories = async () => { 
      const data: any = await employeeUseCases.getAll({});
      setProduct(data);
    };
      fetchCategories();
    },[]);

    const hanleFilterMember = async (value: string) => {
      setFilter(value);
    };

    useEffect(() => { 
      const fetchCategories = async () => { 
        const data: any = await employeeUseCases.getAll(filter);
        setProduct(data);
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
            <DataTable columns={columns} data={product} onChangeFilter={hanleFilterMember}/>
        </div>
        </ContentLayout>
    ); 
}; 

export default EmployeesPage