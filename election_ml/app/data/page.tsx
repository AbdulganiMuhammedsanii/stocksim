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
        <Toolbar>
          <PollIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Election Polling Data Dashboard
          </Typography>
          {/* Home Button inside AppBar */}
          <ClientNavigationButton label="Home" route="/" color="inherit" variant="outlined" />
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Typography variant="h4" gutterBottom align="center">
          Election Polling Data by State
        </Typography>

        {/* Iterate over each state's polling data */}
        {pollingData.length === 0 ? (
          <Typography align="center" color="text.secondary">
            No polling data available.
          </Typography>
        ) : (
          pollingData.map((stateData: any, index: number) => (
            <Card key={index} sx={{ mb: 4, borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 2 }} align="center">
                  {stateData.state}
                </Typography>
                <TableContainer component={Paper} elevation={3}>
                  <Table aria-label={`${stateData.state} polling data`} sx={{ minWidth: 400 }}>
                    <TableHead sx={{ bgcolor: 'primary.main' }}>
                      <TableRow>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Candidate</TableCell>
                        <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>
                          Percentage (%)
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {stateData.polls.map((poll: any, pollIndex: number) => (
                        <TableRow
                          key={pollIndex}
                          sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}
                        >
                          <TableCell>{poll.candidate}</TableCell>
                          <TableCell align="right">{poll.percentage}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          ))
        )}
      </Container>
    </>
  );
}
