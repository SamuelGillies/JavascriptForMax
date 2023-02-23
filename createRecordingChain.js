// inlets and outlets
inlets = 1;
outlets = 2;

// Maxobj variables for scripting
var inputslist = new Array(128);
var umenus = new Array(128);
var setters = new Array(128);
var receivers = new Array(128);
var therecorder;
var a = 0; 

function createInputs(a) { 

    this.patcher.remove(therecorder);

    for (var i = 0; i < a; i++) {
			this.patcher.remove(inputslist[i]);
			this.patcher.remove(umenus[i]);
            this.patcher.remove(setters[i]);
			this.patcher.remove(receivers[i]);
		}

    therecorder = this.patcher.newdefault(300, 300, "sfrecord~", a);

    for (var i = 0; i < a; i++) {
                inputslist[i] = this.patcher.newdefault(300+(i * 100), 50, "receive", "receiveInputList");
                umenus[i] = this.patcher.newdefault(300+(i * 100), 100, "umenu");
                setters[i] = this.patcher.newdefault(300+(i * 100), 150, "prepend", "set");
                receivers[i] = this.patcher.newdefault(300+(i * 100), 200, "receive~");

                this.patcher.connect(inputslist[i], 0, umenus[i], 0);
                this.patcher.connect(umenus[i], 0, setters[i], 0);
                this.patcher.connect(setters[i], 0, receivers[i], 0);
                this.patcher.connect(receivers[i], 0, therecorder, i);

            }
}; 

function testing(a) {
    if (a < 0) {
        console.log('input detected'); 
    } else {
        console.log('input still detected'); 
    }
};