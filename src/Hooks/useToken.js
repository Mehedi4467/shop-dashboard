import { useEffect, useState } from "react"

const useToken = (user, phone) => {
    const [token, setToken] = useState('');
    useEffect(() => {
        console.log(user)
        const email = user?.user.email;
        const name = user?.user.displayName;
        const currentUser = { email: email, phone: phone, name: name }
        console.log(currentUser);
        if (email && phone && name) {
            fetch(`http://localhost:5000/adminUser/${email}`, {
                method: "PUT",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(currentUser),
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                })


        }
    }, [user, phone])

    return [token];
}
export default useToken;