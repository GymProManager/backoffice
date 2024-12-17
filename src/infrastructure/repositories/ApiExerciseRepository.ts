import axios from 'axios'; 
import { Exercise } from '../../core/entities/Exercise'; 
import { ExerciseRepository } from '../../core/interfaces/ExerciseRepository';
import { CONFIG } from '@/Config'

export class ApiExerciseRepository implements ExerciseRepository {
    async getAll(): Promise<Exercise[]> { 
        const response:any  = await axios.get<Exercise[]>(`${CONFIG.API_URL}/exercise`); 
        const adapterData = response.data.map((product: Exercise) => {
            product.miniature = !product.miniature ? `${CONFIG.IMAGES_URL}/uploads/images/default.png` : product.miniature;
            product.cover = !product.cover ? '' : product.cover;

            return product;
        });
        return adapterData; }
    async getById(id: string): Promise<Exercise> {
        const response:any  = await axios.get<Exercise>(`${CONFIG.API_URL}/exercise/${id}`); 
        const adapterData = response.data.map((exercise: any) => {
            exercise.miniature = !exercise.miniature ? `${CONFIG.IMAGES_URL}/uploads/images/default.png` : `${CONFIG.IMAGES_URL}${exercise.miniature}`;
            exercise.cover = !exercise.cover ? `${CONFIG.IMAGES_URL}/uploads/images/default.png` : `${CONFIG.IMAGES_URL}${exercise.cover}`;
            exercise.typeexercise = !exercise.typeexercise ? '' : exercise.typeexercise?.id;
            exercise.groupmuscle = !exercise.groupmuscle ? '' : exercise.groupmuscle?.id;
            return exercise;
        });
        return adapterData[0]; }
    async create(exercise: Exercise): Promise<Exercise> { 
      const result =  await axios.post(`${CONFIG.API_URL}/exercise/`, exercise); 
      return result.data;
    } 
    async update(id: string, exercise: Exercise): Promise<void> { 
        try {
            await axios.put(`${CONFIG.API_URL}/exercise/${id}`, exercise); 
        } catch (error: any) {
            throw new Error(error.response);
        }
    } 

    async delete(id: string): Promise<void> {
         await axios.delete(`${CONFIG.API_URL}/exercise/${id}`);
    }
    async import(exercise: Exercise): Promise<Exercise | string> { 
        try {
            const result =  await axios.post(`${CONFIG.API_URL}/exercise/import`, exercise); 
            return result.data;
        } catch (error: any) {
            return error.response.data.error;
        }
    }     
 }