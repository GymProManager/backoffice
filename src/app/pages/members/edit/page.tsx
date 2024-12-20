import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import MemberFormEdit from "../FormEdit";
import { MemberUseCases } from "@/core/UseCases/MemberUseCases";
import { ApiMemberRepository } from "@/infrastructure/repositories/ApiMemberRepository";

const MemberEditPage = () => {
    const [loading, setLoading] = React.useState(true)
    const [response, setResponse] = React.useState({})
    const param: any = useParams();

    const memberUseCases = new MemberUseCases(new ApiMemberRepository());

    useEffect(() => {
        memberUseCases.getMermberById(param.id).then((result) => {
        setResponse(result);
        setLoading(false);
       }
    );
    },[]);
    
    return ( !loading &&  <MemberFormEdit entity={response} action={"edit"} /> )
};
export default MemberEditPage    