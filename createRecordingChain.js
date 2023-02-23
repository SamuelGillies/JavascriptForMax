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
var settingsOutput = this.patcher.getnamed('settingsOutput'); 
var settingsInput = this.patcher.getnamed('settingsInput'); 
var numInputs = 0; 
var a = 0; 
var pos = 20; 

function createInputs(a) { 

    if (a < 1) a = 1;
    if (a > 16) a = 16; 

    // remove existing objects
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
    // create new objects
    if (numInputs) {
        therecorder = this.patcher.newdefault(300, 300, "sfrecord~", a);
        inputslist = this.patcher.newdefault(20, -50, "receive", "audioInputs");

        for (var i = 0; i < a; i++) {
                if ((i >= 0) && (i <= 3)) { pos = 50 }; 
                if ((i >= 4) && (i <= 7)) { pos = 80 };
                if ((i >= 8) && (i <= 11)) { pos = 110 };
                if ((i >= 12) && (i <= 15)) { pos = 140 };

                umenus[i] = this.patcher.newdefault(20, (80+(i * 30)), "umenu");
                //umenus[i] = this.patcher.newdefault(20+((i % 4) * 110), pos, "umenu");


                setters[i] = this.patcher.newdefault(20+(i * 150), 150, "prepend", "set");
                receivers[i] = this.patcher.newdefault(20+(i * 150), 200, "receive~");

                umenus[i].presentation(1); // add umenus to presentation mode

                this.patcher.connect(inputslist, 0, umenus[i], 0);
                this.patcher.connect(umenus[i], 0, setters[i], 0);
                this.patcher.connect(umenus[i], 0, settingsOutput, (i + 1));
                this.patcher.connect(settingsInput, (i), umenus[i], 0);
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