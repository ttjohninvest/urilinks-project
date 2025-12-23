// constants.js
const StorageSizes = {
  free: 250,
  basic:1250,
  standard:2500,
  premium:5000
};
Object.freeze(StorageSizes); // Prevents accidental modification of values 
export default StorageSizes;