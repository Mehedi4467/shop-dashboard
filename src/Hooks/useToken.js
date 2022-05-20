import { useEffect, useState } from "react"

const useToken = (user) => {
    const [token, setToken] = useState('');


    useEffect(() => {

        const email = user?.user?.email;
        const name = user?.user?.displayName;
        const emailVerified = user?.user?.emailVerified;
        const creationTime = user?.user?.metadata?.creationTime;

        const currentUser = {
            email: email, name: name, emailVerified: emailVerified, status: "Pending", creationTime: creationTime
        }
        console.log(currentUser)
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
                    setToken(accessToken);

                })


        }
    }, [user, user?.user?.displayName])

    return [token];
}
export default useToken;