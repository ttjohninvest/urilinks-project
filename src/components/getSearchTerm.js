const getSearchTerm = () => {
  const termInput = window.document.getElementById("termid");

  if (termInput && termInput instanceof HTMLInputElement) {
    return termInput.value.trim();
  }

  return "";
};

module.exports = getSearchTerm;
