import { Member } from '../entities/Member';
import { MemberRepository } from '../interfaces/MemberRepository';

export class MemberUseCases {
  constructor(private exerciseRepository: MemberRepository) {}

  getAllMermbers(filter: any): Promise<Member[]> {
    const data:any = this.exerciseRepository.getAll(filter);
    return data;
  }

  getMermberById(id: string): Promise<Member> {
    const data:any = this.exerciseRepository.getById(id);
    return data;
  }
  
  createMermber(exercise: Member): Promise<Member> {
    return this.exerciseRepository.create(exercise);
  }

  updateMermber(id: string, exercise: Member): Promise<void> {
    return this.exerciseRepository.update(id, exercise);
  }

  deleteMermber(id: string): Promise<void> {
    return this.exerciseRepository.delete(id);
  }

}
