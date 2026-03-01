// constants.js
const StorageSizes = {
  free: 10,
  basic:100,
  standard:200,
  premium:400
};
Object.freeze(StorageSizes); // Prevents accidental modification of values 
export default StorageSizes;