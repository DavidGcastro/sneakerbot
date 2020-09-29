
const {fork} = require('child_process');
const path = require('path');
const cores = require('os').cpus().length;
const fs = require('fs');
let  adapters = fs.readdirSync('./vendorAdapters');
const disabledVendors = require('./disabledAdapters');
var schedule = require('node-schedule');
adapters = adapters.filter(vendor => disabledVendors.indexOf(vendor.substring(0, vendor.length - 3)) === -1);
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

// const job = schedule.scheduleJob({ hour: 21, minute: 23, dayOfWeek: 6 }, function () {
// 	init();
// 	job.cancel();
// });

init();