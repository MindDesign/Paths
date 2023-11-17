import React, { useState, useEffect, Fragment } from 'react';
import { useIntl } from 'react-intl';
import { TextInput } from '@strapi/design-system/TextInput';
import { Stack } from '@strapi/design-system/Stack';
import { useFetchClient } from '@strapi/helper-plugin';
import {
  SingleSelect,
  SingleSelectOption
} from '@strapi/design-system';

export default function Index({
  description,
  disabled,
  error,
  intlLabel,
  name,
  onChange,
  placeholder,
  required,
  value
}) {
  const [data, setData] = useState();
  const [tree, setTree] = useState();
  const [categories, setCategories] = useState([]);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [path, setPath] = useState();
  const [categoryId, setCategoryId] = useState();
  const { formatMessage } = useIntl();
  const [err, setErr] = useState('');
  const { get } = useFetchClient();

  useEffect(() => {
    getCategories()
  }, []);

  const depthMap = {
    "5" : <Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Fragment>,
    "4" : <Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Fragment>,
    "3" : <Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Fragment>,
    "2" : <Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Fragment>,
    "1" : <Fragment>&nbsp;&nbsp;&nbsp;&nbsp;</Fragment>,
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

  // Get categories
  const getCategories = async () => {
    const { data } = await get('/paths/pathscategories');
    setData(data);
    const root = await buildTreeStructure(data);
    const selectstructure = [];
    await buildSelectStructure(selectstructure, root);
    console.log(selectstructure);
    setCategories(selectstructure);
  }

  const selectCategory = (value) => {
    const selectedCategory = categories.filter((el) => el.categoryId == value)[0];
    
    console.log(selectedCategory);

    console.log(data);

    let listElements = [];
    listElements.push(selectedCategory);

    let parentId = selectedCategory.parent;
    // while (parentId !== null) {

    //   let curEl = data.filter(el => el.categoryId == parentId);
    //   listElements.push(curEl);
    //   parentId = data.filter(el => el.categoryId == curEl.parent).parent;
    // }

    console.log("List elements: ", listElements);
  }

  const categoryList = categories.map(element => <SingleSelectOption value={element.categoryId}>{depthMap[element.depth]} {element.name}</SingleSelectOption>)

  return (<SingleSelect label="Velg kategori" placeholder="Velg kategori..." onClear={() => {
    setCategoryId(undefined);
        }} value={value} onChange={selectCategory}>
          {categoryList}
        </SingleSelect>)
}


/**

selectstructure:  [
  {
    "name": "Regntøy",
    "slug": "regntoy",
    "fullPath": "regntoy",
    "categoryId": 2,
    "depth": 0
  },
  {
    "name": "Regnjakke",
    "slug": "regnjakke",
    "fullPath": "regntoy/regnjakke",
    "categoryId": 3,
    "depth": 1
  },
  {
    "name": "Regnbukse",
    "slug": "regnbukse",
    "fullPath": "regntoy/regnbukse",
    "categoryId": 4,
    "depth": 1
  },
  {
    "name": "Vaksen",
    "slug": "vaksen",
    "fullPath": "regntoy/regnbukse/vaksen",
    "categoryId": 8,
    "depth": 2
  },
  {
    "name": "Regnsett",
    "slug": "regnsett",
    "fullPath": "regntoy/regnsett",
    "categoryId": 5,
    "depth": 1
  },
  {
    "name": "Barn",
    "slug": "barn",
    "fullPath": "regntoy/regnsett/barn",
    "categoryId": 6,
    "depth": 2
  },
  {
    "name": "Barn",
    "slug": "barn",
    "fullPath": "barn",
    "categoryId": 7,
    "depth": 0
  }
]

 */