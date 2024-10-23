'use client';

import { useEffect, useState } from 'react';
import { SessionProvider, useSession } from 'next-auth/react';
import { getSession, setSession as setLocalStorageSession } from '@/utils';

type Props = {
  children: React.ReactNode;
};

// const SessionManager = ({ children }: { children: React.ReactNode }) => {
//   const [session, setSession] = useState<any>(getSession());
//   const { data: sessionFromServer, status } = useSession();

//   useEffect(() => {
//     if (session) {
//       setSession(session);
//     }
//   }, [session]);

//   useEffect(() => {
//     if (status === 'authenticated' && sessionFromServer) {
//       setLocalStorageSession(sessionFromServer);
//       setSession(sessionFromServer);
//     }
//   }, [sessionFromServer, status]);

//   return children;
// };

export const NextAuthProvider = ({ children }: Props) => {
  return (
    <SessionProvider>
      {/* <SessionManager> */}
      {children}
      {/* </SessionManager> */}
    </SessionProvider>
  );
};
