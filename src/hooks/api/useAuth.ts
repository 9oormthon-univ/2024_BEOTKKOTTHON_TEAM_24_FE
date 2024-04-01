import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { setAccessToken } from '@/utils/auth';
import { login, signup } from '@api/auth';

export function useSignup() {
  const router = useRouter();

  return useMutation({
    mutationFn: signup,
    onSuccess: () => {
      router.replace(`/onboard/addhome`);
    },
    onError: (e) => {
      console.log(e);
      alert(
        '회원가입에 실패했습니다. 올바르게 정보를 입력했는지 확인해주세요!',
      );
      router.replace('/signup');
    },
  });
}

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      router.replace(`/home`);
    },
    onError: () => {
      router.replace('/signin');
    },
  });
}
