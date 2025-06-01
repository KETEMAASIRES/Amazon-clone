const state ={
  basket : [{id: 1, amount: 0}, {id:2, amount: 0}]
} 

const doubled = state.basket.map((item) => {
  if (item.id ===  action.item.id) {
    return item * 2;
  } else {
    return item;
  }
});
console.log(doubled);
const number = [1, 2, 3, 4, 6];

const sum = number.reduce((total,i) => {
  return total+i;
}, 0);

console.log(sum);
