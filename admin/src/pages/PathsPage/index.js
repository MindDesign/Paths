/*
 *
 * Paths
 *
 */

import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { useFetchClient } from '@strapi/helper-plugin';
import pluginId from '../../pluginId';
import getTrad from '../../utils/getTrad';
import Sidebar from '../../components/Sidebar';
import ConfirmDeletePath from '../../components/ConfirmDeletePath';
import { useHistory } from "react-router-dom";
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
  Button,
  Dots,
  NextLink,
  PageLink,
  Pagination,
  PreviousLink
} from '@strapi/design-system';

import {
  Plus,
  ArrowLeft,
  CarretDown,
  Pencil,
  Trash
} from '@strapi/icons';

const PathsPage = () => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const { get } = useFetchClient();
  const ROW_COUNT = 5;
  const COL_COUNT = 10;
  const urlParams = new URLSearchParams(window.location.search);
  const pageSize = (urlParams.get('pageSize') != undefined && urlParams.get('pageSize') > 0) ? urlParams.get('pageSize') : 10;
  const pageCount = count / pageSize;
  const currentPage = urlParams.get('page') != undefined ? urlParams.get('page') : 1;
  const start = (currentPage * pageSize) - pageSize;

  const fetchCount = async () => {
    const count = await get(`/paths/pathscount`);
    setCount(count.data);
  }

  const fetchCategories = async () => {
    const { data } = await get(`/paths/paths?page=${start}&pageSize=${pageSize}`);
    setData(data);
  }

  const goto = (id) => {
    window.location.href = `paths/${id}`;
  }

  useEffect(() => {
    fetchCount();
    fetchCategories();
  }, [currentPage]);

  return <Layout sideNav={<Sidebar />}>
    <>
      <BaseHeaderLayout navigationAction={<Link startIcon={<ArrowLeft />} to={`/plugins/${pluginId}`}>
        Go back
      </Link>} primaryAction={<Button startIcon={<Plus />}>Add an entry</Button>} title="Paths" subtitle={`${count} entries found`} as="h2" />
      <Box padding={8} background="neutral100">
        <Table colCount={COL_COUNT} rowCount={ROW_COUNT} footer={<TFooter icon={<Plus />}>Add another path</TFooter>}>
          <Thead>
            <Tr>
              <Th>
                <BaseCheckbox aria-label="Select all entries" />
              </Th>
              <Th action={<IconButton label="Sort on ID" icon={<CarretDown />} noBorder />}>
                <Typography variant="sigma">ID</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">Title</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">Path</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">Model</Typography>
              </Th>
              <Th>
                <VisuallyHidden>Actions</VisuallyHidden>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map(entry => <Tr onClick={() => history.push(`paths/${entry.id}`)} key={entry.id}>
              <Td>
                <BaseCheckbox aria-label={`Select ${entry.contact}`} />
              </Td>
              <Td>
                <Typography textColor="neutral800">{entry.id}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">{entry.entity_title}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">{entry.path}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">{entry.model_uid}</Typography>
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
        <Pagination activePage={currentPage} pageCount={pageCount}>
          <PreviousLink to="/1">Go to previous page</PreviousLink>
          <PageLink number={1} to={`/plugins/${pluginId}/paths?page=1&pageSize=${pageSize}`}>
            Go to page 1
          </PageLink>
          <PageLink number={2} to={`/plugins/${pluginId}/paths?page=2&pageSize=${pageSize}`}>
            Go to page 2
          </PageLink>
          <Dots>And 23 other links</Dots>
          <PageLink number={25} to="/25">
            Go to page 3
          </PageLink>
          <PageLink number={26} to="/26">
            Go to page 26
          </PageLink>
          <NextLink to="/3">Go to next page</NextLink>
        </Pagination>
      </Box>

      <ConfirmDeletePath />
    </>
  </Layout>

};

export default PathsPage;
