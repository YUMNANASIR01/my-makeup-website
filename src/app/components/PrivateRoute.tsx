import { useAuth } from '../contexts/auth-context';
import { useRouter } from 'next/router';

import { ReactNode } from 'react';

export function Private({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push('/login');
    return null;
  }

  return children;
}
