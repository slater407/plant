const Bean = require('ble-bean');
const SerialPort = require('serialport');
const BeanSerial = require('bean-serial').SerialPort;
const Readline = SerialPort.parsers.Readline;
const parser = new Readline();

var port;
var options = {
    logging: true // default to false
};

Bean.discoverByUuid('efff1bd8f4314c71b34b1e9547b6ab22', (bean) => {
	bean.connectAndSetup(() => {
		console.log('bean connected');
	
		port = new BeanSerial(bean, options);

		bean.write(new Buffer([true]), () => { });
		
		port.pipe(parser);

		parser.on('data', function (data) {
      console.log(data.toString());
      
      bean.disconnect();
		});
	});

});
