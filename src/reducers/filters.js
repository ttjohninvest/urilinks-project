import moment from 'moment';

// Filters Reducer

const filtersReducerDefaultState = {
  text: '',
  sortBy: 'description',
  startDate: moment().startOf('year'), //'month'
  endDate: moment().endOf('year') //'month'
};

export default (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      };
      case 'SORT_BY_DESCRIPTION':
      return {
        ...state,
        sortBy: 'description'
      };
      case 'SORT_BY_NOTETEXT':
      return {
        ...state,
        sortBy: 'notetext'
      };
      case 'SORT_BY_HASHTAG':
        return {
          ...state,
          sortBy: 'hashtag'
        };
      case 'SORT_BY_VIEWS':
        return {
          ...state,
          sortBy: 'views'
        };
       case 'SORT_BY_LIKES':
        return {
          ...state,
          sortBy: 'likes'
        };
      case 'SORT_BY_STAR':
        return {
          ...state,
          sortBy: 'star'
        };
      case 'SORT_BY_FOLDER':
      return {
        ...state,
        sortBy: 'folder'
      };
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount'
      };
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date'
      };
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate
      };
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate
      };
    default:
      return state;
  }
};
