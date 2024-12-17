// src/core/usecases/ProductUseCases.ts
import { ExerciseType } from '../entities/ExerciseType';
import { ExerciseTypeRepository } from '../interfaces/ExerciseTypeRepository';

export class ExerciseTypeUseCases {
  constructor(private exerciseTypeRepository: ExerciseTypeRepository) {}

  getAll(): Promise<ExerciseType[]> {
    return this.exerciseTypeRepository.getAll();
  }

  createProduct(exerciseType: ExerciseType): Promise<void> {
    return this.exerciseTypeRepository.create(exerciseType);
  }

  updateProduct(id: string, exerciseType: ExerciseType): Promise<void> {
    return this.exerciseTypeRepository.update(id, exerciseType);
  }

  deleteProduct(id: string): Promise<void> {
    return this.exerciseTypeRepository.delete(id);
  }
}
