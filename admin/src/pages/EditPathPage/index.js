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
import ConfirmDeletePath from '../../components/ConfirmDeletePath';

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
  PreviousLink,
  TwoColsLayout,
  GridLayout,
  Alert,
  TextInput
} from '@strapi/design-system';

import { Breadcrumbs, Crumb, CrumbLink, CrumbSimpleMenu, MenuItem } from '@strapi/design-system/v2';

import {
  Plus,
  ArrowLeft,
  CarretDown,
  Pencil,
  Trash
} from '@strapi/icons';

const EditPathPage = ({ match }) => {
  const [data, setData] = useState();
  const [path, setPath] = useState();
  const [modeluid, setModeluid] = useState();
  const [entryid, setEntryid] = useState();
  const [ispublished, setIspublished] = useState();
  const [entitytitle, setEntitytitle] = useState();
  const [jsoncategory, setJsoncategory] = useState();
  const [openConfirmDeletePath, setOpenConfirmDeletePath] = useState(false);
  const [deletePathId, setDeletePathId] = useState();
  const { get } = useFetchClient();

  const fetchCategories = async () => {
    const { data } = await get(`/paths/paths/${match.params.id}`);
    setData(data);
    setPath(data.path);
    setModeluid(data.modeluid);
    setEntryid(data.entryid);
    setIspublished(data.ispublished);
    setEntitytitle(data.entitytitle);
    setJsoncategory(data.jsoncategory);
  }

  const confirmDelete = (id) => {
    console.log("here");
    toggleOpenConfirmDeletePath(openConfirmDeletePath)
    setDeletePathId(id);
  }

  const toggleOpenConfirmDeletePath = (show) => {
    setOpenConfirmDeletePath(!show);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return <Layout sideNav={<Sidebar />}>
    <>
      <BaseHeaderLayout navigationAction={<Link startIcon={<ArrowLeft />} to={`/plugins/${pluginId}/paths?start=1&pageSize=10`}>
        Go back
      </Link>} primaryAction={<Button disabled>Save</Button>} title="Edit Path" as="h2" />
      <Box padding={8} background="neutral100" shadow="none">

        <TwoColsLayout 
          background="neutral100" 
          shadow="none"
          startCol={<Box background="neutral100" padding={8}>
              
              <Typography>{JSON.stringify(data, null, 2)}</Typography>
            </Box>} 
          endCol={<Box background="neutral100" shadow="none">
              <GridLayout direction="column" background="neutral100" shadow="none" padding={0}>
                <Flex
                  alignItems="flex-start"
                  background="neutral100"
                  borderColor="primary200"
                  boxShadow="none"
                  gap={3}
                  hasRadius
                  padding={5}
                  paddingRight={6}
                >
                  <Typography>Editing published version</Typography>
                </Flex>

                <Button onClick={() => confirmDelete(path.id)} fullWidth variant="danger">Delete path</Button>

              </GridLayout>
            </Box>}
        />
      </Box>
      <ConfirmDeletePath show={openConfirmDeletePath} toggle={toggleOpenConfirmDeletePath} id={deletePathId} />
    </>
  </Layout>

};

export default EditPathPage;
