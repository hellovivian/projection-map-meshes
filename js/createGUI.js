videoSources = [];
           videoSources.push("../media/clouds.mp4");
           videoSources.push("../media/particles.mp4");
           videoSources.push("../media/petals.mp4");
           videoSources.push("../media/bluefire.mp4");
           videoSources.push("../media/clouds2.mp4");
           
var backgrounds = [];
         
   var bgTexture0 = new THREE.TextureLoader().load( "../media/blackbg.jpg" );
bgTexture0.wrapS = THREE.RepeatWrapping;
bgTexture0.wrapT = THREE.RepeatWrapping;
bgTexture0.repeat.set( 1, 1 );
     
           
           var bgTexture1 = new THREE.TextureLoader().load( "../media/blackbg1.jpg" );
bgTexture1.wrapS = THREE.RepeatWrapping;
bgTexture1.wrapT = THREE.RepeatWrapping;
bgTexture1.repeat.set( 1, 1 );
           
           var bgTexture2 = new THREE.TextureLoader().load( "../media/blackbg2.jpg" );
bgTexture2.wrapS = THREE.RepeatWrapping;
bgTexture2.wrapT = THREE.RepeatWrapping;
bgTexture2.repeat.set( 1, 1 );

backgrounds = [bgTexture0,bgTexture1,bgTexture2];

			var gui = new dat.GUI();

	var params = {
				exposure: 1,
				bloomStrength: 1.5,
				bloomThreshold: 0,
				bloomRadius: 0,
                videoTrack:0,
               backgroundChoice:0,
               color1: "#1861b3",
               color2: "#1861b3",
               boxVisibility: false,
               videoToggle: false
			};

			gui.add( params, 'exposure', 0.1, 2 ).onChange( function ( value ) {

				renderer.toneMappingExposure = Math.pow( value, 4.0 );

			} );

//			gui.add( params, 'bloomThreshold', 0.0, 1.0 ).onChange( function ( value ) {
//
//				bloomPass.threshold = Number( value );
//
//			} );

			gui.add( params, 'bloomStrength', 0.0, 3.0 ).onChange( function ( value ) {

				bloomPass.strength = Number( value );

			} );

			gui.add( params, 'bloomRadius', 0.0, 1.0 ).step( 0.01 ).onChange( function ( value ) {

				bloomPass.radius = Number( value );

			} );
           
           gui.add( params, 'videoTrack', 0.0,6.0 ).step( 1.0 ).onChange( function ( value ) {
              if (Number(value) == 0) {
              }
				
              videoSource.src = videoSources[Number(value)];
              videoTex.load();

			} );
           
           gui.add( params, 'backgroundChoice', 0.0,2.0 ).step( 1.0 ).onChange( function ( value ) {

				
              scene.background = backgrounds[Number(value)];
            

			} );


           var update = function () {
              colors = [];
               var colorObj1 = new THREE.Color( params.color1 );
              var colorObj2 = new THREE.Color( params.color2 );
//               var hex = colorObj1.getHexString();
//               var css = colorObj1.getStyle();
               if (giraffe) {
                 
               
              colors.push([colorObj1.r, colorObj1.g, colorObj1.b]);
              colors.push([colorObj2.r, colorObj2.g, colorObj2.b]);
                  
                  for(var i = 0 ; i < faces.length; i++) {
                 var random = Math.random();
                  
                 if (random > 0.5) { 
                    

                    faces[i].color.setRGB(colors[0][0], colors[0][1], colors[0][2]);
                 } else {
                    faces[i].color.setRGB(colors[1][0], colors[1][1], colors[1][2]);
                 }
                  for (var j = 0; j < 3; j++) {
//                     faces[i].vertexColors[j].setRGB(0.25, 0.25, randomB);
                  }
              
            }
               giraffe.geometry.elementsNeedUpdate = true;
              giraffe.geometry.colorsNeedUpdate = true; 
                  
               }
           };

            gui.addColor(params,'color1').onChange(update);
            gui.addColor(params,'color2').onChange(update);
            var boxToggle = gui.add(params,'boxVisibility').name('toggle hollow effect ').listen().onChange(function(value){toggleHollowEffect(value)});
         var videoToggle = gui.add(params,'videoToggle').name('toggle video effect ').listen().onChange(function(value){toggleVideoEffect(value)});


function toggleHollowEffect( value ){
   if (value && scene.getObjectByName('cubeMesh')) {
      scene.remove(scene.getObjectByName('cubeMesh'));
   } else { 
  
   cubeMesh.name = 'cubeMesh';
      scene.add(cubeMesh);
   }
}


function toggleVideoEffect( value ){
   if (value && scene.getObjectByName('screen')) {
      scene.remove(scene.getObjectByName('screen'));
   } else { 
      scene.add(screen);
   }
}