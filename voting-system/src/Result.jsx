import Layout from "./components/Layout.jsx";
import { Link } from "react-router-dom";
import { SimpleGrid, Image, Text, Badge, Button, Group, Card, Input, TextInput } from '@mantine/core';

const Result = () => {
  return(
    <Layout>
      <SimpleGrid cols={3} spacing="md">
        <Card 
          shadow="sm" 
          padding="lg" 
          radius="md" 
          withBorder
          style={{ width: "350px", margin: '0 auto' }} 
        >
          <Card.Section>
            <Image 
              src="https://imgs.search.brave.com/3N8i8Bvq786fpfwdpOED7McJVg3ENguA9CdwuZCpXTA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yYW5k/b20taW1hZ2UtcGVw/ZWJpZ290ZXMudmVy/Y2VsLmFwcC9hcGkv/cmFuZG9tLWltYWdl"
              height={160}
              alt="Error"
            />
          </Card.Section>

          <Group justify="space-between" mt="md" mb="xs">
            <Text fw={500}>Election</Text>
            <Badge color="gray">coming soon</Badge>
          </Group>

          <Text size="sm" c="dimmed">
            Lorem ipsum dolor sit amet, consectetur adipiscing.
          </Text>

          <Button disabled color="blue" fullWidth mt="md" radius="md">
            Check Result
          </Button>
        </Card>
        <Card 
          shadow="sm" 
          padding="lg" 
          radius="md" 
          withBorder
          style={{ width: "350px", margin: '0 auto' }} 
        >
          <Card.Section>
            <Image 
              src="https://imgs.search.brave.com/3N8i8Bvq786fpfwdpOED7McJVg3ENguA9CdwuZCpXTA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yYW5k/b20taW1hZ2UtcGVw/ZWJpZ290ZXMudmVy/Y2VsLmFwcC9hcGkv/cmFuZG9tLWltYWdl"
              height={160}
              alt="Error"
            />
          </Card.Section>

          <Group justify="space-between" mt="md" mb="xs">
            <Text fw={500}>Election</Text>
            <Badge color="blue">on going</Badge>
          </Group>

          <Text size="sm" c="dimmed">
            Lorem ipsum dolor sit amet, consectetur adipiscing.
          </Text>
          <Link to="/vote">
            <Button color="#1c2d5c" fullWidth mt="md" radius="md">
              Check Result
            </Button>
          </Link>
        </Card>
        <Card 
          shadow="sm" 
          padding="lg" 
          radius="md" 
          withBorder
          style={{ width: "350px", margin: '0 auto' }} 
        >
          <Card.Section>
            <Image 
              src="https://imgs.search.brave.com/3N8i8Bvq786fpfwdpOED7McJVg3ENguA9CdwuZCpXTA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yYW5k/b20taW1hZ2UtcGVw/ZWJpZ290ZXMudmVy/Y2VsLmFwcC9hcGkv/cmFuZG9tLWltYWdl"
              height={160}
              alt="Error"
            />
          </Card.Section>

          <Group justify="space-between" mt="md" mb="xs">
            <Text fw={500}>Election</Text>
            <Badge color="red">past</Badge>
          </Group>

          <Text size="sm" c="dimmed">
            Lorem ipsum dolor sit amet, consectetur adipiscing.
          </Text>
          <Link to="/vote">
            <Button color="#1c2d5c" fullWidth mt="md" radius="md">
              Check Result
            </Button>
          </Link>
        </Card>
      </SimpleGrid>
    </Layout>
  )
}

export default Result;
