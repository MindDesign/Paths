module.exports = ({strapi}) => {
  const getContentTypes = async () => {
    let contentTypes = [];
    Object.values(strapi.contentTypes).map(contentType => {
      if ((contentType.kind === "collectionType" || contentType.kind === "singleType") && !contentType.plugin) {
        contentTypes.push(contentType);
      }
    });
    return contentTypes;
  };
}
