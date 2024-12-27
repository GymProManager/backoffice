import { ProfileMember } from '../entities/ProfileMember';

export interface ProfileMemberRepository {
     getAll(): Promise<ProfileMember[]>; 
     getById(id: string): Promise<ProfileMember>;
     create(profile: ProfileMember): Promise<ProfileMember>;
     update(id: string, profile: ProfileMember): Promise<void>; 
     delete(id: string): Promise<void>;
}