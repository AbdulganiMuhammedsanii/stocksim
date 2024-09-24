// pages/dashboard.tsx
import React from 'react';
import Head from 'next/head';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import PollIcon from '@mui/icons-material/Poll';

const createData = (
  date: string,
  pollster: string,
  candidateA: number,
  candidateB: number,
  sampleSize: number
) => {
  return { date, pollster, candidateA, candidateB, sampleSize };
};

// Sample raw data
const rows = [
  createData('2023-01-01', 'Pollster One', 45, 50, 1000),
  createData('2023-01-15', 'Pollster Two', 47, 48, 1200),
  createData('2023-02-01', 'Pollster Three', 46, 49, 1100),
  createData('2023-02-15', 'Pollster Four', 44, 51, 900),
  createData('2023-03-01', 'Pollster Five', 48, 47, 1300),
];

const Dashboard: React.FC = () => {
  return (
    <>
      <Head>
        <title>Election Polling Data Dashboard</title>
        <meta
          name="description"
          content="View all raw polling data for the upcoming election."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* AppBar */}
      <AppBar position="static" color="primary">
        <Toolbar>
          <PollIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Election Polling Data Dashboard
          </Typography>
          <Button color="inherit">Home</Button>
          <Button color="inherit" variant="outlined" sx={{ ml: 2 }}>
            Machine Learning Analysis
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Raw Polling Data
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="polling data table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Pollster</TableCell>
                <TableCell align="right">Candidate A (%)</TableCell>
                <TableCell align="right">Candidate B (%)</TableCell>
                <TableCell align="right">Sample Size</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.pollster}</TableCell>
                  <TableCell align="right">{row.candidateA}</TableCell>
                  <TableCell align="right">{row.candidateB}</TableCell>
                  <TableCell align="right">{row.sampleSize}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
