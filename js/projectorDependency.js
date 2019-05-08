                        var projectiveMaterial = new THREE.ShaderMaterial({
             uniforms: {
                 baseColor: {value: new THREE.Color(0xcccccc)},
                 frustum: { value: [
                 new THREE.Vector3(),
                 new THREE.Vector3(),
                 new THREE.Vector3(),
                 new THREE.Vector3(),
                 new THREE.Vector3(),
                 ]},
               texture: {value: new THREE.VideoTexture( videoTex )}
             },
             vertexShader: `

               varying vec4 vWorldPos;

               void main() {
                 vWorldPos = modelMatrix * vec4(position, 1.0);
                 gl_Position = projectionMatrix * viewMatrix * vWorldPos;
               }
             `,
             fragmentShader: `
                 uniform vec3 baseColor;
               uniform vec3 frustum[5];
               uniform sampler2D texture;

               varying vec4 vWorldPos;

               // port from https://github.com/mrdoob/three.js/blob/35ae830a7c4544582ed2759e5b18c5d6ef37c6d9/src/math/Vector3.js#L559
               vec3 projectOnVector(vec3 a, vec3 b){
                 float dist = length(b);
                 return b * ( dot(a, b) / (dist * dist) );
               }

                 void main() {

                 vec3 dir = vWorldPos.xyz - frustum[0];
                 vec3 center = (frustum[1] + frustum[2] + frustum[3] + frustum[4]) * 0.25;
                 vec3 frustumAxis = center - frustum[0];

                 vec3 projected = projectOnVector(dir, frustumAxis);
                 float scalar = length(frustumAxis) / length(projected);
                 vec3 planeProj = ( dir * scalar ) + frustum[0];

                 // UVs
                 vec3 uvBase = planeProj - frustum[1]; // from top-left corner

                 vec3 sub12 = frustum[2] - frustum[1];
                 vec3 sub12uv = projectOnVector(uvBase, sub12);
                 float u = length(sub12uv) * sign(dot(sub12, sub12uv)) / length(sub12);
                 vec3 sub13 = frustum[3] - frustum[1];
                 vec3 sub13uv = projectOnVector(uvBase, sub13);
                 float v = length(sub13uv) * sign(dot(sub13, sub13uv)) / length(sub13);
                 v = 1. - v;

                 vec3 color = ( max( u,v ) <= 1. && min( u, v ) >= 0. ) ? texture2D(texture, vec2(u, v)).rgb : vec3(1);

                 gl_FragColor = vec4(baseColor * color, 1.0);
               }
             `,
             side: THREE.DoubleSide
           }); 
          
           var time = 0;
           
           //projector frustrum   
            var frustFOV = 30;
            var frustRatio = 16 / 9;
            var frustPlane = 40;
            var frustH = frustPlane * Math.sin(THREE.Math.degToRad(frustFOV * 0.5));
            var frustW = frustH * frustRatio;
            var frustPoints = [
                new THREE.Vector3(),
                new THREE.Vector3( -frustW,  frustH, -frustPlane ),
              new THREE.Vector3(  frustW,  frustH, -frustPlane ),
              new THREE.Vector3( -frustW, -frustH, -frustPlane ),
              new THREE.Vector3(  frustW, -frustH, -frustPlane )
            ];
            var frustGeom = new THREE.BufferGeometry().setFromPoints(frustPoints);
            frustGeom.setIndex([0,1, 0, 2, 0, 3, 0, 4, 1, 2, 2, 4, 4, 3, 3, 1]);
            var frustumHelper = new THREE.LineSegments(frustGeom, new THREE.LineBasicMaterial({color: 0xff0000}));
            frustumHelper.position.set(10, 70, 140);
            frustumHelper.rotation.x = Math.PI * 1.83 ; 
            frustumHelper.updateMatrixWorld();
            scene.add(frustumHelper);