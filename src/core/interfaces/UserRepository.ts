import { User } from "../entities/User";

export interface UserRepository {
     login(user: User): Promise<any>;
}