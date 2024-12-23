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
import { Exercise } from '@/core/entities/Exercise';
import { columns } from './Columns';
import { DataTable } from './DataTable';
import { MemberUseCases } from '@/core/UseCases/MemberUseCases';
import { ApiMemberRepository } from '@/infrastructure/repositories/ApiMemberRepository';

function getToken() {
  const tokenString = sessionStorage.getItem('token') || "{}";
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}

const MermbersPage: React.FC = () => {
  const [product, setProduct] = useState<Exercise[]>([]);
  const [filter, setFilter] = useState<any>("enable");
   
  const memberUseCases = new MemberUseCases(new ApiMemberRepository());
  const token = getToken();
    if(!token) {
      window.location.href = '/login';
    }

    useEffect(() => { const fetchCategories = async () => { 
      const data: any = await memberUseCases.getAllMermbers({});
      setProduct(data);
    };
      fetchCategories();
    },[]);

    const hanleFilterMember = async (value: string) => {
      setFilter(value);
    };

    useEffect(() => { 
      const fetchCategories = async () => { 
        const data: any = await memberUseCases.getAllMermbers(filter);
        setProduct(data);
      };
      fetchCategories();
    },[filter]);

    return (
        <ContentLayout title='Socios'>
            <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <a href="/dashboard">Dashboard</a>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage><strong>Socios</strong></BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
        </Breadcrumb>

        <div className="w-full px-2">
            <DataTable columns={columns} data={product} onChangeFilter={hanleFilterMember}/>
        </div>
        </ContentLayout>
    ); 
}; 

export default MermbersPage