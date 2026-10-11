const getSearchTerm = () => {
  return window.document.getElementById("termid").value.trim();
};

module.exports = getSearchTerm;