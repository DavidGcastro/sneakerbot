
const {fork} = require('child_process');
const path = require('path');
const cores = require('os').cpus().length;
const fs = require('fs');
const adapters = fs.readdirSync('./vendorAdapters');
let childIndex = 0;
const init = () => {
	while(childIndex < cores && childIndex < adapters.length) {
		try {
			const child = fork(path.resolve('child.js'), [adapters[childIndex]]);
			childIndex += 1;
			child.on('message', async message => {
				console.log('Message from child: ', message);
			});
		} catch(e){
			process.kill();
			throw Error(e);
		}	

	}
};

init();