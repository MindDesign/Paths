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
  TextInput,
  Information,
  Checkbox,
  Textarea,
  Tooltip,
  JSONInput
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
  const [rawdata, setRawdata] = useState();
  const [path, setPath] = useState("");
  const [initPath, setInitPath] = useState("");
  const [changesMade, setChangesMade] = useState(false);
  const [modeluid, setModeluid] = useState("");
  const [entityid, setEntityid] = useState(0);
  const [ispublished, setIspublished] = useState(false);
  const [entitytitle, setEntitytitle] = useState("");
  const [jsoncategory, setJsoncategory] = useState({});
  const [openConfirmDeletePath, setOpenConfirmDeletePath] = useState(false);
  const [deletePathId, setDeletePathId] = useState(0);
  const { get } = useFetchClient();
  const history = useHistory();

  const fetchPath = async () => {
    const { data } = await get(`/paths/paths/${match.params.id}`);
    setRawdata(data);
    setPath(data.path);
    setInitPath(data.path);
    setModeluid(data.model_uid);
    setEntityid(data.entity_id);
    setIspublished(data.is_published);
    setEntitytitle(data.entity_title);
    setJsoncategory(data.json_category);
    setDeletePathId(data.id);
  }

  const confirmDelete = (id) => {
    toggleOpenConfirmDeletePath(openConfirmDeletePath)
    setDeletePathId(id);
  }

  const toggleOpenConfirmDeletePath = (show) => {
    setOpenConfirmDeletePath(!show);
  }

  const goToEntity = () => {
    const url = `/content-manager/collectionType/${modeluid}/${entityid}`;
    history.push(url);
  }

  const getPathError = () => {
    return "";
  }

  const savePath = () => {
    console.log("Saving path");
  }

  useEffect(() => {
    fetchPath();
  }, []);

  useEffect(() => {
    setChangesMade( initPath === path );
  }, [path])

  return <Layout sideNav={<Sidebar />}>
    <>
      <BaseHeaderLayout navigationAction={<Link startIcon={<ArrowLeft />} to={`/plugins/${pluginId}/paths?start=1&pageSize=10`}>
        Go back
      </Link>} primaryAction={<Button onClick={() => savePath() } disabled={changesMade}>Save</Button>} title="Edit Path" subtitle={`MODEL UID : ${modeluid}`} as="h2" />
      <Box padding={8} background="neutral100">

        <TwoColsLayout
          background="neutral100"
          startCol={<Box hasRadius={true} background="neutral110" borderColor="neutral150" padding={8}>
            <Box marginBottom={4}>
              <TextInput disabled placeholder="Entity title" label="Entity title" name="entitytitle" hint="Should this be editable? should it even be here?" onChange={(e) => setEntitytitle(e.target.value)} value={entitytitle} />
            </Box>
            <Box marginBottom={4}>
              <TextInput placeholder="Path" label="Path" name="path" hint="Need to do some checking on this value" error={getPathError()} onChange={(e) => setPath(e.target.value)} value={path} />
            </Box>
            <Box marginBottom={4}>
              <JSONInput disabled label="JSON breadcrumbs" hint="A hint" value={JSON.stringify(jsoncategory, null, 2)} />
            </Box>
            <Box marginBottom={4}>
              <TextInput disabled placeholder="Model UID" label="Model UID" name="modeluid" hint="" onChange={(e) => setModeluid(e.target.value)} value={modeluid} />
            </Box>
            <Box marginBottom={4}>
              <>
                <Checkbox
                  value={ispublished}
                  key={rawdata?.id}
                  disabled={true}
                >
                  <Typography>Is entity path belongs to ublished?</Typography>
                </Checkbox>
              </>
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
                <Typography textColor="success500">
                  {(ispublished)
                    ? `Editing path for published entity`
                    : `Editing path for unpublished entity`}
                </Typography>
              </Flex>

              <Button onClick={() => goToEntity()} fullWidth variant="info">Edit entity</Button>

              <Button onClick={() => confirmDelete(rawdata.id)} fullWidth variant="danger">Delete path</Button>

            </GridLayout>
          </Box>}
        />
      </Box>
      <ConfirmDeletePath show={openConfirmDeletePath} toggle={toggleOpenConfirmDeletePath} id={deletePathId} />
    </>
  </Layout>

};

export default EditPathPage;
