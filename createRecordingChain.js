// inlets and outlets
inlets = 1;
outlets = 2;

// create the new ctlin and uslider objects, connect them to one another and to the funnel
function inputsGeneration (a) { 

    therecorder = this.patcher.newdefault(300, 300, "sfrecord~", a); // make the sfrecord~ object

    for (let i = 0; i < a; i++) {
                inputslist[i] = this.patcher.newdefault(300+(k*100), 50, "receive", "receiveInputList");
                umenus[i] = this.patcher.newdefault(300+(k*100), 100, "umenu");
                setters[i] = this.patcher.newdefault(300+(k*100), 150, "message", "set $1");
                receivers[i] = this.patcher.newdefault(300+(k*100), 200, "receive~");

                this.patcher.connect(inputslist[i], 0, umenus[i], 0);
                this.patcher.connect(umenus[i], 0, setters[i], 0);
                this.patcher.connect(setters[i], 0, receivers[i], 0);
                this.patcher.connect(receivers[i], 0, therecorder, i);
            }
}; 