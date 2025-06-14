//const array1 = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
//const array2 = [{ id: 2, name: 'Bob' }, { id: 3, name: 'Charlie' }];

// const combined = [...array1, ...array2];
// const uniqueById = new Set(combined.map(item => item.id));
// const union = combined.filter(item => uniqueById.has(item.id));

// console.log(uniqueById)
// console.log(union);

// const iarray1 = [1,2,3]; //is this.props.links
// const iarray2 = [2,4,5,6,7]; //links from html file

// findDiff = (iarray2, iarray1) => {
//   return [2,4].filter((a)=>{

//     return ![2,4,5,6,7].includes(a);

//   });
// }
// let iarray3 = findDiff(iarray2, iarray1)
// console.log(iarray3) //append iarray3 onto this.props.links

// const array1 = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
// const array2 = [{ id: 2, name: 'Bob' }, { id: 3, name: 'Charlie' }, { id: 4, name: 'John' }, { id: 5, name: 'Joe' }];

// const combined = [...array1, ...array2];
// const uniqueById = new Set(combined.map(item => item.id));
// const union = combined.filter(item => uniqueById.has(item.id));

// console.log(uniqueById);


const A = [
  { id: 10, name: 'Mike' },
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
  { id: 4, name: 'David' }
];

const B = [
  { id: 2, name: 'Bob' },
  { id: 4, name: 'David' },
  { id: 5, name: 'Eve1' },
  { id: 6, name: 'Eve2' },
  { id: 7, name: 'Eve3' }
];

let result = B.filter(b => !A.some(a => a.name === b.name));
console.log(result)