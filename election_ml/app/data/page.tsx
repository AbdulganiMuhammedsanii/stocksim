"use client"
import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
  Box,
} from '@mui/material';
import PollIcon from '@mui/icons-material/Poll';
import ClientNavigationButton from './ClientNavigation'; // Import the navigation button
import dynamic from 'next/dynamic';

ChartJS.register(ArcElement, Tooltip, Legend);


const Pie = dynamic(() => import('react-chartjs-2').then((mod) => mod.Pie), { ssr: false });

// Import Chart.js components
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);


// Fetching data directly in a Server Component
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:5000';

// Server-side function to fetch polling data
async function fetchPollingData() {
  const response = await fetch(`${API_BASE_URL}/fetch-data`, {
    cache: 'no-store', // Ensures fresh data is fetched for every request
  });
  if (!response.ok) {
    throw new Error('Failed to fetch polling data');
  }
  return response.json();
}

export default async function Dashboard() {
  // Fetch polling data server-side
  let pollingData = [];
  try {
    pollingData = await fetchPollingData();
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  return (
    <>
      {/* AppBar */}
      <AppBar position="static" color="primary">
        <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
          <PollIcon sx={{ mr: 2, my: 'auto' }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, my: 'auto' }}>
            Election Polling Data Dashboard
          </Typography>
          {/* Home Button inside AppBar */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ClientNavigationButton label="Home" route="/" color="inherit" variant="outlined" />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Typography variant="h4" gutterBottom align="center">
          Election Polling Data by State
        </Typography>

        {pollingData.length === 0 ? (
          <Typography align="center" color="text.secondary">
            No polling data available.
          </Typography>
        ) : (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 4 }}>
            {pollingData.map((stateData: any, index: number) => (
              <Card key={index} sx={{ width: 350, borderRadius: 2, boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h5" sx={{ mb: 2 }} align="center">
                    {stateData.state}
                  </Typography>
                  <Box sx={{ height: 150 }}>
                    <Pie
                      data={{
                        labels: stateData.polls.map((poll: any) => poll.candidate),
                        datasets: [
                          {
                            data: stateData.polls.map((poll: any) => poll.percentage),
                            backgroundColor: [
                              '#FF6384',
                              '#36A2EB',
                              '#FFCE56',
                              '#4BC0C0',
                              '#9966FF',
                              '#FF9F40',
                            ],
                            hoverBackgroundColor: [
                              '#FF6384',
                              '#36A2EB',
                              '#FFCE56',
                              '#4BC0C0',
                              '#9966FF',
                              '#FF9F40',
                            ],
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'bottom',
                          },
                          tooltip: {
                            callbacks: {
                              label: function (context) {
                                return `${context.label}: ${context.formattedValue}%`;
                              }
                            }
                          }
                        },
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Container>
    </>
  );
}
