import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export function useCheckOut(){
    const queryClient = useQueryClient()
    const {mutate:checkout, isLoading : isCheckingOut } = useMutation(
        {
            mutationFn : (bookingId) => updateBooking(bookingId,{
                status : "checked-out",
            }),
            onSuccess : (data)=> {
                toast.success(`Booking #${data.id} successfully check out`)
                queryClient.invalidateQueries({active:true})
             
            }

        }
    )
    return {checkout,isCheckingOut}
}