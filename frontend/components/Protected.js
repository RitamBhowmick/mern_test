import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Protected({ children }) {
  const r = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      r.replace('/login'); 
    }
  }, []);

  return children;
}
