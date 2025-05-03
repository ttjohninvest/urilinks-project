import moment from "moment";

// Get visible links

//links is an incomming array that was filled from the database
const getFilteredLinksArray = (links, { text, sortBy, startDate, endDate }) => {
  //console.log("links="+JSON.stringify(links))
  const removeHashTags=(text) => {
    let str = text.replace(/#\S+/g, '').trim();
    console.log("str="+str)
    return str
  }
  return links.filter((link) => {
      const createdAtMoment = moment(link.createdAt);
      const startDateMatch = startDate
        ? startDate.isSameOrBefore(createdAtMoment, "day")
        : true;
      const endDateMatch = endDate
        ? endDate.isSameOrAfter(createdAtMoment, "day")
        : true;
      //const isTextIn = link && link.description && text && link.description
     
       let isTextIn, isTextInNote;
       
       if(sortBy==='description') {
          isTextInDescription = link.description
          .toLowerCase()
          .includes(text.toLowerCase());
          return startDateMatch && endDateMatch && isTextInDescription;
        } else if(sortBy==='hashtag') { //the user entered a hash tag, for example #project1
          isTextInNote = link.note
          .toLowerCase()
          .includes(text.toLowerCase());
          return startDateMatch && endDateMatch && isTextInNote;
        }
//console.log(startDateMatch,",",endDateMatch,",",isTextIn)
      
      
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === "description") {
        return a.description.toLowerCase() > b.description.toLowerCase()
          ? 1
          : -1;
      } else if (sortBy === "hashtag") {
        return removeHashTags(a.note.toLowerCase()) > removeHashTags(b.note.toLowerCase())
          ? 1
          : -1;
      }
    });
};

export default getFilteredLinksArray;
