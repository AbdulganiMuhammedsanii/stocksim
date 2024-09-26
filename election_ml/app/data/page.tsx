// app/data/page.tsx

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
} from '@mui/material';
import PollIcon from '@mui/icons-material/Poll';
import ClientNavigation from './ClientNavigation'; // Import the client-side navigation component

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:5000';

// Server-side function to fetch polling data
async function fetchPollingData() {
  const response = await fetch(`${API_BASE_URL}/fetch-data`, {
    cache: 'no-store', // Ensure fresh data is fetched for every request
  });
  if (!response.ok) {
    throw new Error('Failed to fetch polling data');
  }
  return response.json();
}

export default async function Dashboard() {
  // Fetch polling data server-side
  const pollingData = await fetchPollingData();

  return (
    <>
      {/* AppBar */}
      <AppBar position="static" color="primary">
        <Toolbar>
          <PollIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Election Polling Data Dashboard
          </Typography>
          {/* Use the client-side component for the "Home" button */}
          <ClientNavigation />
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Polling Data for {pollingData.state}
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="polling data table">
            <TableHead>
              <TableRow>
                <TableCell>Candidate</TableCell>
                <TableCell align="right">Percentage (%)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pollingData.polls.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2} align="center">
                    No polling data available.
                  </TableCell>
                </TableRow>
              ) : (
                pollingData.polls.map((poll: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{poll.candidate}</TableCell>
                    <TableCell align="right">{poll.percentage}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
