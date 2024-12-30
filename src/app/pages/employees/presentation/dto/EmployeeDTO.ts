class EmployeeDTO {
    constructor(
      public id: string | null | undefined,
      public nombre: string,
      public apellidos?: string,
      public fecha_inicio?: string, 
      public fecha_alta?: string ,
      public telefono?: string,
      public perfil?: string,
      public perfil_socio?: string,
      public foto?: string      
    ) {}
  }
  
  export default EmployeeDTO;
  
