import moment from "moment";

// Get visible links

//links is an incomming array that was filled from the database
const getFilteredLinksArray = (links, { text, sortBy, startDate, endDate }) => {
  //console.log("links="+JSON.stringify(links))
  console.log("getFilteredLinksArray, text="+text)
  console.log("getFilteredLinksArray, TTTTTTTTTTTTTTTTTTTTTTTTTTTTTt, sortBy="+sortBy)
  const removeHashTags=(text) => {
    let str = text.replace(/#\S+/g, '').trim();
    //console.log("str="+str)
    return str
  }

  if(!!links===false) return []
  else
  return links.filter((link) => {
      const createdAtMoment = moment(link.createdAt);
      const startDateMatch = startDate
        ? startDate.isSameOrBefore(createdAtMoment, "day")
        : true;
      const endDateMatch = endDate
        ? endDate.isSameOrAfter(createdAtMoment, "day")
        : true;
      //const isTextIn = link && link.description && text && link.description
      let isTextIn=false
      if(!!link===true && !!text===true)
      isTextIn = link.description.toLowerCase().includes(text.toLowerCase());
      else if(!!text===false) text=''

       let isTextInDescription, isTextInNote;

       if(sortBy==='description' || sortBy==='date') {
          isTextInDescription = link.description?link.description
          .toLowerCase()
          .includes(text.toLowerCase()):false;
          return startDateMatch && endDateMatch && isTextInDescription;
        } else if(sortBy==='hashtag') { //the user entered a hash tag, for example #project1
         
          isTextInNote = link.note?link.note
          .toLowerCase()
          .includes(text.toLowerCase()):false
          return startDateMatch && endDateMatch && isTextInNote;
        } else if(sortBy==="notetext") {
         
           isTextInNote = link.note?link.note
          .toLowerCase()
          .includes(text.toLowerCase()):false;
          return startDateMatch && endDateMatch && isTextInNote;
        }
        else return startDateMatch && endDateMatch; 

//         export default (expenses, { text, sortBy, startDate, endDate }) => {
//   return expenses.filter((expense) => {
//     const createdAtMoment = moment(expense.createdAt);
//     const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
//     const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
//     const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

//     return startDateMatch && endDateMatch && textMatch;
//   }).sort((a, b) => {
//     if (sortBy === 'date') {
//       return a.createdAt < b.createdAt ? 1 : -1;
//     } else if (sortBy === 'amount') {
//       return a.amount < b.amount ? 1 : -1;
//     }
//   });
// };
      
      //  if(sortBy==='description' || sortBy==='date') {
      //   if(!!text===false) text=''
      //     isTextInDescription = link.description?link.description
      //     .toLowerCase()
      //     .includes(text.toLowerCase()):'';
      //     return isTextInDescription;
      //   } else if(sortBy==='hashtag') { //the user entered a hash tag, for example #project1
      //     if(!!text===false) text=''
      //     isTextInNote = link.note?link.note
      //     .toLowerCase()
      //     .includes(text.toLowerCase()):'' && text;
      //     return isTextInNote;
      //   } else if(sortBy==="notetext") {
      //     if(!!text===false) text=''
      //      isTextInNote = link.note?link.note
      //     .toLowerCase()
      //     .includes(text.toLowerCase()):'';
      //     return isTextInNote;
      //   }
      //   else return true
      
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
