import axios from 'axios'; 
import { CONFIG } from '@/Config'
import { Member } from '@/core/entities/Member';
import { MemberRepository } from '@/core/interfaces/MemberRepository';

export class ApiMemberRepository implements MemberRepository {
    async getAll(filter: any): Promise<Member[]> {
        let options: any = {};
        if (filter != '') {
            options = { params: { status: filter } };
        }
        const response:any  = await axios.get<Member[]>(`${CONFIG.API_URL}/socio`, options); 
        return response.data;
     }
    async getById(id: string): Promise<Member> {
        const response:any  = await axios.get<Member>(`${CONFIG.API_URL}/socio/${id}`); 
        const adapterData = response.data.map((member: any) => {
            member.fecha_inicio =member.fecha_inicio.split('T')[0];
            member.fecha_alta = member.fecha_alta.split('T')[0];
            member.avatar = !member.avatar ? `/assets/images/member.png` : `${CONFIG.IMAGES_URL}${member.avatar}`;
            member.perfil = member.perfil_socio;
            return member;
        });
        return  adapterData[0]; 
    }

    async create(exercise: Member): Promise<Member> { 
      const result =  await axios.post(`${CONFIG.API_URL}/socio/`, exercise); 
      return result.data;
    } 

    async update(id: string, member: Member): Promise<void> { 
        try {
            await axios.put(`${CONFIG.API_URL}/socio/${id}`, member); 
        } catch (error: any) {
            throw new Error(error.response);
        }
    } 

    async delete(id: string): Promise<void> {
         await axios.delete(`${CONFIG.API_URL}/socio/${id}`);
    }
    
    async import(member: Member): Promise<Member | string> { 
        try {
            const result =  await axios.post(`${CONFIG.API_URL}/socio/:id`, member); 
            return result.data;
        } catch (error: any) {
            return error.response.data.error;
        }
    }     
 }