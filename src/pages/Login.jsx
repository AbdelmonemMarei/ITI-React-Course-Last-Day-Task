import React from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { useAuth } from "../Auth/AuthProvider";
import { Link } from "react-router-dom";

function Login() {
    const {loginAction} = useAuth();

    const schema = yup.object({
        username: yup.string().required("Username is required"),
        password: yup.string().required('Password is required'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema)
    });


    const onSubmit = (user) => {
        if (user.username !== "" && user.password !== "") {
            loginAction(user);
        } 
    };

    return (
        <div className='container d-flex flex-column justify-content-center align-items-center' style={{height:'90vh' ,backgroundColor:'white'}}>
            <h1 className="fw-bolder text-dark mb-5">Login</h1>            
            <form onSubmit={handleSubmit(onSubmit)} className="container mt-4 w-100 w-md-50">
                <div>
                    <input
                        {...register("username")}
                        placeholder="Enter your username"
                    />
                    <p>{errors.username?.message}</p>
                </div>
                <div>
                    <input
                        type="password"
                        {...register("password")}
                        placeholder="Enter your password"
                    />
                    <p>{errors.password?.message}</p>
                </div>
                <p>Don't have an account? <Link to="/register">Register</Link></p>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;