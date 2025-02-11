import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constant";

export function useBooking() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  //filter
  const filterValue = searchParams.get("status");

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  //sorting

  const sortingValue = searchParams.get('sortBy') || 'startDate-desc';

  const [field,direction] = sortingValue.split("-");

  const sortBy = {field,direction}

  //range for pagination

  const page = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));


  const {
    isLoading,
    data : {data : bookings , count} = {},
    error
  } = useQuery({
    queryKey: ["bookings", filter, sortBy,page],
    queryFn: () => getBookings({ filter, sortBy,page }),
  });

  const pageCount = Math.ceil(count / PAGE_SIZE);

  
  if(page < pageCount)
  queryClient.prefetchQuery(
    {
      queryKey: ["bookings", filter, sortBy,page+1],
      queryFn: () => getBookings({ filter, sortBy,page : page+1 })
    }
  )

  if(page > 1)
    queryClient.prefetchQuery(
      {
        queryKey: ["bookings", filter, sortBy,page-1],
        queryFn: () => getBookings({ filter, sortBy,page : page - 1 })
      }
    )
  

  return { bookings, isLoading, error ,count};
}
