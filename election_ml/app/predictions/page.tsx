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

// Placeholder for the actual machine learning predictions data
const predictionsData = [
  {
    state: "California",
    predictions: [
      { candidate: "Kamala Harris", predictedPercentage: 55 },
      { candidate: "Donald Trump", predictedPercentage: 45 },
    ],
  },
  {
    state: "Texas",
    predictions: [
      { candidate: "Donald Trump", predictedPercentage: 60 },
      { candidate: "Kamala Harris", predictedPercentage: 40 },
    ],
  },
  // More states...
];

export default function Predictions() {
  return (
    <>
      {/* AppBar */}
      <AppBar position="static" color="primary" sx={{ mb: 4 }}>
        <Toolbar sx={{ paddingY: 2 }}> {/* Add vertical padding */}
          <PollIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Election Predictions
          </Typography>
          {/* Box to group the buttons and apply spacing */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <ClientNavigationButton label="Home" route="/" color="inherit" variant="outlined" />
            <ClientNavigationButton
              label="Polling Data"
              route="/data"
              color="inherit"
              variant="outlined"
            />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Typography variant="h4" gutterBottom align="center">
          Predicted Election Results by State
        </Typography>

        {/* Placeholder for predictions data */}
        {predictionsData.length === 0 ? (
          <Typography align="center" color="text.secondary">
            No predictions available.
          </Typography>
        ) : (
          predictionsData.map((stateData: any, index: number) => (
            <Card key={index} sx={{ mb: 4, borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 2 }} align="center">
                  {stateData.state}
                </Typography>
                <TableContainer component={Paper} elevation={3}>
                  <Table aria-label={`${stateData.state} predictions`} sx={{ minWidth: 400 }}>
                    <TableHead sx={{ bgcolor: 'primary.main' }}>
                      <TableRow>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Candidate</TableCell>
                        <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>
                          Predicted Percentage (%)
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {stateData.predictions.map((prediction: any, predictionIndex: number) => (
                        <TableRow
                          key={predictionIndex}
                          sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}
                        >
                          <TableCell>{prediction.candidate}</TableCell>
                          <TableCell align="right">{prediction.predictedPercentage}</TableCell>
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
