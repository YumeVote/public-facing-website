import Layout from "./components/Layout";
import { BarChart } from '@mantine/charts';
import { ActionIcon, Title, Text, rem } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

const Vote = () => {
  return(
    <Layout>
      <Link to="/">
        <ActionIcon size={42} variant="default">
          <IconChevronLeft style={{ color: 'gray', width: rem(24), height: rem(24) }}/>
        </ActionIcon>
      </Link>
      <Title mt="md" order={2}>Election</Title>
      <Text size="lg" c="dimmed" style={{ textAlign: 'justify' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
      <BarChart 
        h={500}
        data={[{name: 'Donald Trump', VoteCounts: 200}, {name: 'Joe Biden', VoteCounts: 126}, {name: 'Shabi', VoteCounts: 88}, {name: 'Ching Chong', VoteCounts: 50}, {name: 'The Wok', VoteCounts: 130}]}
        dataKey="name"
        series={[{ name: 'VoteCounts', color: 'blue'}]}
        cursorFill="#eef8fe"
        mt="xl"
      />
    </Layout>
  )
}

export default Vote;
