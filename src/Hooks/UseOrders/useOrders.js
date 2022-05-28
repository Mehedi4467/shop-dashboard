import { useEffect, useState } from "react";

const useOrders = (email, currentPage) => {
    const [orders, setOrders] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [totalItem, setTotalItem] = useState(0)
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {

        if (email) {

            fetch(`http://localhost:5000/order/${email}?name=${search.toLocaleLowerCase()}&page=${currentPage - 1}&status=${status}`, {
                method: "GET",
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setOrders(data);
                    const count = data.length;
                    const pages = Math.ceil(parseInt(count) / 10);
                    setPageCount(pages);
                    setTotalItem(count);

                })
        }
    }, [email, currentPage, search, status]);
    return [orders, pageCount, totalItem, setSearch, setStatus];
}
export default useOrders;