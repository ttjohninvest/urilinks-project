const data = [
  { id: 1, name: '#apple' },
  { id: 2, name: '#banana' },
  { id: 3, name: '#apple' },
  { id: 4, name: '#cherry' },
  { id: 5, name: '#banana' }
];

const uniqueData = data.filter((value, index, array) => {
  // Returns the first index where the name matches
  const firstIndex = array.findIndex(item => item.name === value.name);
  // Keep the item only if it is the first occurrence
  return firstIndex === index;
});

console.log(uniqueData);