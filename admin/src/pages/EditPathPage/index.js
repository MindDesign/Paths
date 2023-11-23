/*
 *
 * Edit Path
 *
 */

import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { useFetchClient } from '@strapi/helper-plugin';
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

const EditPathPage = ({match}) => {
  const [data, setData] = useState();
  const [count, setCount] = useState(0);
  const { get } = useFetchClient();

  const fetchCategories = async () => {
    console.log("Here");
    //const data = await get(`/paths/path/${match.params.id}`);
    //console.log(data);
    //setData(data);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return <Layout sideNav={<Sidebar />}>
    <>
      <BaseHeaderLayout navigationAction={<Link startIcon={<ArrowLeft />} to={`/plugins/${pluginId}/paths?start=1&pageSize=10`}>
        Go back
      </Link>} title="Edit Path" as="h2" />
      <Box padding={8} background="neutral100">
        
        Edit path

      </Box>

    </>
  </Layout>

};

export default EditPathPage;
