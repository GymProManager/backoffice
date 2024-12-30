import axios from 'axios'; 
import { CONFIG } from '@/Config'
import IEmployeeRepository from '../domain/interfaces/IEmployeeRepository';
import { Employee } from '../domain/entities/Employee';

export class ApiEmployeeRepository implements IEmployeeRepository {
    async getAll(filter: any): Promise<Employee[]> {
        let options: any = {};
        if (filter != '') {
            options = { params: { status: filter } };
        }
        const response:any  = await axios.get<Employee[]>(`${CONFIG.API_URL}/empleado`, options); 
        return response.data;
     }
     
    async findById(id: string): Promise<Employee> {
        const response:any  = await axios.get<Employee>(`${CONFIG.API_URL}/empleado/${id}`); 
        const adapterData = response.data.map((employee: any) => {
            employee.fecha_inicio = (employee.fecha_inicio && employee.fecha_inicio.split('T')[0]) ?? null;
            employee.fecha_alta = (employee.fecha_alta && employee.fecha_alta.split('T')[0]) ?? null;
            employee.avatar = !employee.avatar ? `/assets/images/member.png` : `${CONFIG.IMAGES_URL}${employee.avatar}`;
            employee.perfil = employee.perfil_socio;
            return employee;
        });
        return  adapterData[0]; 
    }

    async create(exercise: Employee): Promise<Employee> { 
      const result =  await axios.post(`${CONFIG.API_URL}/empleado/`, exercise); 
      return result.data;
    } 

    async update(id: string, employee: Employee): Promise<Employee>{ 
        try {
            await axios.put(`${CONFIG.API_URL}/empleado/${id}`, employee); 
        } catch (error: any) {
            throw new Error(error.response);
        }
        return employee;
    } 

    async delete(id: string): Promise<void> {
         await axios.delete(`${CONFIG.API_URL}/empleado/${id}`);
    }
  
 }