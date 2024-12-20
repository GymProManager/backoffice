import { ExerciseRepository } from '../interfaces/ExerciseRepository';
import { Exercise } from '../entities/Exercise';

export class ExerciseUseCases {
  constructor(private exerciseRepository: ExerciseRepository) {}

  getAllExercises(): Promise<Exercise[]> {
    const data:any = this.exerciseRepository.getAll();
    return data;
  }

  getExerciseById(id: string): Promise<Exercise> {
    const data:any = this.exerciseRepository.getById(id);
    return data;
  }
  
  createExercise(exercise: Exercise): Promise<Exercise> {
    return this.exerciseRepository.create(exercise);
  }

  updateExercise(id: string, exercise: Exercise): Promise<void> {
    return this.exerciseRepository.update(id, exercise);
  }

  deleteExercise(id: string): Promise<void> {
    return this.exerciseRepository.delete(id);
  }

  importExercise(exercise: Exercise): Promise<any> {
    return this.exerciseRepository.import(exercise);
  }
}
