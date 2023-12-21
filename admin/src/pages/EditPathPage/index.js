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
  Typography,
  Flex,
  Layout,
  BaseHeaderLayout,
  Button,
  TwoColsLayout,
  GridLayout,
  TextInput,
  Checkbox,
  JSONInput
} from '@strapi/design-system';

import { Link } from '@strapi/design-system/v2';

import {
  ArrowLeft,
  Pencil,
  Trash
} from '@strapi/icons';

const EditPathPage = ({ match }) => {
  const [id, setId] = useState(0);
  const [path, setPath] = useState({});
  const [initPath, setInitPath] = useState({});
  const [changesMade, setChangesMade] = useState(false);
  const [openConfirmDeletePath, setOpenConfirmDeletePath] = useState(false);
  const { get, put, del } = useFetchClient();
  const history = useHistory();

  const fetchPath = async () => {
    const { data } = await get(`/paths/paths/${match.params.id}`);
    setId(data.id);
    setPath(data);
    setInitPath(data);
  }

  /**
   * TODO: Fix. It is not working.
   */
  const updatePath = async () => {
    const res = await put(`/paths/paths/${match.params.id}`, {
      body: {
        data: {
          path: path.path,
          json_category: path.json_category,
          model_uid: path.model_uid,
          is_published: path.is_published
        }
      }
    });

    console.log(res);
  }

  const confirmDelete = (id) => {
    toggleOpenConfirmDeletePath(openConfirmDeletePath)
  }

  const toggleOpenConfirmDeletePath = (show) => {
    setOpenConfirmDeletePath(!show);
  }

  const deletePath = async () => {
    const result = await del(`/paths/paths/${id}`);

    if (result.status === 200) {
      history.push(`/plugins/${pluginId}/paths?start=1&pageSize=10`);
    }
  }

  const getPathError = () => {
    return "";
  }

  const savePath = () => {
    updatePath();
  }

  useEffect(() => {
    fetchPath();
  }, []);

  useEffect(() => {
    setChangesMade(initPath === path);
  }, [path])

  return <Layout sideNav={<Sidebar />}>
    <>
      <BaseHeaderLayout navigationAction={<Link startIcon={<ArrowLeft />} to={`/plugins/${pluginId}/paths?start=1&pageSize=10`}>
        Go back
      </Link>} primaryAction={<Button onClick={() => savePath()} disabled={changesMade}>Save</Button>} title="Edit Path" subtitle={`MODEL UID : ${path.model_uid}`} as="h2" />
      <Box padding={8} background="neutral100">

        <TwoColsLayout
          background="neutral100"
          startCol={<Box hasRadius={true} background="neutral110" borderColor="neutral150" padding={8}>
            <Box marginBottom={4}>
              <TextInput placeholder="Path" label="Path" name="path" hint="Need to do some checking on this value" error={getPathError()} onChange={(e) => setPath(e.target.value)} value={path.path} />
            </Box>
            <Box marginBottom={4}>
              <JSONInput disabled label="JSON breadcrumbs" hint="A hint" name="json_category" value={JSON.stringify(path.json_category, null, 2)} />
            </Box>
            <Box marginBottom={4}>
              <TextInput disabled placeholder="Model UID" label="Model UID" name="model_uid" hint="" onChange={(e) => setModeluid(e.target.value)} value={path.model_uid} />
            </Box>
            <Box marginBottom={4}>
              <>
                <Checkbox
                  value={path.is_published}
                  key={id}
                  disabled={true}
                >
                  <Typography>Is entity path belongs to published?</Typography>
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
                  {(path.is_published)
                    ? `Editing path for published entity`
                    : `Editing path for unpublished entity`}
                </Typography>
              </Flex>

              <Link
                padding={2}
                paddingLeft={6}
                borderColor="primary200"
                hasRadius={true}
                startIcon={<Pencil />}
                to={`/content-manager/collectionType/${path.model_uid}/${path.entity_id}`}
              >
                Edit entity
              </Link>

              <Button onClick={() => confirmDelete(id)} fullWidth variant="danger" startIcon={<Trash />}>Delete path</Button>

            </GridLayout>
          </Box>}
        />
      </Box>
      <ConfirmDeletePath show={openConfirmDeletePath} toggle={toggleOpenConfirmDeletePath} onDeletePath={deletePath} id={id} />
    </>
  </Layout>

};

export default EditPathPage;
