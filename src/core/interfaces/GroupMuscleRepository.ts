import { GroupMuscle } from '../entities/GroupMuscle';

export interface GroupMuscleRepository {
     getAll(): Promise<GroupMuscle[]>; 
     create(groupMuscle: GroupMuscle): Promise<void>;
     update(id: string, groupMuscle: GroupMuscle): Promise<void>; 
     delete(id: string): Promise<void>;
}