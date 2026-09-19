// constants.js
const StorageSizes = {
  free: 25,
  basic:100,
  standard:200,
  premium:400,
  mine:800,

  description:200,
  url:2048,
  note:1024,
  email:1024,
  subject:100,
  body:1024,
  foldername:50

};
Object.freeze(StorageSizes); // Prevents accidental modification of values 
export default StorageSizes;