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
               backgroundChoice:0
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

				
              videoSource.src = videoSources[Number(value)];
              videoTex.load();

			} );
           
           gui.add( params, 'backgroundChoice', 0.0,2.0 ).step( 1.0 ).onChange( function ( value ) {

				
              scene.background = backgrounds[Number(value)];
            

			} );