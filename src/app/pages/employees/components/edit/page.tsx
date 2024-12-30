import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import MemberFormEdit from "../FormEdit";
import { ApiEmployeeRepository } from "../../infrastructure/EmployeeRepository";
import EmployeeUseCase from "../../domain/usecases/EmployeeUseCase";

const EmployeeEditPage = () => {
    const [loading, setLoading] = React.useState(true)
    const [response, setResponse] = React.useState({})
    const param: any = useParams();

    const employeeUseCases = new EmployeeUseCase(new ApiEmployeeRepository());

    useEffect(() => {
        employeeUseCases.getById(param.id).then((result) => {
        setResponse(result);
        setLoading(false);
       }
    );
    },[]);
    
    return ( !loading &&  <MemberFormEdit entity={response} action={"edit"} /> )
};
export default EmployeeEditPage    