'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { signUp } from 'next-auth-sanity/client';
import { signIn, useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { getEmailQuery } from "@/lib/sanityQueries";
import sanityClient from '@/sanity/lib/client';



const defaultFormData = {
  email: '',
  name: '',
  password: '',
  image: 'https://avatars.githubusercontent.com/u/41537421?v=4',
};

const Auth = () => {
  const [formData, setFormData] = useState(defaultFormData);
const [isSubmitting, setIsSubmitting] = useState(false);

  const inputStyles =
    'border border-gray-300 sm:text-lg text-black dark:text-white rounded-lg block w-full p-4 focus:outline-none';

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newValue = name === 'email' ? value.toLowerCase() : value;
    setFormData({ ...formData, [name]: newValue });
  };
  const fetchUserByEmailAndImage = async (email: string) => {
    const params = { email };
    return await sanityClient.fetch(getEmailQuery, params);
  };
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) router.push('/');
  }, [router, session]);

  const loginHandler = async () => {
    try {
      await signIn();
      router.push('/');
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
      setIsSubmitting(true);
      const userExists = await fetchUserByEmailAndImage(formData.email);

      if (userExists) {
        toast.error('User with this email already exists.');
        setIsSubmitting(false);
        return;
      }
    try {
      const user = await signUp(formData);
      if (user) {
        const response = await fetch('/api/email/welcome', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: formData.email }),
      });

      if (!response.ok) {
          throw new Error('Failed to send email');
      }
        toast.success('Success. Please sign in');
        router.push('/api/auth/signin'); 
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setFormData(defaultFormData);
      setIsSubmitting(false);
    }
  };

  return (
    <section className='container mx-auto'>
      <div className='mx-auto w-[90%] max-w-md space-y-6 p-6 sm:p-8 md:w-[70%] md:space-y-14'>
        <div className='mb-8 flex flex-col items-center justify-between md:flex-row'>
          <h1 className='text-xl font-bold leading-tight tracking-tight md:text-2xl'>
            Create an account
          </h1>
          <p>OR</p>
          <span className='inline-flex items-center'>
            <AiFillGithub
              onClick={loginHandler}
              className='mr-3 cursor-pointer text-4xl text-black dark:text-white'
            />{' '}
            |
            <FcGoogle
              onClick={loginHandler}
              className='ml-3 cursor-pointer text-4xl'
            />
          </span>
        </div>

        <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
          <input
            type='email'
            name='email'
            placeholder='Email (name@company.com)'
            required
            className={inputStyles}
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type='text'
            name='name'
            placeholder='Name (John Doe)'
            required
            className={inputStyles}
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type='password'
            name='password'
            placeholder='Password'
            required
            minLength={6}
            className={inputStyles}
            value={formData.password}
            onChange={handleInputChange}
          />

          <button
            type='submit'
            disabled={isSubmitting} // A gomb letiltása
            className={`w-full rounded-lg px-5 py-2.5 text-center text-lg font-medium text-white shadow-md transition duration-300 ${
              isSubmitting ? 'cursor-not-allowed bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Sign Up'}
          </button>
        </form>

        <button
          onClick={loginHandler}
          className='mt-4 w-full rounded-lg bg-green-600 px-5 py-2.5 text-center text-lg font-medium text-white shadow-md transition duration-300 hover:bg-green-700 hover:shadow-lg focus:outline-none'
        >
          Login
        </button>
      </div>
    </section>
  );
};

export default Auth;
