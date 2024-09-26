// app/data/ClientNavigation.tsx

'use client'; // Mark this component as a Client Component

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation'; // Import useRouter

export default function ClientNavigation() {
  const router = useRouter();

  return (
    <Button
      color="inherit"
      variant="outlined"
      onClick={() => router.push('/')}
      sx={{ borderColor: 'white', color: 'white' }}
    >
      Home
    </Button>
  );
}
