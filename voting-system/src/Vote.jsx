import Layout from "./components/Layout";
import { BarChart } from '@mantine/charts';
import { ActionIcon, Title, Group, Button, Text, rem, Loader } from '@mantine/core';
import { IconChevronLeft, IconCancel } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from './AuthContext'

const Vote = () => {
  const { isLoggedIn } = useAuth();
  const [voteData, setVoteData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVoteData = async () => {
      try {
        const response = await fetch('http://10.242.192.170:8001/results');
        const data = await response.json();
        const formattedData = data.map(item => ({
          name: item.CandidateName,
          VoteCounts: parseFloat(item.Votes)
        }));
        setVoteData(formattedData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching vote data:", error);
        setIsLoading(false);
      }
    };

    fetchVoteData();
    // Set up polling every 30 seconds
    const interval = setInterval(fetchVoteData, 30000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return(
    <Layout>
      <Group position="apart" align="center" mt="md">
        <Link to="/">
          <ActionIcon size={42} variant="default">
            <IconChevronLeft style={{ color: 'gray', width: rem(24), height: rem(24) }}/>
          </ActionIcon>
        </Link>
        <div style={{ flex: 1 }}></div>
        {isLoggedIn && (
          <Button variant="outline" color="red">
            <IconCancel />&nbsp;Stop Election
          </Button>
        )}
      </Group>
      <Title mt="md" order={2}>Election</Title>
      <Text size="lg" c="dimmed" style={{ textAlign: 'justify' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
      {isLoading ? (
        <Group position="center" mt="xl">
          <Loader size="xl" />
        </Group>
      ) : (
        <BarChart 
          h={500}
          data={voteData}
          dataKey="name"
          series={[{ name: 'VoteCounts', color: 'blue'}]}
          cursorFill="#eef8fe"
          mt="xl"
        />
      )}
    </Layout>
  )
}

export default Vote;
