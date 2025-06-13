import moment from 'moment';

// Filters Reducer

const filtersReducerDefaultState = {
  text: '',
  sortBy: 'hashtag',
  startDate: moment().startOf('year'), //'month'
  endDate: moment().endOf('year') //'month'
};

export default (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER_FILEDATE':
      return {
        ...state,
        text: action.text
      };
      case 'SORT_BY_DESCRIPTION_FILEDATE':
      return {
        ...state,
        sortBy: 'description'
      };
      case 'SORT_BY_NOTETEXT_FILEDATE':
      return {
        ...state,
        sortBy: 'notetext'
      };
      case 'SORT_BY_HASHTAG_FILEDATE':
        return {
          ...state,
          sortBy: 'hashtag'
        };
    case 'SORT_BY_AMOUNT_FILEDATE':
      return {
        ...state,
        sortBy: 'amount'
      };
    case 'SORT_BY_DATE_FILEDATE':
      return {
        ...state,
        sortBy: 'date'
      };
    case 'SET_START_DATE_FILEDATE':
      return {
        ...state,
        startDate: action.startDate
      };
    case 'SET_END_DATE_FILEDATE':
      return {
        ...state,
        endDate: action.endDate
      };
    default:
      return state;
  }
};
