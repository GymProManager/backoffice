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
import { ProfileMemberUseCases } from '@/core/UseCases/ProfileMemberUseCases';
import { ApiProfileMemberRepository } from '@/infrastructure/repositories/ApiProfileMemberRepository';

function getToken() {
  const tokenString = sessionStorage.getItem('token') || "{}";
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}

const ProfilesPage: React.FC = () => {
  const [product, setProduct] = useState<Exercise[]>([]);
   
  const profileUseCases = new ProfileMemberUseCases(new ApiProfileMemberRepository());
  const token = getToken();
    if(!token) {
      window.location.href = '/login';
    }

    useEffect(() => { const fetchCategories = async () => { 
      const data: any = await profileUseCases.getAllProfiles();
      setProduct(data);
    };
      fetchCategories();
    },[]);


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
            <BreadcrumbPage><strong>Perfiles de socios</strong></BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
        </Breadcrumb>

        <div className="w-full px-2">
            <DataTable columns={columns} data={product} />
        </div>
        </ContentLayout>
    ); 
}; 

export default ProfilesPage