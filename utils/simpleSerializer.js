const simpleSerializer = (collection) => {
  const values = {};
  const keys = collection?.map((item) => {
    values[item.id] = item;
    return item.id;
  });
  return {
    keys,
    values,
  };
};

export default simpleSerializer;
