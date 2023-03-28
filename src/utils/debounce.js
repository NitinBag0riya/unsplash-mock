function debounce (fn, wait){
	let timer;
	return function(){
		let context = this, args = arguments;
		clearTimeout(timer);
		timer = setTimeout( () => fn.apply(context, args), wait);
	}
}

export default debounce;