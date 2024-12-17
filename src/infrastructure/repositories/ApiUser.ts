import axios from 'axios'; 
import { CONFIG } from '@/Config'
import { User } from '@/core/entities/User';
import { UserRepository } from '@/core/interfaces/UserRepository';

export class ApiUserRepository implements UserRepository {
    async login(user: User): Promise<any> {
        const response:any  = await axios.post<any>(`${CONFIG.API_URL}/auth`,user); 
        return response.data
     }
}