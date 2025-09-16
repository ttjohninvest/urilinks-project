// SET_TEXT_FILTER
export const setTextFilter = (text = '') => {
  return {
    type: 'SET_TEXT_FILTER',
    text
  }
};

// SORT_BY_DATE
export const sortByDate = () => ({
  type: 'SORT_BY_DATE'
});

export const sortByDescription = () => ({
  type: 'SORT_BY_DESCRIPTION'
});

export const sortByNoteText = () => ({
  type: 'SORT_BY_NOTETEXT'
});

export const sortByFolderText = () => ({
  type: 'SORT_BY_FOLDERTEXT'
});

export const sortByHashTag = () => ({
  type: 'SORT_BY_HASHTAG'
});

export const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT'
});

// SET_START_DATE
export const setStartDate = (startDate) => ({
  type: 'SET_START_DATE',
  startDate
});

// SET_END_DATE
export const setEndDate = (endDate) => ({
  type: 'SET_END_DATE',
  endDate
});
