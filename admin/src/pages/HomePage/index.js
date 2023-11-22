/*
 *
 * HomePage
 *
 */

import React, { useState, useEffect } from 'react';
//import { getContentTypes } from '../../utils/contentTypes';

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

const HomePage = () => {

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
      <BaseHeaderLayout title="Paths" as="h2" />
      <Box padding={8} background="neutral100">
        <Typography>Something should be here</Typography>
      </Box>
    </>
  </Layout>
};

export default HomePage;
