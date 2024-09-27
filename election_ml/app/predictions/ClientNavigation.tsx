// components/ClientNavigationButton.tsx
'use client'; // Mark this as a client-side component

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

interface NavigationButtonProps {
  label: string;  // Define the 'label' prop as a string
  route: string;  // Define the 'route' prop as a string
  variant?: 'contained' | 'outlined';  // Optional 'variant' prop with specific types
  color?: 'primary' | 'secondary' | 'inherit';  // Optional 'color' prop
}

export default function ClientNavigationButton({
  label, // Receive the 'label' prop
  route, // Receive the 'route' prop
  variant = 'contained', // Default value for 'variant' if not provided
  color = 'primary',  // Default value for 'color' if not provided
}: NavigationButtonProps) {
  const router = useRouter();

  return (
    <Button
      variant={variant}
      color={color}
      onClick={() => router.push(route)}
      sx={{ mb: 4 }} // Adds margin below the button
    >
      {label} {/* Use the 'label' prop here */}
    </Button>
  );
}
