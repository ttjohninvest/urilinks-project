// constants.js
const StorageSizes = {
  free: 250,
  basic:500,
  standard:750,
  premium:1000
};
Object.freeze(StorageSizes); // Prevents accidental modification of values 
export default StorageSizes;