//TODO put this inside the animate function! 
function rotateObjs() {
	for (var i = 0; i < possibleObjs.length; i++) {
		if (possibleObjs[i] && possibleObjs[i].rotation) {
			possibleObjs[i].rotation.z += ROTATION_AMOUNT;
		}
		
	}
	controls.update( delta );
}

var ROTATION_AMOUNT = 0;
var ROTATION_OFFSET = 0; 
params.rotationSpeed = 0; 
params.rotationOffset =0; 

var possibleObjs = [];
gui.add( params, 'rotationSpeed', 0.0, 0.1 ).step( 0.0000001 ).onChange( function ( value ) {
	ROTATION_AMOUNT = Number( value );
} );

gui.add( params, 'rotationOffset', -3, +3 ).step( 0.0000001 ).onChange( function ( value ) {
	cubeLines.rotation.z = Number(value);
	
	for (var i = 0; i < possibleObjs.length; i++) {
		currObj = possibleObjs[i]; 
		if (currObj) {
			currObj.rotation.z = Number(value); 	
		}
		ROTATION_OFFSET = Number( value );
	}
});

controls = new THREE.FlyControls( camera, renderer.domElement );
controls.movementSpeed = 2;
controls.domElement = renderer.domElement;
controls.rollSpeed = Math.PI / 48;
controls.autoForward = false;
controls.dragToLook = true;

var delta = 0.5;

var interval = setInterval(function() {
    //possibleObjs.push(theMesh);
   	possibleObjs.push(cubeLines);
   	possibleObjs.push(meshh);
   	possibleObjs.push(screen);
    if (typeof giraffe == 'undefined') return;
    possibleObjs.push(giraffe);
    clearInterval(interval);
    
   
   
}, 100);


   
