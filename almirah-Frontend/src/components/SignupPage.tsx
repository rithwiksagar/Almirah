import { useForm } from "react-hook-form";
import { Button } from "./ui/Button";
import { InputBox } from "./ui/inputBox";
import type { signupProps } from "../pages/authentication";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

type userTypes = {
    username: string,
    password: string,
    email: string,
}

//signup Page
export const SignUpPage = ({ signUp, setSignUp }: signupProps) => {
    const { register, handleSubmit } = useForm<userTypes>();
    const navigate = useNavigate()
    async function signUser({ username, email, password }: userTypes) {
        const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            username,
            email,
            password
        });

        //assigning the token
        const token = response.data.token;
        localStorage.setItem("token", token);
        if (token) {
            alert("Successfully signed up")
            navigate("/desktop");
        }
        else {
            alert(response.data.message)
        }

    }
    return <div className="w-86 h-128 bg-white border-2 shadow-[4px_4px_0px_#000] rounded-sm">
        <div className="pt-8">
            <p className="font-semibold font-clashdisplay text-3xl text-center">Create Account</p>
            <p className="font-clashdisplay text-center text-xs text-slate-600">Enter your details to create your account</p>
        </div>
        <div className="border-b border-gray-400 w-72 mx-auto pt-6"></div>
        <form className="pt-6 pl-8 space-y-6" onSubmit={handleSubmit(signUser)}>
            <div>
                <p className="font-clashdisplay text-sm font-medium">Username*</p>
                <InputBox {...register("username", { required: true })} variant="secondary" placeholder="Enter your name" />
            </div>
            <div>
                <p className="font-clashdisplay text-sm font-medium">Email*</p>
                <InputBox {...register("email", { required: true })} variant="secondary" placeholder="Enter your email" />
            </div>
            <div>
                <p className="font-clashdisplay text-sm font-medium">Password*</p>
                <InputBox {...register("password", { required: true })} type="password" variant="secondary" placeholder="Enter your password" />
                <p className="font-clashdisplay text-xs pt-1 text-slate-600">*Minimum 8 characters</p>
            </div>
            <div className="pl-18">
                <Button type="submit" variant="secondary" size="md" title="Sign up" />
            </div>
        </form>
        <div className="text-sm font-clashdisplay pl-16 space-x-1 pt-6">
            <span className="text-slate-600">Already have an account?</span>
            <span className="font-semibold cursor-pointer" onClick={() => { setSignUp(!signUp) }}>Log in</span>
        </div>

    </div>
}