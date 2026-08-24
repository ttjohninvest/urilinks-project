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
  console.log("getFilteredLinksArray, TTTTTTTTTTTTTTTTTTTTTTTTTTTTTT sortBy=" + sortBy);

  let za = 0;
  let zb = 0;

  
  if (!!links === false) return []
  else if(links.length === 0) return []
  else {
    
    let isTextInDescription, isTextInNote;

    let arr = links.filter((link) => {
      
          
          if (sortBy === "description") {

          // || sortBy==='date') {
          if (!!link.description === false) return false;
          isTextInDescription = !!link.description === true
            ? link.description.toLowerCase().includes(text.toLowerCase())
            : false;
          return isTextInDescription;

        } else if (sortBy === "hashtag") {
          //the user entered a hash tag, for example #project1
          if (!!link.note === false) return false;
          isTextInNote = !!link.note === true
            ? link.note.toLowerCase().includes(text.toLowerCase())
            : false;
          return isTextInNote;

        } else if (sortBy === "notetext") {
          if (!!link.note === false) return false;
          isTextInNote = !!link.note === true
            ? link.note.toLowerCase().includes(text.toLowerCase())
            : false;
          return isTextInNote;
        } else if (sortBy === "date") {
          
          return true;
        }
        
        
        else if (sortBy === "views") {
          
            return true //0 won't work for false here
          
        } else if (sortBy === "likes") {
          
            return true //0 won't work for false here
          
        } else if (sortBy === "star") {
          
            if (link.star === 1 ) return true //0 won't work for false here
            else return false
          
        }
        
        else return true;
      })

      let arr2 = arr.sort((a, b) => {
        if (sortBy === "description") {
          return a.description.toLowerCase() > b.description.toLowerCase()
            ? 1
            : -1;
        } else if (sortBy === "hashtag") { //the hashtag is in the note
        a.note.toLowerCase() > b.note.toLowerCase()
            ? 1
            : -1;
        } else if (sortBy === "notetext") {
           a.note.toLowerCase() > b.note.toLowerCase()
            ? 1
            : -1;
        } else if (sortBy === "date") {
           (a.createdAt/1000) < (b.createdAt/1000)
            ? 1
            : -1;
        } 
        
        else if (sortBy === "views") {

            return b.frequency - a.frequency

        } else if (sortBy === "likes") {

            return b.likes - a.likes

        } else if (sortBy === "star") {

            return true
            

        }
      })

      console.log("getFilteredLinksArray, links.length="+links.length)
      console.log("getFilteredLinksArray, arr2.length="+arr2.length)
      console.log("getFilteredLinksArray, links="+JSON.stringify(links))
      console.log("getFilteredLinksArray, arr2="+JSON.stringify(arr2))
      return arr2
    }
};



export default getFilteredLinksArray;
