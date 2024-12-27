import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import ProfileFormEdit from "../FormEdit";
import { ProfileMemberUseCases } from "@/core/UseCases/ProfileMemberUseCases";
import { ApiProfileMemberRepository } from "@/infrastructure/repositories/ApiProfileMemberRepository";

const ProfileMemberEditPage = () => {
    const [loading, setLoading] = React.useState(true)
    const [response, setResponse] = React.useState({})
    const param: any = useParams();

    const profileUseCases = new ProfileMemberUseCases(new ApiProfileMemberRepository());

    useEffect(() => {
        profileUseCases.getProfileById(param.id).then((result) => {
        setResponse(result);
        setLoading(false);
       }
    );
    },[]);
    
    return ( !loading &&  <ProfileFormEdit entity={response} action={"edit"} /> )
};
export default ProfileMemberEditPage    