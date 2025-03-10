'use client';

import { PrivyProvider } from '@privy-io/react-auth';

export default function PrivyProviderClient({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID ?? ''}
      config={{
        appearance: {
          theme: 'light',
          accentColor: '#676FFF',
        },
        loginMethods: ['email'],  // Only allow email login
      }}
    >
      {children}
    </PrivyProvider>
  );
} 