import { ProfileMember } from '../entities/ProfileMember';
import { ProfileMemberRepository } from '../interfaces/ProfileMemberRepository';

export class ProfileMemberUseCases {
  constructor(private profileRepository: ProfileMemberRepository) {}

  getAllProfiles(): Promise<ProfileMember[]> {
    const data:any = this.profileRepository.getAll();
    return data;
  }

  getProfileById(id: string): Promise<ProfileMember> {
    const data:any = this.profileRepository.getById(id);
    return data;
  }
  
  createProfile(profile: ProfileMember): Promise<ProfileMember> {
    return this.profileRepository.create(profile);
  }

  updateProfile(id: string, profile: ProfileMember): Promise<void> {
    return this.profileRepository.update(id, profile);
  }

  deleteProfile(id: string): Promise<void> {
    return this.profileRepository.delete(id);
  }

}
