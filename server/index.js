const Bean = require('ble-bean');
const SerialPort = require('serialport');
const BeanSerial = require('bean-serial').SerialPort;
const Readline = SerialPort.parsers.Readline;
const parser = new Readline();

const rpiUUID = '987bf35834c6';
const macUUID = 'efff1bd8f4314c71b34b1e9547b6ab22'

var port;
var options = {
    logging: true // default to false
};

Bean.discoverByUuid(macUUID, (bean) => {
	bean.connectAndSetup(() => {	
		port = new BeanSerial(bean, options);

		bean.write(new Buffer([true]), () => { });
		
		port.pipe(parser);

		parser.on('data', function (data) {
      console.log(data.toString());
      
      bean.disconnect();
		});
	});

});
