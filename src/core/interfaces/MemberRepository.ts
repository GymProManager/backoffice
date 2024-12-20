import { Member } from '../entities/Member';

export interface MemberRepository {
     getAll(): Promise<Member[]>; 
     getById(id: string): Promise<Member>;
     create(member: Member): Promise<Member>;
     update(id: string, member: Member): Promise<void>; 
     delete(id: string): Promise<void>;
}