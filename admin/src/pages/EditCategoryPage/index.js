/*
 *
 * Edit Path
 *
 */

import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { useFetchClient } from '@strapi/helper-plugin';
import pluginId from '../../pluginId';
import Sidebar from '../../components/Sidebar';
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
  SingleSelect,
  SingleSelectOption,
  Link
} from '@strapi/design-system';

import { ArrowLeft } from '@strapi/icons';

const EditCategoryPage = ({ match }) => {
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [parent, setParent] = useState({});
  const [children, setChildren] = useState([]);
  const [categories, setCategories] = useState([]);
  const [changesMade, setChangesMade] = useState(false);
  const { get, del } = useFetchClient();
  const history = useHistory();

  const fetchCategory = async () => {
    const { data } = await get(`/paths/categories/${match.params.id}`);
    setId(data.id);
    setName(data.name);
    setSlug(data.slug);
    setParent(data.parent);
    setChildren(data.children);
  }

  const fetchCategories = async () => {
    const { data } = await get(`/paths/categories`);
    setCategories(data);
  }

  const confirmDelete = (id) => {
    toggleOpenConfirmDeletePath(openConfirmDeletePath)
    setDeletePathId(id);
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

  useEffect(() => {
    fetchCategory();
    fetchCategories();
  }, []);

  const parentList = categories.map(element =>
    <SingleSelectOption value={element.id} selected={element.id === parent?.id}>
      {element.name}
    </SingleSelectOption>
  );

  useEffect(() => {
    console.log("id", id);
    console.log("categories", categories);
    console.log("parent", parent);
    console.log("children", children);
    console.log(parentList)
  }, [id, categories])


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
              <SingleSelect
                label="Parent category"
                placeholder="Parent category..."
                name="parent"
              //onChange={selectCategory}
              //onClear={() => { setCategoryId(undefined) }}
              //value={selectedCategoryId}
              >
                {parentList}
              </SingleSelect>
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

              <Button onClick={() => confirmDelete(id)} fullWidth variant="danger">Delete category</Button>

            </GridLayout>
          </Box>}
        />
      </Box>

    </>
  </Layout>

};

export default EditCategoryPage;
