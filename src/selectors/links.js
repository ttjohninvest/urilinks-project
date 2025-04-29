import moment from "moment";

// Get visible links

//links is an incomming array that was filled from the database
const getFilteredLinksArray = (links, { text, sortBy, startDate, endDate }) => {
  return links.filter((link) => {
      const createdAtMoment = moment(link.createdAt);
      const startDateMatch = startDate
        ? startDate.isSameOrBefore(createdAtMoment, "day")
        : true;
      const endDateMatch = endDate
        ? endDate.isSameOrAfter(createdAtMoment, "day")
        : true;
      const isTextIn = link.description
        .toLowerCase()
        .includes(text.toLowerCase());

      return startDateMatch && endDateMatch && isTextIn;
      //return isTextIn;
    }).sort((a, b) => {
      if (sortBy === "date") {
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === "description") {
        return a.description.toLowerCase() < b.description.toLowerCase()
          ? 1
          : -1;
      }
    });
};

export default getFilteredLinksArray;
