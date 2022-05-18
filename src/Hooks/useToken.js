import { useEffect, useState } from "react"

const useToken = (user) => {
    const [token, setToken] = useState('');
    useEffect(() => {

        const email = user?.user.email;
        const name = user?.user.displayName;
        const status = user?.user.emailVerified;
        const currentUser = { email: email, name: name, status: status }
        console.log(currentUser);
        if (email && name) {
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
                    const accessToken = data.token;
                    localStorage.setItem("accessToken", accessToken);
                    setToken(accessToken)
                })


        }
    }, [user])

    return [token];
}
export default useToken;