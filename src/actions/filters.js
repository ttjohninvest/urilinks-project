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

export const sortByDateText = () => ({
  type: 'SORT_BY_DATE'
});

export const sortByDescription = () => ({
  type: 'SORT_BY_DESCRIPTION'
});

export const sortByNoteText = () => ({
  type: 'SORT_BY_NOTETEXT'
});

export const sortByViews = () => ({
  type: 'SORT_BY_VIEWS'
});

export const sortByStar = () => ({
  type: 'SORT_BY_STAR'
});

export const sortByAds = () => ({
  type: 'SORT_BY_ADS'
});

export const sortByLikes = () => ({
  type: 'SORT_BY_LIKES'
});


export const sortByFolder = () => ({
  type: 'SORT_BY_FOLDER'
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
