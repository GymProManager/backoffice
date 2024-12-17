import { ApiExerciseRepository } from "@/infrastructure/repositories/ApiExerciseRepository";
import ExerciseFormEdit from "../formEdit";
import { ExerciseUseCases } from "@/core/UseCases/ExerciseUseCases";
import { useParams } from "react-router-dom";
import React, { useEffect } from "react";

const ExerciseEditPage = () => {
    const [loading, setLoading] = React.useState(true)
    const [response, setResponse] = React.useState({})
    const param: any = useParams();
    const exerciseUseCases = new ExerciseUseCases(new ApiExerciseRepository());

    useEffect(() => {
     exerciseUseCases.getExerciseById(param.id).then(result => {
        setResponse(result);
        setLoading(false);
       }
    );
    },[]);
    
    return ( !loading &&  <ExerciseFormEdit entity={response} action={"edit"} /> )
};
export default ExerciseEditPage    