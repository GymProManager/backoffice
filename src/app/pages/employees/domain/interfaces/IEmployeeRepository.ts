
import { Employee } from "../entities/Employee";

interface IEmployeeRepository {
  getAll(filter: any): Promise<Employee[]>;
  findById(id: string): Promise<Employee>;  
  create(employee: Employee): Promise<Employee>;  
  update(id: string, employee: Employee): Promise<Employee>;
  delete(id: string): Promise<void>;
}

export default IEmployeeRepository;
