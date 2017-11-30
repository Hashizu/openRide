
    // global variables
    var renderer1;
    var scene1;
    var camera1;
    var stats;

    var isTweening = false;

    function createCube() {
        var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
        var cubeMaterial = new THREE.MeshLambertMaterial({color: 0x6666cc, transparent: true, opacity: 1.0});
        var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.castShadow = true;
        cube.name = 'cube';
        cube.position = new THREE.Vector3(8, 12, 0);
        scene1.add(cube);
        return cube;
    }

    function createPlane(x,y,z,rot){
      var wi=4;
      var planeGeometry = new THREE.PlaneGeometry(wi, wi, wi, 4);
      var planeMaterial = new THREE.MeshLambertMaterial({color: 0x6666cc});
      var plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.receiveShadow = true;
      if(rot!=2){
          plane.rotation.x = -0.5 * Math.PI * rot;
      }else {
          plane.rotation.y =  0.5 * Math.PI ;
      }
      plane.position.x = x;
      plane.position.y = y;
      plane.position.z = z;
      scene1.add(plane);
      return plane;
    }
    /**
     * Initializes the scene1, camera1 and objects. Called when the window is
     * loaded by using window.onload (see below)
     */
    function init1() {

        scene1 = new THREE.Scene();
        camera1 = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderer1 = new THREE.WebGLRenderer();
        renderer1.setClearColor(0x000000, 1.0);
        renderer1.setSize(window.innerWidth, window.innerHeight);
        renderer1.shadowMapEnabled = true;

        var cube = createCube();
        console.log("x���W:"+cube.position.x+"  y���W:"+cube.position.y+"  z���W:"+cube.position.z);
        camera1.position.x = 30;
        camera1.position.y = 30;
        camera1.position.z = 30;
        camera1.lookAt(scene1.position);

        var spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(30, 50, 30);
        spotLight.shadowCameraNear = 200;
        spotLight.shadowCameraFar = 300;
        spotLight.castShadow = true;
        scene1.add(spotLight);

        addStatsObject();
        // add the output of the renderer to the html element
        document.body.appendChild(renderer1.domElement);
        // call the render function, after the first render, interval is determined
        // by requestAnimationFrame
        render1();

    }

    function takeStepRight(cube, start, end, time) {
        var cubeGeometry = cube.geometry;
        var widht = 4;
        if (!isTweening) {
            var tween = new TWEEN.Tween({ x: start, cube: cube, previous: 0})
                    .to({ x: end }, time )
                .easing(TWEEN.Easing.Linear.None)
                .onStart(function () {
                    isTweening = true;
                    cube.position.y += -widht / 2;
                    cube.position.z += -widht / 2;
                    cubeGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, widht / 2, widht / 2));
                })
                .onUpdate(function () {
                    cube.geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-(this.x - this.previous)));
                    cube.geometry.verticesNeedUpdate = true;
                    cube.geometry.normalsNeedUpdate = true;
                    this.previous = this.x;
                })
                .onComplete(function () {
                    cube.position.y += 2;
                    cube.position.z += -2;
                    cubeGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, -widht / 2, widht / 2));
                    cube.position.x = Math.round(cube.position.x);
                    cube.position.y = Math.round(cube.position.y);
                    cube.position.z = Math.round(cube.position.z);
                    isTweening = false;
                })
                .start();
        }
    }

    function takeStepLeft(cube, start, end, time) {
        var cubeGeometry = cube.geometry;
        var widht = 4;
        if (!isTweening) {
            var tween = new TWEEN.Tween({ x: start, cube: cube, previous: 0})
                    .to({ x: end }, time )
                    .easing(TWEEN.Easing.Linear.None)
                    .onStart(function () {
                        isTweening = true;
                        cube.position.y += -widht / 2;
                        cube.position.z += widht / 2;
                        cubeGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, widht / 2, -widht / 2));
                    })
                    .onUpdate(function () {
                        cube.geometry.applyMatrix(new THREE.Matrix4().makeRotationX(this.x - this.previous));
                        cube.geometry.verticesNeedUpdate = true;
                        cube.geometry.normalsNeedUpdate = true;
                        cube.previous = this.x;
                        this.previous = this.x;
                    })
                    .onComplete(function () {
                        cube.position.y += 2;
                        cube.position.z += 2;
                        cubeGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, -widht / 2, -widht / 2));
                        cube.position.x = Math.round(cube.position.x);
                        cube.position.y = Math.round(cube.position.y);
                        cube.position.z = Math.round(cube.position.z);
                        isTweening = false;
                    })
                    .start();
        }
    }

    function takeStepBackward(cube, start, end, time) {
        var widht = 4;
        var cubeGeometry = cube.geometry;

        if (!isTweening) {
            var tween = new TWEEN.Tween( { x: start, cube: cube, previous: 0} )
                    .to( { x: end }, time )
                    .easing( TWEEN.Easing.Linear.None )
                    .onStart( function() {

                        isTweening = true;
                        cube.position.y+=-widht/2;
                        cube.position.x+=widht/2;
                        cubeGeometry.applyMatrix(new THREE.Matrix4().makeTranslation( -widht/2,  widht/2, 0 ) );
                    })
                    .onUpdate( function () {
                        cube.geometry.applyMatrix( new THREE.Matrix4().makeRotationZ( -(this.x-this.previous) ) );
                        cube.geometry.verticesNeedUpdate=true;
                        cube.geometry.normalsNeedUpdate = true;
                        cube.previous = this.x;
                        this.previous = this.x;
                    } )
                    .onComplete(function() {
                        cube.position.y+=2;
                        cube.position.x+=2;

                        cubeGeometry.applyMatrix(new THREE.Matrix4().makeTranslation( -widht/2, -widht/2, 0 ) );

                        cube.position.x=Math.round(cube.position.x);
                        cube.position.y=Math.round(cube.position.y);
                        cube.position.z=Math.round(cube.position.z);

                        isTweening = false;
                    })
                    .start();
        }
    }

    function takeStepForward(cube, start, end, time) {
        var widht = 4;
        var cubeGeometry = cube.geometry;

        if (!isTweening) {
            var tween = new TWEEN.Tween( { x: start, cube: cube, previous: 0} )
                    .to( { x: end }, time )
                    .easing( TWEEN.Easing.Linear.None )
                    .onStart( function() {
                        isTweening = true;
                        cube.position.y+=-widht/2;
                        cube.position.x+=-widht/2;
                        cubeGeometry.applyMatrix(new THREE.Matrix4().makeTranslation( widht/2,  widht/2, 0 ) );
                    })
                    .onUpdate( function () {
                        cube.geometry.applyMatrix( new THREE.Matrix4().makeRotationZ( (this.x-this.previous) ) );

                        cube.geometry.verticesNeedUpdate=true;
                        cube.geometry.normalsNeedUpdate = true;

                        cube.previous = this.x;
                        this.previous = this.x;
                    } )
                    .onComplete(function() {
                        cube.position.y+=widht/2;
                        cube.position.x+=-widht/2;
                        cubeGeometry.applyMatrix(new THREE.Matrix4().makeTranslation( widht/2, -widht/2, 0 ) );

                        cube.position.x=Math.round(cube.position.x);
                        cube.position.y=Math.round(cube.position.y);
                        cube.position.z=Math.round(cube.position.z);

                        isTweening = false;
                    })
                    .start();
        }
    }

    function takeStepDown(cube, start, end, time) {
        var widht = 4;
        var cubeGeometry = cube.geometry;

        if (!isTweening) {
            var tween = new TWEEN.Tween( { x: start, cube: cube, previous: 0} )
                    .to( { x: end }, time )
                    .easing( TWEEN.Easing.Linear.None )
                    .onStart( function() {
                        isTweening = true;
                        cube.position.y+=-widht/2;
                        cube.position.z+=-widht/2;
                        cubeGeometry.applyMatrix(new THREE.Matrix4().makeTranslation( 0, widht/2, widht/2) );
                    })
                    .onUpdate( function () {
                        cube.geometry.applyMatrix( new THREE.Matrix4().makeRotationX( (this.x-this.previous) ) );

                        cube.geometry.verticesNeedUpdate=true;
                        cube.geometry.normalsNeedUpdate = true;

                        this.previous = this.x;
                    } )
                    .onComplete(function() {
                        cube.position.y+=-widht/2;
                        cube.position.z+=widht/2;
                        cubeGeometry.applyMatrix(new THREE.Matrix4().makeTranslation( 0, widht/2, -widht/2 ) );

                        cube.position.x=Math.round(cube.position.x);
                        cube.position.y=Math.round(cube.position.y);
                        cube.position.z=Math.round(cube.position.z);

                        isTweening = false;
                    })
                    .start();
        }
    }

    function takeStepUBack(cube, start, end, time) {
        var widht = 4;
        var cubeGeometry = cube.geometry;

        if (!isTweening) {
            var tween = new TWEEN.Tween( { x: start, cube: cube, previous: 0} )
                    .to( { x: end }, time )
                    .easing( TWEEN.Easing.Linear.None )
                    .onStart( function() {
                        isTweening = true;
                        cube.position.x+=widht/2;
                        cube.position.z+=-widht/2;
                        cubeGeometry.applyMatrix(new THREE.Matrix4().makeTranslation( -widht/2,0, widht/2) );
                    })
                    .onUpdate( function () {
                        cube.geometry.applyMatrix( new THREE.Matrix4().makeRotationY( (this.x-this.previous) ) );

                        cube.geometry.verticesNeedUpdate=true;
                        cube.geometry.normalsNeedUpdate = true;

                        this.previous = this.x;
                    } )
                    .onComplete(function() {
                        cube.position.x+=widht/2;
                        cube.position.z+=widht/2;
                        cubeGeometry.applyMatrix(new THREE.Matrix4().makeTranslation( -widht/2, 0, -widht/2 ) );

                        cube.position.x=Math.round(cube.position.x);
                        cube.position.y=Math.round(cube.position.y);
                        cube.position.z=Math.round(cube.position.z);

                        isTweening = false;
                    })
                    .start();
        }
    }

    function takeStepURight(cube, start, end, time) {
        var widht = 4;
        var cubeGeometry = cube.geometry;

        if (!isTweening) {
            var tween = new TWEEN.Tween( { x: start, cube: cube, previous: 0} )
                    .to( { x: end }, time )
                    .easing( TWEEN.Easing.Linear.None )
                    .onStart( function() {
                        isTweening = true;
                        cube.position.x+=-widht/2;
                        cube.position.z+=-widht/2;
                        cubeGeometry.applyMatrix(new THREE.Matrix4().makeTranslation( widht/2,0, widht/2) );
                    })
                    .onUpdate( function () {
                        cube.geometry.applyMatrix( new THREE.Matrix4().makeRotationY( (this.x-this.previous) ) );

                        cube.geometry.verticesNeedUpdate=true;
                        cube.geometry.normalsNeedUpdate = true;

                        this.previous = this.x;
                    } )
                    .onComplete(function() {
                        cube.position.x+=widht/2;
                        cube.position.z+=-widht/2;
                        cubeGeometry.applyMatrix(new THREE.Matrix4().makeTranslation( -widht/2, 0, widht/2 ) );

                        cube.position.x=Math.round(cube.position.x);
                        cube.position.y=Math.round(cube.position.y);
                        cube.position.z=Math.round(cube.position.z);

                        isTweening = false;
                    })
                    .start();
        }
    }

    function takeStepUp(cube, start, end, time) {
        var widht = 4;
        var cubeGeometry = cube.geometry;

        if (!isTweening) {
            var tween = new TWEEN.Tween( { x: start, cube: cube, previous: 0} )
                    .to( { x: end }, time )
                    .easing( TWEEN.Easing.Linear.None )
                    .onStart( function() {
                        isTweening = true;
                        cube.position.x+=-widht/2;
                        cube.position.y+=widht/2;
                        cubeGeometry.applyMatrix(new THREE.Matrix4().makeTranslation( widht/2, -widht/2 ,0) );
                    })
                    .onUpdate( function () {
                        cube.geometry.applyMatrix( new THREE.Matrix4().makeRotationZ( (this.x-this.previous) ) );

                        cube.geometry.verticesNeedUpdate=true;
                        cube.geometry.normalsNeedUpdate = true;

                        this.previous = this.x;
                    } )
                    .onComplete(function() {
                        cube.position.x+=widht/2;
                        cube.position.y+=widht/2;
                        cubeGeometry.applyMatrix(new THREE.Matrix4().makeTranslation( -widht/2, -widht/2,0 ) );

                        cube.position.x=Math.round(cube.position.x);
                        cube.position.y=Math.round(cube.position.y);
                        cube.position.z=Math.round(cube.position.z);

                        isTweening = false;
                    })
                    .start();
        }
    }

    function takeStepULeft(cube, start, end, time) {
        var widht = 4;
        var cubeGeometry = cube.geometry;

        if (!isTweening) {
            var tween = new TWEEN.Tween( { x: start, cube: cube, previous: 0} )
                    .to( { x: end }, time )
                    .easing( TWEEN.Easing.Linear.None )
                    .onStart( function() {
                        isTweening = true;
                        cube.position.x+=-widht/2;
                        cube.position.z+=widht/2;
                        cubeGeometry.applyMatrix(new THREE.Matrix4().makeTranslation( widht/2, 0,-widht/2 ) );
                    })
                    .onUpdate( function () {
                        cube.geometry.applyMatrix( new THREE.Matrix4().makeRotationY( -(this.x-this.previous) ) );

                        cube.geometry.verticesNeedUpdate=true;
                        cube.geometry.normalsNeedUpdate = true;

                        this.previous = this.x;
                    } )
                    .onComplete(function() {
                        cube.position.x+=widht/2;
                        cube.position.z+=widht/2;
                        cubeGeometry.applyMatrix(new THREE.Matrix4().makeTranslation( -widht/2,0, -widht/2 ) );

                        cube.position.x=Math.round(cube.position.x);
                        cube.position.y=Math.round(cube.position.y);
                        cube.position.z=Math.round(cube.position.z);

                        isTweening = false;
                    })
                    .start();
        }
    }

    function takeStepJump(cube, start, end, time) {
        var cubeGeometry = cube.geometry;

        if (!isTweening) {
            var tween = new TWEEN.Tween( { x: start, cube: cube, previous: 0} )
                    .to( { x: end }, time )
                    .easing( TWEEN.Easing.Linear.None )
                    .onStart( function() {
                        isTweening = true;
                    })
                    .onUpdate( function () {
                        cube.geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0,-this.previous+this.x,0 ) );
                        cube.geometry.verticesNeedUpdate=true;
                        cube.geometry.normalsNeedUpdate = true;
                        this.previous = this.x;
                    } )
                    .onComplete(function() {
                        cube.position.x=Math.round(cube.position.x);
                        cube.position.y=Math.round(cube.position.y);
                        cube.position.z=Math.round(cube.position.z);
                        isTweening = false;
                    })
                    .start();

            var tween2 = new TWEEN.Tween( { x: start, cube: cube, previous: 0} )
                    .to( { x: -4.0 }, time )
                    .easing( TWEEN.Easing.Linear.None )
                    .onStart( function() {
                        isTweening = true;
                    })
                    .onUpdate( function () {
                        cube.geometry.applyMatrix( new THREE.Matrix4().makeTranslation( -this.previous+this.x,0,0 ) );
                        this.previous = this.x;
                    } )
                    .onComplete(function() {
                        isTweening = false;
                    })
                    .start();

            var tween3 = new TWEEN.Tween( { x: start, cube: cube, previous: 0} )
                    .to( { x: 2.5 }, time )
                    .easing( TWEEN.Easing.Linear.None )
                    .onStart( function() {
                        isTweening = true;
                    })
                    .onUpdate( function () {
                        cube.geometry.applyMatrix( new THREE.Matrix4().makeTranslation(0,0, -this.previous+this.x) );
                        this.previous = this.x;
                    } )
                    .onComplete(function() {
                        isTweening = false;
                    })
                    .start();
        }
    }

    var count = 0;
    function takeStop(cube,start,end ,time) {
      if(count==0)
        cube.scale.set(1.2,1.2,1.2);

        if (count < time) {
            isTweening =true;
            count++;
        }else{

          isTweening=false;
        }
    }

    function takeJumpDown(cube, start, end, time) {
        var widht = 4;
        var cubeGeometry = cube.geometry;

        if (!isTweening) {
            var tween = new TWEEN.Tween( { x: start, cube: cube, previous: 0} )
                    .to( { x: end }, time )
                    .easing( TWEEN.Easing.Linear.None )
                    .onStart( function() {
                        isTweening = true;

                    })
                    .onUpdate( function () {
                        cube.geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0,this.previous-this.x,0 ) );
                        cube.geometry.verticesNeedUpdate=true;
                        cube.geometry.normalsNeedUpdate = true;
                        this.previous = this.x;
                    } )
                    .onComplete(function() {
                        cube.position.x=Math.round(cube.position.x);
                        cube.position.y=Math.round(cube.position.y);
                        cube.position.z=Math.round(cube.position.z);
                        isTweening = false;
                    })
                    .start();
        }
    }


    function addStatsObject() {
        stats = new Stats();
        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';

        document.body.appendChild( stats.domElement );
    }

    /**
     * Called when the scene1 needs to be rendered. Delegates to requestAnimationFrame
     * for future renders
     */
    var runstep=0;
    function render1() {
      var rottime = 160;
      var prestep=0;

      prestep = runstep;
      if(!isTweening){
        runstep+=1;
        if(runstep<30){
          //console.log(runstep);
        }
      }

      /*How to move the cube*/
      switch (runstep) {
        case 1:
          takeStepForward(scene1.getObjectByName('cube'), 0, 0.5 * Math.PI, rottime);
          break;
        case 2:
          takeStepForward(scene1.getObjectByName('cube'), 0, 0.5 * Math.PI, rottime);
          break;
        case 3:
          takeStepLeft(scene1.getObjectByName('cube'), 0, 0.5 * Math.PI, rottime);
          break;
        case 4:
          takeStepLeft(scene1.getObjectByName('cube'), 0, 0.5 * Math.PI, rottime);
          break;
        case 5:
          takeStepLeft(scene1.getObjectByName('cube'), 0, 0.5 * Math.PI, rottime);
          break;
        case 6:
          takeStepDown(scene1.getObjectByName('cube'), 0, 0.5 * Math.PI, rottime);
          break;
        case 7:
          takeStepDown(scene1.getObjectByName('cube'), 0, 0.5 * Math.PI, rottime);
          break;
        case 8:
          takeStepDown(scene1.getObjectByName('cube'), 0, 0.5 * Math.PI, rottime);
          break;
        case 9:
          takeStepUBack(scene1.getObjectByName('cube'), 0, 0.5 * Math.PI, rottime);
          break;
        case 10:
          takeStepUBack(scene1.getObjectByName('cube'), 0, 0.5 * Math.PI, rottime);
          break;
        case 11:
          takeStepUBack(scene1.getObjectByName('cube'), 0, 0.5 * Math.PI, rottime);
          break;
        case 12:
          takeStepURight(scene1.getObjectByName('cube'), 0, 0.5 * Math.PI, rottime);
          break;
        case 13:
          takeStepURight(scene1.getObjectByName('cube'), 0, 0.5 * Math.PI, rottime);
          break;
        case 14:
          takeStepURight(scene1.getObjectByName('cube'), 0, 0.5 * Math.PI, rottime);
          break;
        case 15:
          takeStepUp(scene1.getObjectByName('cube'), 0, 0.5 * Math.PI, rottime);
          break;
        case 16:
          takeStepUp(scene1.getObjectByName('cube'), 0, 0.5 * Math.PI, rottime);
          break;
        case 17:
          takeStepULeft(scene1.getObjectByName('cube'), 0, 0.5 * Math.PI, rottime);
          break;
        case 18:
          takeStepJump(scene1.getObjectByName('cube'), 0, 8.0 , rottime);
          break;
        case 19:
          takeStop(scene1.getObjectByName('cube'),0,5, rottime/8);
          break;
        case 20:
          takeJumpDown(scene1.getObjectByName('cube'), 0, 8.5 , rottime);
          break;
        default: game();
      }

      /*Make Planes*/
      if((runstep-prestep)==1){
        switch (runstep-1) {
          case 1:
            createPlane(4,10,0,1);break;
          case 2:
            createPlane(0,10,0,1);break;
          case 3:
            createPlane(0,10,4,1);break;
          case 4:
            createPlane(0,10,8,1);break;
          case 6:
            createPlane(0,8,10,0);break;
          case 7:
            createPlane(0,4,10,0);break;
          case 8:
            createPlane(0,0,10,0);break;
          case 9:
            createPlane(4,0,10,0);break;
          case 10:
            createPlane(8,0,10,0);break;
          case 12:
            createPlane(10,0,8,2);break;
          case 13:
            createPlane(10,0,4,2);break;
          case 14:
            createPlane(10,0,0,2);break;
          case 15:
            createPlane(10,4,0,2);break;
          case 16:
            createPlane(10,8,0,2);break;
          case 17:
            createPlane(10,8,4,2);break;

          default:
        }
      }

        // update stats
        stats.update();
        TWEEN.update();
        // and render the scene1
        renderer1.render(scene1, camera1);
        // render using requestAnimationFrame
        requestAnimationFrame(render1);
    }

    /**
     * Function handles the resize event. This make sure the camera1 and the renderer
     * are updated at the correct moment.
     */
    function handleResize() {
        camera1.aspect = window.innerWidth / window.innerHeight;
        camera1.updateProjectionMatrix();
        renderer1.setSize(window.innerWidth, window.innerHeight);
    }

    // calls the init function when the window is done loading.
    // calls the handleResize function when the window is resized
    window.addEventListener('resize', handleResize, false);
