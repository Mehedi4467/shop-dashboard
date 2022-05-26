import { useEffect, useState } from "react";
// import { useQuery } from "react-query";

const useAdminUserData = (email) => {
    const [data, setData] = useState([]);
    const [adminLoadingData, setAdminLoading] = useState(false);

    useEffect(() => {
        if (email) {
            setAdminLoading(true)
            fetch(`http://localhost:5000/adminUser/user/${email}`, {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(res => res.json())
                .then(datas => {

                    setData(datas);
                    setAdminLoading(false)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }, [email])


    // const { isLoading, error, data, refetch } = useQuery(['adminUserData'], () => {
    //     if (email) {
    //         fetch(`http://localhost:5000/adminUser/user/${email}`, {
    //             method: 'GET',
    //             headers: {
    //                 authorization: `Bearer ${localStorage.getItem('accessToken')}`
    //             }
    //         }).then(res => res.json())
    //     }
    // }
    // );


    return [data, adminLoadingData];


}

export default useAdminUserData;