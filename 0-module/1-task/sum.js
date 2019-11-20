function sum(a, b) {
	let args = [].slice.call(arguments);
	  args.forEach(el => {
		  if (typeof el !== 'number') {
			  throw new TypeError(`${el} is not a number`);
		  }
	  });
	  let result = args.reduce((sum, current) => sum + current, 0);
	  return result;
}

module.exports = sum;
