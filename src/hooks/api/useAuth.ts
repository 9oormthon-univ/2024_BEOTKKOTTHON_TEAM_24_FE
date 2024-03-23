import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';

import { login, signup } from '@api/auth';

export function useSignup() {
  const router = useRouter();

  return useMutation({
    mutationFn: signup,
    onSuccess: () => {
      router.replace(`/home`);
    },
    onError: () => {
      router.replace('/signup');
    },
  });
}

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      router.replace(`/home`);
    },
    onError: () => {
      router.replace('/signin');
    },
  });
}
