// constants.js
const StorageSizes = {
  free: 25,
  basic:100,
  standard:200,
  premium:400,
  mine:800,

  description:200, //link text maximum length
  url:2048, //link url maximum length
  note:1024, //link note that goes with each saved link maximum length
  email:1024, //email maximum length
  subject:200, //email subject maximum length
  body:1024, //email body maximum length
  foldername:50 //bookmarks folder name maximum length

};
Object.freeze(StorageSizes); // Prevents accidental modification of values 
export default StorageSizes;