import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../Auth/AuthProvider";
import {Link} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function Register() {

    const { registerAction } = useAuth();

    const {
        register,
        handleSubmit,
        watch, 
        formState: { errors },
    } = useForm();

    const password = watch("password"); 

    const onSubmit = (user) => {
        registerAction(user);
    };

    return (
        <div className='container d-flex flex-column justify-content-center align-items-center' style={{ height: '90vh', backgroundColor: 'white' }}>
            <h1 className="fw-bolder text-dark mb-5">Register</h1>
            <form
                className="container mt-4 w-100 w-md-50"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="mb-3">
                    <label className="form-label">Your Name</label>
                    <input
                        {...register("username", { required: "First name is required" })}
                        className={`form-control ${errors.username ? "is-invalid" : ""} `}
                    />
                    {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{3,}$/i,
                                message: "Invalid email address",
                            },
                        })}
                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters",
                            },
                        })}
                        className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input
                        type="password"
                        {...register("confirmPassword", {
                            required: "Confirm password is required",
                            validate: (value) => value === password || "Passwords do not match",
                        })}
                        className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                    />
                    {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword.message}</div>}
                </div>

                <p>Don you have an account? <Link to="/login">Login</Link></p>

                <button type="submit" >
                    Register
                </button>
            </form>
        </div>
    );
}

export default Register;
