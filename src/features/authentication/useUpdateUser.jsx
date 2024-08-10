import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { updateCurrentUser } from "../../services/apiAuth"


export function useUpdateUser() {
    const queryClient = useQueryClient()

    const { mutate: updateUser, isPending: isUpdating } =
        useMutation({
            mutationFn: ({ fullName,avatar, password}) => updateCurrentUser({fullName,avatar,password}),
            onSuccess: ({user}) => {
                toast.success('Your changes updated successfully')
                queryClient.setQueryData('user',user);
                queryClient.invalidateQueries({
                    queryKey: ['user']
                })
            },
            onError: (error) => toast.error(error.message)
        })

    return {updateUser,isUpdating}
}