import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import peopleImage from '../assets/people.jpg';
import { FaGithub } from 'react-icons/fa';
import { useSetRecoilState } from 'recoil';
import { signUpAtom } from '../storeAtoms/Atoms';

//landing page
export const HomePage = () => {
  const navigate = useNavigate();
  const setSignUp = useSetRecoilState(signUpAtom);

  return (
    <div className="bg-slate-50 w-screen h-screen flex flex-col relative">
      <div className="flex justify-between p-4 px-40">
        <div className="text-3xl font-clashdisplay tracking-wider font-semibold cursor-pointer">
          ALMIRAH.
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="md"
            title="Log in"
            onClick={() => {
              navigate('/authentication');
              setSignUp(false);
            }}
          />
          <Button
            variant="primary"
            size="lg"
            title="Get Started"
            onClick={() => {
              navigate('/authentication');
              setSignUp(true);
            }}
          />
          <Button
            variant="secondary"
            size="md"
            title="GitHub"
            startIcon={<FaGithub className="size-5" />}
            onClick={() => {
              window.open('https://github.com/rithwiksagar/Almirah');
            }}
          />
        </div>
      </div>
      <div className="border-b border-neutral-300"></div>

      <div className="flex flex-1 items-center justify-between px-40">
        <div>
          <div className="font-clashdisplay font-semibold text-7xl max-w-max overflow-hidden whitespace-nowrap border-r-[0.5px] animate-typewriter-blink">
            Join Now
          </div>
          <p className="mt-4 font-clashdisplay font-light text-xl tracking-wide max-w-lg">
            Collect every cool link you stumble upon. Organize it. Tag it.
            Rediscover it.
          </p>
          <div className="mt-4">
            <Button
              variant="primary"
              size="lg"
              title="Get Started"
              onClick={() => navigate('/authentication')}
            />
          </div>
        </div>

        <div className="shrink-0 w-100 h-100 border-3 shadow-[6px_6px_0px_#000] rounded-lg ">
          <img src={peopleImage} alt="People" className="max-h-[500px]" />
        </div>
      </div>
    </div>
  );
};
