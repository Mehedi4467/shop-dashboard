import { useQuery } from "react-query";

const useAdminUserData = (email) => {
    const { isLoading, error, data, refetch } = useQuery('adminUser', () =>
        fetch(`http://localhost:5000/adminUser/user/${email}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => {

            return res.json();
        }
        )
    );

    return [data, isLoading, refetch, error]
}

export default useAdminUserData;