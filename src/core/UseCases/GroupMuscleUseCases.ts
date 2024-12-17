// src/core/usecases/ProductUseCases.ts
import { GroupMuscle } from '../entities/GroupMuscle';
import { GroupMuscleRepository } from '../interfaces/GroupMuscleRepository';

export class GroupMuscleUseCases {
  constructor(private exerciseTypeRepository: GroupMuscleRepository) {}

  getAll(): Promise<GroupMuscle[]> {
    return this.exerciseTypeRepository.getAll();
  }

  createProduct(groupMuscle: GroupMuscle): Promise<void> {
    return this.exerciseTypeRepository.create(groupMuscle);
  }

  updateProduct(id: string, groupMuscle: GroupMuscle): Promise<void> {
    return this.exerciseTypeRepository.update(id, groupMuscle);
  }

  deleteProduct(id: string): Promise<void> {
    return this.exerciseTypeRepository.delete(id);
  }
}
