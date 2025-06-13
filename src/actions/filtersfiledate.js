// SET_TEXT_FILTER
export const setTextFilterFileDate = (text = '') => {
  return {
    type: 'SET_TEXT_FILTER_FILEDATE',
    text
  }
};

// SORT_BY_DATE
export const sortByDateFileDate = () => ({
  type: 'SORT_BY_DATE_FILEDATE'
});

export const sortByDescriptionFileDate = () => ({
  type: 'SORT_BY_DESCRIPTION_FILEDATE'
});

export const sortByNoteTextFileDate = () => ({
  type: 'SORT_BY_NOTETEXT_FILEDATE'
});

export const sortByHashTagFileDate = () => ({
  type: 'SORT_BY_HASHTAG_FILEDATE'
});

export const sortByAmountFileDate = () => ({
  type: 'SORT_BY_AMOUNT_FILEDATE'
});

// SET_START_DATE
export const setStartDateFileDate = (startDate) => ({
  type: 'SET_START_DATE_FILEDATE',
  startDate
});

// SET_END_DATE
export const setEndDateFileDate = (endDate) => ({
  type: 'SET_END_DATE_FILEDATE',
  endDate
});
