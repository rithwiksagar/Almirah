import React from 'react';
import { SignInPage } from '../components/SignInPage';
import { SignUpPage } from '../components/SignupPage';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { signUpAtom } from '../storeAtoms/Atoms';

export type signupProps = {
  signUp: boolean;
  setSignUp: React.Dispatch<React.SetStateAction<boolean>>;
};

//authentication page for both signup and signin
export const Authentication = () => {
  const [signUp, setSignUp] = useRecoilState(signUpAtom);
  const navigate = useNavigate();
  return (
    <div className="h-screen bg-slate-50">
      <div
        onClick={() => {
          navigate('/');
        }}
        className=" text-2xl font-clashdisplay tracking-wider font-semibold p-6 w-fit rounded-md cursor-pointer"
      >
        ALMIRAH.
      </div>
      <div className="pt-8">
        <span className="flex justify-center items-center text-2xl font-clashdisplay tracking-wider font-semibold">
          Build Your{' '}
          <span className="font-clashdisplay pl-1 font-semibold text-gray-600">
            Almirah.
          </span>
        </span>
        <span className="flex justify-center font-clashdisplay font-medium text-sm text-gray-600 tracking-wider">
          Collect. Organize. Remember.
        </span>
        <div className="flex justify-center items-center pt-4">
          {signUp ? (
            <SignUpPage signUp={signUp} setSignUp={setSignUp} />
          ) : (
            <SignInPage signUp={signUp} setSignUp={setSignUp} />
          )}
        </div>
      </div>
    </div>
  );
};
