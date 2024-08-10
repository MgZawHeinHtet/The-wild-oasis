import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signout as signOutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useSignout(){
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const {mutate:signout,isPending} = useMutation({
        mutationFn : signOutApi,
        onSuccess : ()=> {
            queryClient.removeQueries()
            navigate('/login',{replace:true})
        }
    })

    return {signout,isPending}
}