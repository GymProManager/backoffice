import React, { useEffect, useState } from 'react'; 
import { ContentLayout } from '../../../components/admin-panel/ContentLayout';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
  } from "../../../components/ui/breadcrumb";
import { DataTable } from './data-table';
import { ExerciseUseCases } from '@/core/UseCases/ExerciseUseCases';
import { ApiExerciseRepository } from '@/infrastructure/repositories/ApiExerciseRepository';
import { Exercise } from '@/core/entities/Exercise';
import { columns } from './columns';

function getToken() {
  const tokenString = sessionStorage.getItem('token') || "{}";
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}

const Exercises: React.FC = () => {
  const [product, setProduct] = useState<Exercise[]>([]);
   
  const exerciseUseCases = new ExerciseUseCases(new ApiExerciseRepository());
  const token = getToken();
    if(!token) {
      window.location.href = '/login';
    }

    useEffect(() => { const fetchCategories = async () => { 
      const data: any = await exerciseUseCases.getAllExercises()
      setProduct(data);
    };
      fetchCategories();
    },[]);

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
            <BreadcrumbPage><strong>Ejercicios</strong></BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
        </Breadcrumb>

        <div className="w-full px-2">
            <DataTable columns={columns} data={product} />
        </div>
        </ContentLayout>
    ); 
}; 

export default Exercises