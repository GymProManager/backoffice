
import { Employee } from "../entities/Employee";
import EmployeeDTO from "../../presentation/dto/EmployeeDTO";

class EmployeeMapper {
  static toEntity(dto: EmployeeDTO): Employee {
    return {
      _id: dto.id,
      nombre: dto.nombre,
      apellidos: dto.apellidos,
      fecha_inicio: dto.fecha_inicio,
      fecha_alta: dto.fecha_alta,
      telefono: dto.telefono,
      perfil: dto.perfil,
      perfil_socio: dto.perfil_socio,
      avatar: dto.foto
    } as Employee;
  }

  static toDTO(entity: Employee): EmployeeDTO {
    return new EmployeeDTO(
      entity._id,
      entity.nombre,
      entity.apellidos,
      entity.fecha_inicio,
      entity.fecha_alta, 
      entity.telefono, 
      entity.perfil, 
      entity.perfil_socio, 
      entity.foto
    );
  }
}

export default EmployeeMapper;
