// components/ClientNavigation.tsx

'use client'; // Mark this as a Client Component

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

interface NavigationButtonProps {
  label: string;
  route: string;
  variant?: 'contained' | 'outlined';
  color?: 'primary' | 'secondary' | 'inherit';
}

export default function NavigationButton({ label, route, variant = 'contained', color = 'primary' }: NavigationButtonProps) {
  const router = useRouter();

  return (
    <Button
      variant={variant}
      color={color}
      onClick={() => router.push(route)}
    >
      {label}
    </Button>
  );
}
