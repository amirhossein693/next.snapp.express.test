const pageCalcHelper = (length) => {
  const totalPages = [];
  let i = 0;
  while (i <= length) {
    totalPages.push(i);
    i++;
  }
  return totalPages;
};

export default pageCalcHelper;
