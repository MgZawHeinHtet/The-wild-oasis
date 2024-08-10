import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSettings(){
    const queryClient = useQueryClient()

    const {isPending:isUpdating,mutate:mutateUpdateSetting} = useMutation({
        mutationFn : updateSetting,
        onSuccess : ()=>{
            toast.success('update setting succesfully')
            queryClient.invalidateQueries({
                queryKey : ['settings']
            })
        },
        onError : (err)=>{
            toast.error(err.message)
        }
    })

    return {isUpdating,mutateUpdateSetting}
}