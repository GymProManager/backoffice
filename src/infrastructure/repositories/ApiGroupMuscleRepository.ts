import axios from 'axios'; 
import { GroupMuscle } from '@/core/entities/GroupMuscle';
import { GroupMuscleRepository } from '@/core/interfaces/GroupMuscleRepository';
import { CONFIG } from '@/Config';

export class ApiGroupMuscleRepository implements GroupMuscleRepository {
    async getAll(): Promise<GroupMuscle[]> { 
        const response:any  = await axios.get<GroupMuscle[]>(`${CONFIG.API_URL}/groupMuscle`); 
        return response.data; 
    }
    async create(groupMuscle: GroupMuscle): Promise<void> { 
        await axios.post(`${CONFIG.API_URL}/groupMuscle`, groupMuscle); } 
    async update(id: string, groupMuscle: GroupMuscle): Promise<void> { 
        await axios.put(`${CONFIG.API_URL}/groupMuscle/${id}`, groupMuscle); } 
    async delete(id: string): Promise<void> {
         await axios.delete(`${CONFIG.API_URL}/groupMuscle/${id}`);
         }
 }