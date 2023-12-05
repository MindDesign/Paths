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
  Button,
  Dots,
  NextLink,
  PageLink,
  Pagination,
  PreviousLink,
  TwoColsLayout,
  GridLayout,
  Alert,
  TextInput,
  Information,
  Checkbox,
  Textarea,
  Tooltip,
  JSONInput
} from '@strapi/design-system';

import { Breadcrumbs, Crumb, CrumbLink, CrumbSimpleMenu, MenuItem, Link } from '@strapi/design-system/v2';

import {
  Plus,
  ArrowLeft,
  CarretDown,
  Pencil,
  Trash
} from '@strapi/icons';

const EditCategoryPage = ({ match }) => {
  const [rawdata, setRawdata] = useState();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [path, setPath] = useState("");
  const [changesMade, setChangesMade] = useState(false);
  const { get, del } = useFetchClient();
  const history = useHistory();

  const fetchCategory = async () => {
    const { data } = await get(`/paths/pathscategories/${match.params.id}`);
    setRawdata(data);
    setName(data.name);
    setSlug(data.slug);
    setPath(data.path);
    console.log(data);
  }

  const confirmDelete = (id) => {
    toggleOpenConfirmDeletePath(openConfirmDeletePath)
    setDeletePathId(id);
  }

  const toggleOpenConfirmDeletePath = (show) => {
    setOpenConfirmDeletePath(!show);
  }

  const deletePath = async () => {
    const result = await del(`/paths/paths/${rawdata.id}`);

    if (result.status === 200) {
      history.push(`/plugins/${pluginId}/paths?start=1&pageSize=10`);
    }
  }

  useEffect(() => {
    fetchCategory();
  }, []);

  return <Layout sideNav={<Sidebar />}>
    <>
      <BaseHeaderLayout navigationAction={<Link startIcon={<ArrowLeft />} to={`/plugins/${pluginId}/paths?start=1&pageSize=10`}>
        Go back
      </Link>} primaryAction={<Button onClick={() => savePath()} disabled={changesMade}>Save</Button>} title="Edit Category" subtitle={`MODEL UID : `} as="h2" />
      <Box padding={8} background="neutral100">

        <TwoColsLayout
          background="neutral100"
          startCol={<Box hasRadius={true} background="neutral110" borderColor="neutral150" padding={8}>
            <Box marginBottom={4}>
              <TextInput placeholder="Category name" label="Name" name="name" hint="Hint" onChange={(e) => setEntitytitle(e.target.value)} value={name} />
            </Box>
            <Box marginBottom={4}>
              <TextInput placeholder="Category slug" label="Slug" name="slug" hint="What?" onChange={(e) => setPath(e.target.value)} value={slug} />
            </Box>
            <Box marginBottom={4}>
              <TextInput disabled placeholder="Path" label="Path" name="path" hint="" onChange={(e) => setModeluid(e.target.value)} value={path} />
            </Box>
          </Box>}
          endCol={<Box background="neutral100">
            <GridLayout direction="column" background="neutral100" padding={0}>
              <Flex
                alignItems="flex-start"
                background="neutral100"
                borderColor="primary200"
                gap={3}
                hasRadius
                padding={5}
                paddingRight={6}
              >
                <Typography>a tree representation of parent and childs of this category</Typography>
              </Flex>

              <Button onClick={() => confirmDelete(rawdata.id)} fullWidth variant="danger">Delete category</Button>

            </GridLayout>
          </Box>}
        />
      </Box>

    </>
  </Layout>

};

export default EditCategoryPage;
