
const Constants = {
  
  //NODE_DEV:"development",
  //NODE_DEV:"production",
  NODE_DEV: process.env.NODE_ENV,
  CATS:true,
  DOGS:true

};

console.log("NODE_DEV =", Constants.NODE_DEV);
Object.freeze(Constants); // Prevents accidental modification of values// 
export default Constants;