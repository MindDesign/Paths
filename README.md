# Paths

## My initial thoughts

My thought was to create a plugin that has two content types, a category and a path. Since I originally wanted to use it to expose a rest endpoint to get content by url on the front-end, the focus was on the paths table. The idea here was to let plugin users select what content types the plugin should be used on, and then subscribe to create and update events for these types. 

In the paths table the plugin stores the path (I will come back to this later), the model uid, the entity id and the publish state. (It also stores the entity title, but I forgot why, so will probably remove it). This enables me to query the endpoint for a path for a specific frontend url. 

In the paths service, the plugin returns the entity that corresponds to the path (fetched by the model uid and entity id).

To create the paths for each entity, I just made it simple by creating a category that allows to create categories with a parent and children, along with a title and a slug. So when adding a category to an entity, the path should be generated from the category structure.

This was the original idea. But then I needed breadcrumbs, and that is why I have started adding a function to generate a json structure that holds the breadcrumb along side the path, model uid and entity id.

So an example of a path entity is:

```
{ 
 "model_uid": "api::article.article", 
 "entity_id": "38", 
 "json_category": { 
   "breadcrumbs": [ 
     { 
       "name": "Vårt ansvar", 
       "slug": "berekraft" 
     }, 
     { 
       "name": "Dyrevern", 
       "slug": "berekraft/dyrevern" 
     } 
   ] 
 } 
}
```

So, this was the original idea.

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
