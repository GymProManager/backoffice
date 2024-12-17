import { ExerciseType } from '../entities/ExerciseType';

export interface ExerciseTypeRepository {
     getAll(): Promise<ExerciseType[]>; 
     create(exercisetype: ExerciseType): Promise<void>;
     update(id: string, exercisetype: ExerciseType): Promise<void>; 
     delete(id: string): Promise<void>;
}