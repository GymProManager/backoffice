import axios from 'axios'; 
import { CONFIG } from '@/Config'
import { MemberPerfilRepository } from '@/core/interfaces/MemberPerfilRepository';

export class ApiMemberPerfilRepository implements MemberPerfilRepository {
    async getAll(): Promise<any[]> { 
        const response:any  = await axios.get<any[]>(`${CONFIG.API_URL}/perfil-socio`); 
        return response.data;
     }
 }