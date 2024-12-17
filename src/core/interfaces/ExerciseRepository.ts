import { Exercise } from '../entities/Exercise';

export interface ExerciseRepository {
     getAll(): Promise<Exercise[]>; 
     getById(id: string): Promise<Exercise>;
     create(exercise: Exercise): Promise<Exercise>;
     update(id: string, exercise: Exercise): Promise<void>; 
     delete(id: string): Promise<void>;
     import(exercise: Exercise): Promise<Exercise | string>;
}