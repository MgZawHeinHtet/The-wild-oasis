import { useMutation } from "@tanstack/react-query";
import { signupForm as signupApi} from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup(){
    const {mutate:signup,isLoading} = useMutation(
        {
            mutationFn : signupApi,
            onSuccess : ()=> {
                toast.success('Account succesfully created! pls verify the new account from the user email address.')
            }
        }
    )
    return {signup,isLoading}
}