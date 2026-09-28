// import axios from "axios";

// const apiClient = axios.create({
//     baseURL: process.env.EXPO_PUBLIC_API_URL,
//     headers: {
//         "Content-Type": "application/json",
//     },
// });

// export default apiClient;


import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://localhost:7108/api",
    headers: {
        "Content-Type": "application/json",
    },
});

console.log("API BASE URL:", apiClient.defaults.baseURL);

export default apiClient;