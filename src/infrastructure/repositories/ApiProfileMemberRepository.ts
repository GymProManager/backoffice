import axios from 'axios'; 
import { CONFIG } from '@/Config'
import { ProfileMemberRepository } from '@/core/interfaces/ProfileMemberRepository';
import { ProfileMember } from '@/core/entities/ProfileMember';

export class ApiProfileMemberRepository implements ProfileMemberRepository {
    async getAll(): Promise<ProfileMember[]> { 
        const response:any  = await axios.get<ProfileMember[]>(`${CONFIG.API_URL}/perfil-socio`); 
        return  response.data;
     }
    async getById(id: string): Promise<ProfileMember> {
        const response:any  = await axios.get<ProfileMember>(`${CONFIG.API_URL}/perfil-socio/${id}`); 
        return response.data[0];
     }

    async create(profile: ProfileMember): Promise<ProfileMember> { 
      const result =  await axios.post(`${CONFIG.API_URL}/perfil-socio/`, profile); 
      return result.data;
    }
     
    async update(id: string, profile: ProfileMember): Promise<void> { 
        try {
            await axios.put(`${CONFIG.API_URL}/perfil-socio/${id}`, profile); 
        } catch (error: any) {
            throw new Error(error.response);
        }
    } 

    async delete(id: string): Promise<void> {
         await axios.delete(`${CONFIG.API_URL}/perfil-socio/${id}`);
    }
 }