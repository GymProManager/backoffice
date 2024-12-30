// src/domain/usecases/ProductUseCase.ts

import IEmployeeRepository from "../interfaces/IEmployeeRepository";
import EmployeeDTO from "../../presentation/dto/EmployeeDTO";
import EmployeeMapper from "../mappers/EmployeeMapper";

class EmployeeUseCase {
  constructor(private repository: IEmployeeRepository) {}

  async create(employeeDTO: EmployeeDTO): Promise<EmployeeDTO> {
    const product = EmployeeMapper.toEntity(employeeDTO);
    const savedProduct = await this.repository.create(product);
    return EmployeeMapper.toDTO(savedProduct);
  }

  async getById(id: string): Promise<EmployeeDTO> {
    const product = await this.repository.findById(id);
    return EmployeeMapper.toDTO(product);
  }

  async getAll(filter: any): Promise<EmployeeDTO[]> {
    const employees = await this.repository.getAll(filter);
    const all = employees.map((employee) => EmployeeMapper.toDTO({
      ...employee,
    }));
    return all;
  }

  async update(id: string,productDTO: EmployeeDTO): Promise<EmployeeDTO> {
    const product = EmployeeMapper.toEntity(productDTO);
    const updatedProduct = await this.repository.update(id,product);
    return EmployeeMapper.toDTO(updatedProduct);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export default EmployeeUseCase;
