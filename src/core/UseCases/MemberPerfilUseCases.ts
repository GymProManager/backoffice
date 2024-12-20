import { MemberPerfilRepository } from '../interfaces/MemberPerfilRepository';

export class MemberPerfilUseCases {
  constructor(private perfilsRepository: MemberPerfilRepository) {}

  getAll(): Promise<any[]> {
    const data:any = this.perfilsRepository.getAll();
    return data;
  }
}
