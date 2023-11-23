/*
 *
 * CategoriesPage
 *
 */

import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';
import getTrad from '../../utils/getTrad';
import Sidebar from '../../components/Sidebar';
import {
  Box,
  Table,
  Thead,
  Tbody,
  TFooter,
  Tr,
  Td,
  Th,
  IconButton,
  BaseCheckbox,
  Typography,
  VisuallyHidden,
  Avatar,
  Flex,
  Layout,
  BaseHeaderLayout,
  Link,
  Button
} from '@strapi/design-system';

import {
  Plus,
  ArrowLeft,
  CarretDown,
  Pencil,
  Trash
} from '@strapi/icons';

const CategoriesPage = () => {

  const ROW_COUNT = 6;
  const COL_COUNT = 10;
  const entry = {
    cover: 'https://avatars.githubusercontent.com/u/3874873?v=4',
    description: 'Chez Léon is a human sized Parisian',
    category: 'French cuisine',
    contact: 'Leon Lafrite'
  };
  const entries = [];
  for (let i = 0; i < 5; i++) {
    entries.push({
      ...entry,
      id: i
    });
  }

  return <Layout sideNav={<Sidebar />}>
    <>
      <BaseHeaderLayout navigationAction={<Link startIcon={<ArrowLeft />} to={`/plugins/${pluginId}`}>
        Go back
      </Link>} primaryAction={<Button startIcon={<Plus />}>Add an entry</Button>} title="Categories" subtitle="36 entries found" as="h2" />
      <Box padding={8} background="neutral100">
        <Table colCount={COL_COUNT} rowCount={ROW_COUNT} footer={<TFooter icon={<Plus />}>Add another category</TFooter>}>
          <Thead>
            <Tr>
              <Th>
                <BaseCheckbox aria-label="Select all entries" />
              </Th>
              <Th action={<IconButton label="Sort on ID" icon={<CarretDown />} noBorder />}>
                <Typography variant="sigma">ID</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">Cover</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">Description</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">Categories</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">Contact</Typography>
              </Th>
              <Th>
                <VisuallyHidden>Actions</VisuallyHidden>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {entries.map(entry => <Tr key={entry.id}>
              <Td>
                <BaseCheckbox aria-label={`Select ${entry.contact}`} />
              </Td>
              <Td>
                <Typography textColor="neutral800">{entry.id}</Typography>
              </Td>
              <Td>
                <Avatar src={entry.cover} alt={entry.contact} />
              </Td>
              <Td>
                <Typography textColor="neutral800">{entry.description}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">{entry.category}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">{entry.contact}</Typography>
              </Td>
              <Td>
                <Flex>
                  <IconButton onClick={() => console.log('edit')} label="Edit" noBorder icon={<Pencil />} />
                  <Box paddingLeft={1}>
                    <IconButton onClick={() => console.log('delete')} label="Delete" noBorder icon={<Trash />} />
                  </Box>
                </Flex>
              </Td>
            </Tr>)}
          </Tbody>
        </Table>
      </Box>
    </>
  </Layout>
};

export default CategoriesPage;
