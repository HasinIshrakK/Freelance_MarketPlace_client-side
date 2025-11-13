import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const instance = axios.create(
    {
        baseURL: import.meta.env.VITE_API_URL,
    },
);

const useAxiosSecure = () => {
    const { user, logout } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        const requestInterceptor = instance.interceptors.request.use(config => {
            config.headers.authorization = `Bearer ${user.accessToken}`
            return config;
        })

        const responseInterceptor = instance.interceptors.response.use(res => {
            return res;
        }, err => {
            const status = err.response?.status;
            if (status === 401 || status === 403) {
                logout()
                    .then(
                        () => {
                            navigate('/auth/login')
                        }
                    )
            }
        })

        return () => {
            instance.interceptors.request.eject(requestInterceptor)
            instance.interceptors.response.eject(responseInterceptor)
        }

    }, [user]);

    return instance;
};

export default useAxiosSecure;