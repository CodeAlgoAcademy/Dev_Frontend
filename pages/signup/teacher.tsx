import ParentSignUp1 from '@/components/parentMultiForm/ParentSignUp1';
import ParentSignUp2 from '@/components/parentMultiForm/ParentSignUp2';
import ThankyouForm from '@/components/parentMultiForm/ThankyouForm';
import WelcomeForm from '@/components/parentMultiForm/WelcomeForm';
import OtherInfoTeacher from '@/components/parentMultiForm/OtherInfoTeacher';
import useMultiForm from '@/components/useMultiForm';
import Image from 'next/image';
import Link from 'next/link';
import { ChangeEvent, useEffect } from 'react';
import { signUpUser } from 'services/authService';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { clearFields, updateUser } from 'store/authSlice';

export default function Teacher() {
  const dispatch = useDispatch();
  const router = useRouter();
  const {steps, currentStepIndex, step, teacherSignUpStep, isFirstStep, isLastStep, back, next} = useMultiForm([
    <ParentSignUp1 key={1} />,
    <ParentSignUp2 key={2} />,
    <OtherInfoTeacher key={4}/>,
    <WelcomeForm key={3} />
  ]) 

  

  const signup = async (event: ChangeEvent<HTMLFormElement>) => {
    if(!teacherSignUpStep){
      event.preventDefault();
      next()
    } else {
      const data = await dispatch(signUpUser());
     if (!data?.error?.message) {
       dispatch(clearFields());
         router.push('/verify-email');
     }
     dispatch(clearFields());
     console.log(data)
    }
  };

  return (
    <div className='bg-gradient-to-br from-[#78A8FB] to-[#C4D7F8] h-[100vh] p-[2rem] relative'>
    <div className="flex justify-between items-center">
          <h1 className='text-white text-3xl font-bold'>CodeAlgo</h1>
          <div>
              <span className="font-semibold">Already have an account?</span>
              <Link href="/login"><span className='cursor-pointer ml-3 font-semibold text-[#2073FA]'>Log in</span></Link>
          </div>
    </div>
    <div className='flex p-[4rem]  items-center justify-center'>
          <div className='bg-white mr-[-2rem] w-[600px] px-[5rem] py-[4rem] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 rounded-[2.5rem]'>
              <form onSubmit={signup}>
                  <div className=''>
                    {step}
                  </div>
                  <div>
                      {!teacherSignUpStep && <button className='block  h-[2.5rem] mt-6 text-center w-full text-white bg-[#2073FA] font-bold rounded-xl' type="submit">Continue</button>}
                      {teacherSignUpStep && <button className='block  h-[2.5rem] mt-6 text-center w-full text-white bg-[#2073FA] font-bold rounded-xl' type="submit">Sign up</button>}
                      {(!isFirstStep && !isLastStep) && <button className='block text-center w-full mt-4' type="button" onClick={back}>back</button>}
                      {isFirstStep && <button className='block  h-[2.5rem] mt-6 text-center w-full bg-neutral-100/70 font-semibold rounded-xl text-black' type="button" onClick={back}>Sign Up with Google</button>}
                  </div>
              </form>
          </div>
          <div className='ml-[-2rem]'>
              <Image
                  src="/assets/ComputerGraphic.png"
                  width="829.8"
                  height="520.2"
                  alt="computer graphic"
              />
          </div>

    </div>
    <div className='box-border text-[16px] text-white bg-[#2073FA] font-semibold flex justify-between w-full absolute left-0 bottom-0 py-3 px-10'>
      <p>© 2023 CodeAlgoAcademy. All rights reserved.</p>
      <p className='left-0'>Get help</p>
    </div>
  </div>
  );
}