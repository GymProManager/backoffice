import { User } from '../entities/User';
import { UserRepository } from '../interfaces/UserRepository';

export class UserUseCases {
  constructor(private userRepository: UserRepository) {}

  login(user: User): Promise<any> {
    return this.userRepository.login(user);
  }
}
