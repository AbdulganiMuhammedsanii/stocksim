'use client'; // Declares this file as a Client Component

import React, { useEffect, useState } from 'react';
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
} from '@mui/material';
import PollIcon from '@mui/icons-material/Poll';
import ClientNavigationButton from './ClientNavigation'; // Import the navigation button

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:5000';

export default function Dashboard() {
  const [prediction, setPrediction] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/predict`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            input_data: {
              polling_percentage: 45.3,
              sample_size: 1000,
              candidate: 'Candidate A',
              demographics_feature_1: 0.67,
              demographics_feature_2: 0.89,
            },
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error('Failed to fetch prediction');
        }

        setPrediction(data.result);
        console.log("abdulgani", data.result);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch prediction data.');
      }
    };

    fetchPrediction();
  }, []);

  return (
    <>
      {/* AppBar */}
      <AppBar position="static" color="primary">
        <Toolbar>
          <PollIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Election Polling Dashboard
          </Typography>
          {/* Home Button inside AppBar */}
          <ClientNavigationButton label="Home" route="/" color="inherit" variant="outlined" />
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Typography variant="h4" gutterBottom align="center">
          Election Prediction Outcome
        </Typography>

        {/* Display the prediction result */}
        {error ? (
          <Typography align="center" color="error">
            {error}
          </Typography>
        ) : prediction ? (
          <Card sx={{ mb: 4, borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2 }} align="center">
                Predicted Election Winner: {prediction.winner}
              </Typography>
              <Typography align="center">
                Trump Avg Probability: {prediction.candidate_0_avg_prob}
              </Typography>
              <Typography align="center">
                Kamala Avg Probability: {prediction.candidate_1_avg_prob}
              </Typography>
              <Typography align="center">
                Pro Trump Polls : {prediction.candidate_0_count}
              </Typography>
              <Typography align="center">
                Pro Kamala Polls: {prediction.candidate_1_count}
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Typography align="center" color="text.secondary">
            Loading prediction data...
          </Typography>
        )}
      </Container>
    </>
  );
}
