import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, HStack } from '@chakra-ui/react';
import Layout from '../components/Layout';
import AddColumnForm from '../components/AddColumnForm';
import ColumnDisplay from '../components/ColumnDisplay';
import useColumn from '../hooks/useColumn';
import { Droppable } from 'react-beautiful-dnd';

const Home: NextPage = () => {
  const { getOrderedColumns } = useColumn();

  return (
    <Layout>
      <Box>
        <Head>
          <title>Trollo</title>
          <meta name="description" content="Trollo application, very original app to save your todos" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Droppable droppableId='main' direction="horizontal" type="column">
          {provided => (
            <HStack 
              {...provided.droppableProps}
              ref={provided.innerRef}
              align={"flex-start"}
            >
              {getOrderedColumns().map(({ column, todosList }, index) => (
                <ColumnDisplay key={column.id} index={index} column={column} todos={todosList} /> 
              ))}
              {provided.placeholder}
              <AddColumnForm />
            </HStack>
          )}
        </Droppable>        
      </Box>
    </Layout>
  );
}

export default Home;