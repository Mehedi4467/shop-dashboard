import { useEffect, useState } from "react";

const useOrders = email => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {

        if (email) {

            fetch(`http://localhost:5000/order/${email}`, {
                method: "GET",
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setOrders(data)
                })
        }
    }, [email]);

    return [orders];
}
export default useOrders;