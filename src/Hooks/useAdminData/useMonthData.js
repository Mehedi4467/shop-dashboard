import { useEffect, useState } from "react";



const useMonthData = (user) => {

    const [monthData, setMonthData] = useState([]);
    const [monthLoading, setMonthLoading] = useState(false)
    useEffect(() => {
        setMonthLoading(true);
        if (user?.email) {
            fetch(`http://localhost:5000/order/month/${user?.email}`, {
                method: "GET",
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setMonthData(data);
                    setMonthLoading(false)
                })
        }

    }, [user])

    return [monthData, monthLoading];

}
export default useMonthData;