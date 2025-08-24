import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home(){
  const r = useRouter();

  useEffect(() => {
    if (localStorage.getItem('token'))
      r.replace('/dashboard');   
    else
      r.replace('/login');       
  }, []);

  return null; 
}

