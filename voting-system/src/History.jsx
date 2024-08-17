import Layout from "./components/Layout";
import { Input, CloseButton, Table, Modal, Text, Grid, Button, Group, Paper } from '@mantine/core';
import { IconSearch, IconCircleCheck } from '@tabler/icons-react';
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';

const data = [
  { id: "V001", vote: "Joe Biden", timestamp: "1800", digiSig: "hxy", sig: "yyz", voteTrans: "0x12399847", orderTrans: "0x8787123", hash: "jlkasjd98078"},
  { id: "V002", vote: "Joe Biden", timestamp: "1800", digiSig: "hxy", sig: "yyz", voteTrans: "0x12399847", orderTrans: "0x8787123", hash: "jlkasjd98078"},
  { id: "V003", vote: "Joe Biden", timestamp: "1800", digiSig: "hxy", sig: "yyz", voteTrans: "0x12399847", orderTrans: "0x8787123", hash: "jlkasjd98078"},
  { id: "V004", vote: "Joe Biden", timestamp: "1800", digiSig: "hxy", sig: "yyz", voteTrans: "0x12399847", orderTrans: "0x8787123", hash: "jlkasjd98078"},
  { id: "V005", vote: "Joe Biden", timestamp: "1800", digiSig: "hxy", sig: "yyz", voteTrans: "0x12399847", orderTrans: "0x8787123", hash: "jlkasjd98078"},
  { id: "V006", vote: "Joe Biden", timestamp: "1800", digiSig: "hxy", sig: "yyz", voteTrans: "0x12399847", orderTrans: "0x8787123", hash: "jlkasjd98078"},
]

const History = () => {

  const [value, setValue] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);

  const rows = data.map((element) => (
    <Table.Tr 
      key={element.id}
      onClick={() => {
        setSelectedRow(element);
        open();
      }}
      style={{ cursor: 'pointer' }}
    >
      <Table.Td>{element.id}</Table.Td>
      <Table.Td>{element.vote}</Table.Td>
      <Table.Td>{element.timestamp}</Table.Td>
      <Table.Td>{element.digiSig}</Table.Td>
      <Table.Td>{element.sig}</Table.Td>
    </Table.Tr>
  ))

  const DetailItem = ({ label, value }) => (
    <Paper shadow="xs" p="md" withBorder>
      <Text size="sm" c="dimmed">{label}</Text>
      <Text fw={500}>{value}</Text>
    </Paper>
  )

  return(
    <Layout>
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
          <Table.Th>ID</Table.Th>
          <Table.Th>Vote</Table.Th>
          <Table.Th>Timestamp</Table.Th>
          <Table.Th>Digital Signature</Table.Th>
          <Table.Th>Signature</Table.Th>
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
              <Grid.Col span={6}><DetailItem label="Timestamp" value={selectedRow.timestamp} /></Grid.Col>
              <Grid.Col span={6}><DetailItem label="Digital Signature" value={selectedRow.digiSig} /></Grid.Col>
              <Grid.Col span={6}><DetailItem label="Signature" value={selectedRow.sig} /></Grid.Col>
              <Grid.Col span={6}><DetailItem label="Vote Transaction" value={selectedRow.voteTrans} /></Grid.Col>
              <Grid.Col span={6}><DetailItem label="Order Transaction" value={selectedRow.orderTrans} /></Grid.Col>
              <Grid.Col span={6}><DetailItem label="Hash" value={selectedRow.hash} /></Grid.Col>
            </Grid>
            <Group justify="flex-end" mt="xl">
              <Button rightSection={<IconCircleCheck />} color="green">
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
