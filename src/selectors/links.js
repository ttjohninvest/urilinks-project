import moment from "moment";

// Get visible links

const removeHashTags = (text) => {
  let str = text.replace(/#\S+/g, "").trim();
  //console.log("str="+str)
  return str;
};

const getFilteredLinksArray = (links, { text, sortBy, startDate, endDate }) => {
  //console.log("links="+JSON.stringify(links))
  console.log("getFilteredLinksArray, text=" + text);
  console.log(
    "getFilteredLinksArray, TTTTTTTTTTTTTTTTTTTTTTTTTTTTTT sortBy=" + sortBy,
  );
  // if(sortBy="notetext")
  //   sortBy = "views"
  // alert("getFilteredLinksArray, sortBy="+sortBy)

  let za = 0;
  let zb = 0;
  //sortBy="description"
  //sortBy="views"
  if (!!links === false) return [];
  else {
    //alert("1 before sort, elements count="+links.length)
    let arr = links
      .filter((link) => {
        //text=''

        let isTextInDescription, isTextInNote;
        let isTextInFoldername;

        if (sortBy === "folder") {
          // || sortBy==='date') {
          if (!!link.foldername === false) return false;
          isTextInFoldername = link.foldername
            ? link.foldername.toLowerCase() === text.toLowerCase()
            : false;
          return isTextInFoldername; //&& startDateMatch && endDateMatch;
        } else if (sortBy === "description") {
          // || sortBy==='date') {
          if (!!link.description === false) return false;
          isTextInDescription = link.description
            ? link.description.toLowerCase().includes(text.toLowerCase())
            : false;
          return isTextInDescription;
        } else if (sortBy === "hashtag") {
          //the user entered a hash tag, for example #project1
          if (!!link.note === false) return false;
          isTextInNote = link.note
            ? link.note.toLowerCase().includes(text.toLowerCase())
            : false;
          return isTextInNote;
        } else if (sortBy === "notetext") {
          if (!!link.note === false) return false;
          isTextInNote = link.note
            ? link.note.toLowerCase().includes(text.toLowerCase())
            : false;
          return isTextInNote;
        } else if (sortBy === "views") {
          //return !!link.frequency?link.frequency:0
          return parseInt(link.frequency);
        } else return true;
      })
      .sort((a, b) => {
        if (
          sortBy === "description" ||
          sortBy === "hashtag" ||
          sortBy === "notetext" ||
          sortBy === "folder"
        ) {
          return a.description.toLowerCase() > b.description.toLowerCase()
            ? 1
            : -1;
        } else if (sortBy === "views") {
                // let x = parseInt(a.frequency)
                // let y = parseInt(b.frequency)
                // let x1 = isNaN(x)
                // let y1 = isNaN(y)
                // if(x1 === true) za = 0
                // else za = parseInt(a.frequency)
                // if(y1 === true) zb = 0
                // else zb = parseInt(b.frequency)
                
                // if(parseInt(a.frequency) === undefined  || parseInt(a.frequency) === null) {
                //   za = 0
                // } else {
                //   za = parseInt(a.frequency)
                // }

                // if(b.frequency === undefined || b.frequency === null) {
                //   zb = 0
                // } else {
                //   zb=parseInt(b.frequency)
                // }

                console.log("parseInt(a.frequency)="+parseInt(a.frequency)+", parseInt(b.frequency)="+parseInt(b.frequency))
                if (parseInt(a.frequency) === parseInt(0) && parseInt(b.frequency) === parseInt(0)) return parseInt(0)
                if (parseInt(a.frequency) === parseInt(0)) return -1;
                if (parseInt(b.frequency) === parseInt(0)) return 1;
                return parseInt(a.frequency) < parseInt(b.frequency)
                  ? 1
                  : -1;

        }
      })
      alert("after sort, elements count="+arr.length)
      return arr
    }
};

// const getFilteredLinksArray = (links, { text, sortBy, startDate, endDate }) => {
//   //console.log("links="+JSON.stringify(links))
//   console.log("getFilteredLinksArray, text="+text)
//   console.log("getFilteredLinksArray, TTTTTTTTTTTTTTTTTTTTTTTTTTTTTt, sortBy="+sortBy)
//   const removeHashTags=(text) => {
//     let str = text.replace(/#\S+/g, '').trim();
//     //console.log("str="+str)
//     return str
//   }

//   if(!!links===false) return []
//   else
//   return links.filter((link) => {
// const now = new Date();
// let createdAtMoment
// let startDateMatch
// let endDateMatch

// const inputDate = link.createdAt;
// const dateObject = new Date(inputDate);

// if (dateObject.toString() !== 'Invalid Date') {
//     //console.log('valid date string');

//     createdAtMoment =  moment(link.createdAt);

//      startDateMatch = startDate
//         ? startDate.isSameOrBefore(createdAtMoment, "day")
//         : true;
//       endDateMatch = endDate
//         ? endDate.isSameOrAfter(createdAtMoment, "day")
//         : true;

//       if(sortBy!=="date" && !!text===false) text=''

//        let isTextInDescription, isTextInNote;
//        let isTextInFoldername

//        if(sortBy==='folder') { // || sortBy==='date') {
//           if(!!link.foldername===false) return false
//           isTextInFoldername = link.foldername?link.foldername.toLowerCase()
//           ===text.toLowerCase():false;
//           return isTextInFoldername //&& startDateMatch && endDateMatch;
//         }

//        else if(sortBy==='description') { // || sortBy==='date') {
//           if(!!link.description===false) return false
//           isTextInDescription = link.description?link.description
//           .toLowerCase()
//           .includes(text.toLowerCase()):false;
//           return isTextInDescription && startDateMatch && endDateMatch;
//         } else if(sortBy==='hashtag') { //the user entered a hash tag, for example #project1
//           if(!!link.note===false) return false
//           isTextInNote = link.note?link.note
//           .toLowerCase()
//           .includes(text.toLowerCase()):false
//           return isTextInNote && startDateMatch && endDateMatch
//         } else if(sortBy==="notetext") {
//            if(!!link.note===false) return false
//            isTextInNote = link.note?link.note
//           .toLowerCase()
//           .includes(text.toLowerCase()):false;
//           return isTextInNote && startDateMatch && endDateMatch
//         }
//         else return startDateMatch && endDateMatch;
// } else {
//     console.log('Invalid date string');

//       if(!!text===false) return false

//        let isTextInDescription, isTextInNote;

//        if(sortBy==='folder') { // || sortBy==='date') {
//           if(!!link.foldername===false) return false
//           isTextInFoldername = link.foldername?link.foldername.toLowerCase()
//           ===text.toLowerCase():false;
//           return isTextInFoldername //&& startDateMatch && endDateMatch;
//         }
//        else
//        if(sortBy==='description') { // || sortBy==='date') {
//           if(!!link.description===false) return false
//           isTextInDescription = link.description?link.description
//           .toLowerCase()
//           .includes(text.toLowerCase()):false;
//           return isTextInDescription
//         } else if(sortBy==='hashtag') { //the user entered a hash tag, for example #project1
//           if(!!link.note===false) return false
//           isTextInNote = link.note?link.note
//           .toLowerCase()
//           .includes(text.toLowerCase()):false
//           return isTextInNote
//         } else if(sortBy==="notetext") {
//            if(!!link.note===false) return false
//            isTextInNote = link.note?link.note
//           .toLowerCase()
//           .includes(text.toLowerCase()):false;
//           return isTextInNote
//         }
//         else return true;
// }

//     })
//     .sort((a, b) => {

//       if (sortBy === "date") {
//         return a.createdAt < b.createdAt ? 1 : -1;
//       } else if (sortBy === "description" || sortBy === "hashtag" || sortBy === "notetext" || sortBy === "folder") {
//         return a.description.toLowerCase() > b.description.toLowerCase()
//           ? 1
//           : -1;
//       }

//     });
// };

export default getFilteredLinksArray;
