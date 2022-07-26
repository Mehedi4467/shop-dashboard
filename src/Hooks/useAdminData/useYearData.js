import { useQuery } from "react-query";
const useYearData = (user) => {

    const { isLoading, data, refetch } = useQuery('monthOrders', () =>
        fetch(`http://localhost:5000/order/year/${user?.email}`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
    );
    return [data, isLoading, refetch];


}

export default useYearData;