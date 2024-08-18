import Layout from "./components/Layout"
import { Input, CloseButton, Table, Modal, Text, Grid, Button, Group, Paper, Notification } from '@mantine/core';
import { IconSearch, IconCircleCheck } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import { useDisclosure } from '@mantine/hooks';

const History = () => {

  const [value, setValue] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [data, setData] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.242.192.170:8001/history');
        const result = await response.json();
        
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  
  const filteredData = data.filter(element => 
    element.ID.toString().includes(value) ||
    element.Vote.toLowerCase().includes(value.toLowerCase()) ||
    element.VoteDigitalSignature.toLowerCase().includes(value.toLowerCase()) ||
    element.IdentityDigitalSignature.toLowerCase().includes(value.toLowerCase())
  );

  const rows = filteredData.map((element) => (
    <Table.Tr 
      key={element.id}
      onClick={() => {
        setSelectedRow({
          id: element.ID,
          vote: element.Vote,
          digSig: element.VoteDigitalSignature,
          sig: element.IdentityDigitalSignature,
          voteTrans: element.VoteTransactionHash,
          orderTrans: element.AuditTransactionHash,
          hash: JSON.parse(element.Metadata.replace(/'/g, '"')).hash_of_vote,
        });
        open();
      }}
      style={{ cursor: 'pointer' }}
    >
      <Table.Td>{element.ID}</Table.Td>
      <Table.Td>{element.Vote}</Table.Td>
      <Table.Td>{element.VoteDigitalSignature.substring(0, 20)}...</Table.Td>
      <Table.Td>{element.IdentityDigitalSignature.substring(0, 20)}...</Table.Td>
    </Table.Tr>
  ))

  const DetailItem = ({ label, value }) => (
    <Paper shadow="xs" p="md" withBorder>
      <Text size="sm" c="dimmed">{label}</Text>
      <Text fw={500} style={{ wordBreak: 'break-all' }}>{value}</Text>
    </Paper>
  )

  const handleVerify = () => {
    setShowNotification(true);
    close();
    setTimeout(() => setShowNotification(false), 5000);
  };

  return(
    <Layout>
      {showNotification && (
        <Notification icon={<IconCircleCheck />} color="teal" title="Verification Complete" onClose={() => setShowNotification(false)} mt="md" mb="md">
          The vote has been successfully verified
        </Notification>
      )}
      <Input 
        placeholder="Search" 
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        rightSectionPointerEvents="all"
        leftSection={<IconSearch />} 
        rigthSection={
          <CloseButton
            aria-label="Clear input"
            onClick={() => setValue('')}
            style={{ display: value ? undefined: 'none'}}
          />
        }
        radius="md"
        size="md"
      />
      <Table withTableBorder highlightOnHover mt="md">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Vote</Table.Th>
            <Table.Th>Digital Signature</Table.Th>
            <Table.Th>Signature</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>

      <Modal
        opened={opened}
        onClose={close}
        title="Vote Details"
        size="xl"
        centered
      >
        {selectedRow && (
        <>
            <Grid gutter="md">
              <Grid.Col span={6}><DetailItem label="ID" value={selectedRow.id} /></Grid.Col>
              <Grid.Col span={6}><DetailItem label="Vote" value={selectedRow.vote} /></Grid.Col>
              <Grid.Col span={12}><DetailItem label="Digital Signature" value={selectedRow.digSig} /></Grid.Col>
              <Grid.Col span={12}><DetailItem label="Signature" value={selectedRow.sig} /></Grid.Col>
              <Grid.Col span={12}><DetailItem label="Vote Transaction" value={selectedRow.voteTrans} /></Grid.Col>
              <Grid.Col span={12}><DetailItem label="Order Transaction" value={selectedRow.orderTrans} /></Grid.Col>
              <Grid.Col span={12}><DetailItem label="Hash" value={selectedRow.hash} /></Grid.Col>
            </Grid>
            <Group justify="flex-end" mt="xl">
              <Button onClick={handleVerify} rightSection={<IconCircleCheck />} color="green">
                Verify
              </Button>
            </Group>
        </>
        )}
      </Modal>
    </Layout>
  )
}

export default History;
