// pages/index.tsx
import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Stack,
} from '@mui/material';
import PollIcon from '@mui/icons-material/Poll';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import DataUsageIcon from '@mui/icons-material/DataUsage';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Election Polling ML</title>
        <meta
          name="description"
          content="Advanced election polling platform leveraging machine learning for accurate predictions and insightful data analysis."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* AppBar */}
      <AppBar position="static" color="primary">
        <Toolbar>
          <PollIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Election Polling ML
          </Typography>
          <Button color="inherit">Home</Button>
          <Button color="inherit" variant="outlined" sx={{ ml: 2 }}>
            Explore Data
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 10,
          pb: 8,
        }}
      >
        <Container maxWidth="md">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Predicting Election Outcomes with Machine Learning
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Harness the power of data engineering and machine learning to aggregate and analyze election polling data. Gain insights, visualize trends, and predict outcomes with our state-of-the-art platform.
          </Typography>
          <Stack
            sx={{ pt: 5 }}
            direction="row"
            spacing={3}
            justifyContent="center"
          >
            <Button variant="contained" color="primary" size="large">
              Explore Data
            </Button>
            <Button variant="outlined" color="primary" size="large">
              View Predictions
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Grid container spacing={6}>
          {/* Feature 1: Data Aggregation */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
              }}
              elevation={3}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <DataUsageIcon sx={{ fontSize: 50, color: 'primary.main', mb: 2 }} />
                <Typography gutterBottom variant="h5" component="h2">
                  Comprehensive Data Aggregation
                </Typography>
                <Typography>
                  Aggregate polling data from multiple reputable sources. Our robust data pipelines ensure up-to-date and accurate information for in-depth analysis.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Feature 2: Data Analysis */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
              }}
              elevation={3}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <ShowChartIcon sx={{ fontSize: 50, color: 'primary.main', mb: 2 }} />
                <Typography gutterBottom variant="h5" component="h2">
                  Advanced Data Analysis
                </Typography>
                <Typography>
                  Utilize cutting-edge data science techniques to uncover hidden trends and patterns within the polling data. Make informed decisions based on comprehensive insights.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Feature 3: Machine Learning Predictions */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
              }}
              elevation={3}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <PollIcon sx={{ fontSize: 50, color: 'primary.main', mb: 2 }} />
                <Typography gutterBottom variant="h5" component="h2">
                  Machine Learning Predictions
                </Typography>
                <Typography>
                  Leverage machine learning algorithms to predict election outcomes. Our models analyze vast datasets to provide accurate and reliable forecasts.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          bgcolor: 'primary.light',
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            variant="h4"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Ready to Dive into Election Data?
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            paragraph
          >
            Start exploring comprehensive polling data and predictive analytics today. Empower your research and stay ahead with our data-driven insights.
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button variant="contained" color="secondary" size="large">
              Get Started
            </Button>
            <Button variant="outlined" color="secondary" size="large">
              Learn More
            </Button>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Home;
