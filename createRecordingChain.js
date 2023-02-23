// inlets and outlets
inlets = 1;
outlets = 2;

// Maxobj variables for scripting
var inputslist = new Array(128);
var umenus = new Array(128);
var setters = new Array(128);
var receivers = new Array(128);
var therecorder;
var recEnable = this.patcher.getnamed('recEnable'); 
var timeElapsed = this.patcher.getnamed('timeElapsed'); 
var numInputs = 0; 
var a = 0; 

function createInputs(a) { 

    if (a < 1) a = 1;
    if (a > 16) a = 16; 

    if (numInputs) {
        this.patcher.remove(therecorder);

        for (var i = 0; i < numInputs; i++) {
                this.patcher.remove(inputslist[i]);
                this.patcher.remove(umenus[i]);
                this.patcher.remove(setters[i]);
                this.patcher.remove(receivers[i]);
                umenus[i].presentation(0); 

            }
    }

    numInputs = a; 

    if (numInputs) {
        therecorder = this.patcher.newdefault(300, 300, "sfrecord~", a);

        for (var i = 0; i < a; i++) {
                inputslist[i] = this.patcher.newdefault(300+(i * 150), 50, "receive", "audioInputs");
                umenus[i] = this.patcher.newdefault(300+(i * 150), 100, "umenu");
                setters[i] = this.patcher.newdefault(300+(i * 150), 150, "prepend", "set");
                receivers[i] = this.patcher.newdefault(300+(i * 150), 200, "receive~");

                umenus[i].presentation(1); 

                this.patcher.connect(inputslist[i], 0, umenus[i], 0);
                this.patcher.connect(umenus[i], 0, setters[i], 0);
                this.patcher.connect(setters[i], 0, receivers[i], 0);
                this.patcher.connect(receivers[i], 0, therecorder, i);
                this.patcher.connect(recEnable, 0, therecorder, 0);
                this.patcher.connect(therecorder, 0, timeElapsed, 0);

            }
    }
}; 

function testing(a) {
    if (a < 0) {
        console.log('input detected'); 
    } else {
        console.log('input still detected'); 
    }
};