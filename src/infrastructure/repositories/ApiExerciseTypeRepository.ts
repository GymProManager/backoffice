import axios from 'axios'; 
import { ExerciseType } from '../../core/entities/ExerciseType'; 
import { ExerciseTypeRepository } from '@/core/interfaces/ExerciseTypeRepository';
import { CONFIG } from '@/Config';

export class ApiExerciseTypeRepository implements ExerciseTypeRepository {
    async getAll(): Promise<ExerciseType[]> { 
        const response:any  = await axios.get<ExerciseType[]>(`${CONFIG.API_URL}/exerciseType`); 
        return response.data; 
    }
    async create(exercisetype: ExerciseType): Promise<void> { 
        await axios.post(`${CONFIG.API_URL}/exerciseType`, exercisetype); } 
    async update(id: string, exercisetype: ExerciseType): Promise<void> { 
        await axios.put(`${`${CONFIG.API_URL}/exerciseType`}/${id}`, exercisetype); } 
    async delete(id: string): Promise<void> {
         await axios.delete(`${`${CONFIG.API_URL}/exerciseType`}/${id}`);
         }
 }