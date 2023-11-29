/*
 *
 * Categories
 *
 */

import React, { useState, useEffect, Fragment } from 'react';
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

const CategoriesPage = () => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tree, setTree] = useState();
  const [count, setCount] = useState(0);
  const [openConfirmDeletePath, setOpenConfirmDeletePath] = useState(false);
  const [deletePathId, setDeletePathId] = useState();
  const { get } = useFetchClient();
  const ROW_COUNT = 5;
  const COL_COUNT = 10;
  const urlParams = new URLSearchParams(window.location.search);
  const pageSize = (urlParams.get('pageSize') != undefined && urlParams.get('pageSize') > 0) ? urlParams.get('pageSize') : 10;
  const pageCount = count / pageSize;
  const currentPage = urlParams.get('page') != undefined ? urlParams.get('page') : 1;
  const start = (currentPage * pageSize) - pageSize;

  const depthMap = {
    "5": <Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Fragment>,
    "4": <Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Fragment>,
    "3": <Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#x21B3;</Fragment>,
    "2": <Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#x21B3;</Fragment>,
    "1": <Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&#x21B3;</Fragment>,
  }

  const fetchCount = async () => {
    const count = await get(`/paths/categoriescount`);
    setCount(count.data);
  }

  // Lets create a tree of our categories
  // Reference: https://typeofnan.dev/an-easy-way-to-build-a-tree-with-object-references/
  const buildTreeStructure = async (data) => {
    const idMapping = data.reduce((acc, el, i) => {
      acc[el.id] = i;
      return acc;
    }, {});

    let root = [];
    let counter = 0;

    data.forEach((el) => {
      // Handle the root element
      if (el.parent === null) {
        el.fullPath = el.slug;
        el.depthIndicator = 0;
        root[counter] = el;
        counter++;
        return;
      }

      // Use our mapping to locate the parent element in our data array
      const parentEl = data[idMapping[el.parent.id]];

      // Add our current el to its parent's `children` array
      if (parentEl.fullPath) {
        el.depthIndicator = parentEl.depthIndicator + 1;
        el.fullPath = parentEl.fullPath + "/" + el.slug;
      } else {
        el.fullPath = parentEl.slug + "/" + el.slug;
      }

      parentEl.children = [...(parentEl.children || []), el];
    });

    setTree(root);

    return root;
  }

  // Build the structure for selecting category
  const buildSelectStructure = async (selectstructure, tree) => {
    tree.map((branch) => {
      selectstructure.push({
        "id": branch.id,
        "name": branch.name,
        "slug": branch.slug,
        "fullPath": branch.fullPath,
        "categoryId": branch.id,
        "depth": branch.depthIndicator
      });
      if (Array.isArray(branch.children)) {
        buildSelectStructure(selectstructure, branch.children);
      }
    });
  }

  const fetchCategories = async () => {
    const { data } = await get(`/paths/pathscategories?page=${start}&pageSize=${pageSize}`);
    setData(data);
    const root = await buildTreeStructure(data);
    const selectstructure = [];
    await buildSelectStructure(selectstructure, root);
    setCategories(selectstructure);
  }

  const confirmDelete = (id) => {
    toggleOpenConfirmDeletePath(openConfirmDeletePath)
    setDeletePathId(id);
  }

  const toggleOpenConfirmDeletePath = (show) => {
    setOpenConfirmDeletePath(!show);
  }

  useEffect(() => {
    fetchCount();
    fetchCategories();
  }, [currentPage, openConfirmDeletePath]);

  return <Layout sideNav={<Sidebar />}>
    <>
      <BaseHeaderLayout navigationAction={<Link startIcon={<ArrowLeft />} to={`/plugins/${pluginId}`}>
        Go back
      </Link>} primaryAction={<Button startIcon={<Plus />}>Add an entry</Button>} title="Categories" subtitle={`${count} entries found`} as="h2" />
      <Box padding={8} background="neutral100">
        <Table colCount={COL_COUNT} rowCount={ROW_COUNT} footer={<TFooter icon={<Plus />}>Add another category</TFooter>}>
          <Thead>
            <Tr>
              <Th>
                <BaseCheckbox aria-label="Select all entries" />
              </Th>
              <Th>
                <Typography variant="sigma">ID</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">Name</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">Slug</Typography>
              </Th>
              <Th>
                <VisuallyHidden>Actions</VisuallyHidden>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {categories.map(entry => <Tr key={entry.id}>
              <Td>
                <BaseCheckbox aria-label={`Select ${entry.contact}`} />
              </Td>
              <Td onClick={() => history.push(`categories/${entry.id}`)}>
                <Typography textColor="neutral800">{entry.id}</Typography>
              </Td>
              <Td onClick={() => history.push(`categories/${entry.id}`)}>
                <Typography textColor="neutral800">{depthMap[entry.depth]} {entry.name}</Typography>
              </Td>
              <Td onClick={() => history.push(`categories/${entry.id}`)}>
                <Typography textColor="neutral800">{entry.slug}</Typography>
              </Td>
              <Td>
                <Flex>
                  <IconButton onClick={() => history.push(`categories/${entry.id}`)} label="Edit" noBorder icon={<Pencil />} />
                  <Box paddingLeft={1}>
                    <IconButton onClick={() => confirmDelete(entry.id)} label="Delete" noBorder icon={<Trash />} />
                  </Box>
                </Flex>
              </Td>
            </Tr>)}
          </Tbody>
        </Table>
        <Pagination activePage={currentPage} pageCount={pageCount}>
          <PreviousLink to="/1">Go to previous page</PreviousLink>
          <PageLink number={1} to={`/plugins/${pluginId}/categories?page=1&pageSize=${pageSize}`}>
            Go to page 1
          </PageLink>
          <PageLink number={2} to={`/plugins/${pluginId}/categories?page=2&pageSize=${pageSize}`}>
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
      <ConfirmDeletePath show={openConfirmDeletePath} toggle={toggleOpenConfirmDeletePath} id={deletePathId} />
    </>
  </Layout>

};

export default CategoriesPage;
