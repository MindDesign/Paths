# Paths

Paths consist of two content types:
- Path category
- Path

## Path category

![paths-paths-category](https://github.com/MindDesign/paths/assets/6894169/007d1266-0ae2-4d4b-a221-aff1cb65d94d)

This is where the categories are created, and from which where the path and breadcrumbs are created

A Path category has a name, a slug, a parent and children. 

### Path category schema

```
{
  "kind": "collectionType",
  "collectionName": "pathscategories",
  "info": {
    "singularName": "pathscategory",
    "pluralName": "pathscategories",
    "displayName": "Paths category",
    "description": ""
  },
  "options": {
    "draftAndPublish": false
  },
  "pluginOptions": {},
  "attributes": {
    "name": {
      "type": "string",
      "required": true
    },
    "slug": {
      "type": "string",
      "required": true
    },
    "parent": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "plugin::paths.pathscategory",
      "inversedBy": "children"
    },
    "children": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "plugin::paths.pathscategory",
      "mappedBy": "parent"
    },
    "path": {
      "type": "customField",
      "customField": "plugin::paths.path"
    }
  }
}
```


## Path

When creating or updating an entity like article or page, the path and breadcrumbs are created from the selected Path category and title and slug of the page or article. In the table, the path, entity ID together with the model uid and breadcrumbs json (`json_category`) is stored. 

![paths-create-entry](https://github.com/MindDesign/paths/assets/6894169/207d56ed-ad4d-493a-ac6c-7e9640a6b5e5)
*Editing or creating an entity that has Paths activated on it*

![paths-paths](https://github.com/MindDesign/paths/assets/6894169/c44f26df-e8ca-489a-9dd5-8d01598efb0e)
*List of paths created*

### Path schema

```
{
  "kind": "collectionType",
  "collectionName": "paths",
  "info": {
    "singularName": "path",
    "pluralName": "paths",
    "displayName": "Paths"
  },
  "pluginOptions": {
    "content-manager": {
      "visible": true
    },
    "content-type-builder": {
      "visible": true
    }
  },
  "options": {
    "draftAndPublish": false,
    "comment": ""
  },
  "attributes": {
    "path": {
      "type": "string"
    },
    "model_uid": {
      "type": "string"
    },
    "entity_id": {
      "type": "biginteger"
    },
    "entity_title": {
      "type": "string"
    },
    "json_category": {
      "type": "json"
    },
    "is_published": {
      "type": "boolean"
    },
    "category": {
      "type": "relation",
      "relation": "oneToOne",
      "target": "plugin::paths.pathscategory"
    }
  }
}
```
