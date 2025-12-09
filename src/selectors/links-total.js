// export default (links) => {
//   return links
//     .map((link) => link.amount)
//     .reduce((sum, value) => sum + value, 0);
// };

export default (links) => {
  return links
    .reduce((sum, value) => sum + value, 0);
};
