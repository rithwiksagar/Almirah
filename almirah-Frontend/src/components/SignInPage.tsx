import axios from 'axios';
import type { signupProps } from '../pages/authentication';
import { Button } from './ui/Button';
import { InputBox } from './ui/inputBox';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

type userTypes = {
  email: string;
  password: string;
};
//signIn page
export const SignInPage = ({ signUp, setSignUp }: signupProps) => {
  const { register, handleSubmit } = useForm<userTypes>();
  const navigate = useNavigate();
  async function signUser({ email, password }: userTypes) {
    const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
      email,
      password,
    });
    if (response.status === 200) {
      const token = response.data.token;
      localStorage.setItem('token', token);
      alert(response.data.message);
      navigate('/desktop');
    }
  }
  //single endpoint "/authentication" and toggling between signin and signup
  return (
    <div className="bg-white w-86 max-h-132 border-2 shadow-[4px_4px_0px_#000] rounded-sm pb-2">
      <div className="pt-8">
        <p className="font-semibold font-clashdisplay text-3xl text-center">
          Welcome Back
        </p>
        <p className="font-clashdisplay text-center text-xs text-slate-600 ">
          Take a look at your Almirah
        </p>
      </div>
      <div className="border-b border-gray-400 w-72 mx-auto pt-6" />

      <form className="pt-6 pl-8 space-y-6" onSubmit={handleSubmit(signUser)}>
        <div>
          <p className="font-clashdisplay text-sm font-medium">Email*</p>
          <InputBox
            {...register('email', { required: true })}
            variant="secondary"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <p className="font-clashdisplay text-sm font-medium">Password*</p>
          <InputBox
            {...register('password', { required: true })}
            type="password"
            variant="secondary"
            placeholder="Enter your password"
          />
          <p className="font-clashdisplay text-xs pt-1 text-slate-600">
            *Minimum 8 characters
          </p>
        </div>
        <div className="pl-20">
          <Button type="submit" variant="secondary" size="md" title="Log in" />
        </div>
      </form>
      <div className="text-sm font-clashdisplay pl-16 pt-6 space-x-1">
        <span className="text-slate-600">Don't have an account?</span>
        <span
          className="font-semibold cursor-pointer"
          onClick={() => {
            setSignUp(!signUp);
          }}
        >
          Sign up
        </span>
      </div>
    </div>
  );
};
