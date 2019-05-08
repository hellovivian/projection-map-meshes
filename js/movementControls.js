var ROTATION_AMOUNT = 0;
var ROTATION_OFFSET = 0; 
params.rotationSpeed = 0; 
params.rotationOffset =0; 
var possibleObjs = [meshh, cubeLines, cubeMesh, giraffe, screen];

console.log("hi"); 
gui.add( params, 'rotationSpeed', 0.0, 1.0 ).step( 0.01 ).onChange( function ( value ) {
	ROTATION_AMOUNT = Number( value );
} );

gui.add( params, 'rotationOffset', -180.0, +180.0 ).step( 1 ).onChange( function ( value ) {
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
//TODO put this inside the animate function! 
function rotateObjs() {
	for (var i = 0; i < possibleObjs.length; i++) {
		if (possibleObjs[i] && possibleObjs[i].rotation) {
			possibleObjs[i].rotation.z += ROTATION_AMOUNT;
		}
		
	}
	controls.update( delta )
}