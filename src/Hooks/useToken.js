import { useEffect, useState } from "react"

const useToken = (user) => {
    const [token, setToken] = useState('');


    useEffect(() => {

        const email = user?.user?.email;
        const emailVerified = user?.user?.emailVerified;
        const creationTime = user?.user?.metadata?.creationTime;

        const currentUser = {
            email: email, emailVerified: emailVerified, creationTime: creationTime
        }
        console.log(currentUser)
        if (email) {
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
                    setToken(accessToken);

                })
        }
    }, [user])

    return [token];
}
export default useToken;