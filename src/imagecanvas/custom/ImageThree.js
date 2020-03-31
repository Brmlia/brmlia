import React, { Component } from "react";
import {TestImageWrapper} from "./TestImageWrapper.js"

import Annotator from "./ImageDraw.js";

import Image from "./TestImage.js";

import { Canvas } from 'react-three-fiber';
import Slider from "./../../components/slider.js";
import { withUniformStore } from '../../components/utils.js';

import * as THREE from 'three';

class Annotator3 extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
        image: props.image,
        };

        //var fu = new Image();
    }

    render() {

    // Create the scene and a camera to view it
    var catScene = new THREE.Scene();

    /**
    * Camera
    **/

    // Specify the portion of the scene visiable at any time (in degrees)
    var fieldOfView = 75;

    // Specify the camera's aspect ratio
    var aspectRatio = window.innerWidth / window.innerHeight;

    // Specify the near and far clipping planes. Only objects
    // between those planes will be rendered in the scene
    // (these values help control the number of items rendered
    // at any given time)
    var nearPlane = 0.1;
    var farPlane = 1000;

    // Use the values specified above to create a camera
    var camera = new THREE.PerspectiveCamera(
      fieldOfView, aspectRatio, nearPlane, farPlane
    );

    // Finally, set the camera's position in the z-dimension
    camera.position.z = 5;

    /**
    * Renderer
    **/

    // Create the canvas with a renderer
    var renderer = new THREE.WebGLRenderer({antialias: true});
    //var renderer = new THREE.WebGLRenderer({alpha: true});

    // Specify the size of the canvas
    renderer.setSize( window.innerWidth, window.innerHeight );

    // From Stack overflow
    //renderer.autoClear = false; // important!
    renderer.setViewport( 0, 0, window.innerWidth, window.innerHeight );

    // Add the canvas to the DOM
    document.body.appendChild( renderer.domElement );

    /**
    * Image
    **/

    // Create a texture loader so we can load our image file
    var loader = new THREE.TextureLoader();


    // Load an image file into a custom material
    var material = new THREE.MeshLambertMaterial({
      map: loader.load('https://s3.amazonaws.com/duhaime/blog/tsne-webgl/assets/cat.jpg')
    });

    // var material = new THREE.MeshLambertMaterial({
    //   map: loader.load('https://data.broadinstitute.org/bbbc/BBBC042/BBBC042_example2.png')
    // });
    var img = TestImageWrapper();

    console.log(img);

    // create a plane geometry for the image with a width of 10
    // and a height that preserves the image's aspect ratio
    var geometry = new THREE.PlaneGeometry(100, 100*.75);

    // combine our image geometry and material into a mesh
    var mesh = new THREE.Mesh(geometry, material);

    // set the position of the image mesh in the x,y,z dimensions
    mesh.position.set(0,0,0)

    // add the image to the scene
    catScene.add(mesh);

    // Add a point light with #fff color, .7 intensity, and 0 distance
    var light = new THREE.PointLight( 0xffffff, 1, 0 );

    // Specify the light's position
    light.position.set(1, 1, 100 );

    var camera2 = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera2.position.set( 0, 0, 100 );
    camera2.lookAt( 0, 0, 0 );

    var sceneBox = new THREE.Scene();
    sceneBox.background = new THREE.Color( 0xff0000 );
    var boxMaterial = new THREE.LineBasicMaterial({color: 0x0000ff});

    var points = [];
    points.push( new THREE.Vector3(-3,0,0));
    points.push( new THREE.Vector3(-3,3,0));
    points.push( new THREE.Vector3(0,3,0));
    points.push( new THREE.Vector3(0,0,0));
    points.push( new THREE.Vector3(-3,0,0));

    var geometry2 = new THREE.BufferGeometry().setFromPoints( points );
    //var boxMaterial = new THREE.LineBasicMaterial({color: 0x0000ff});
    var lineOnCat = new THREE.Line( geometry2, boxMaterial );
    sceneBox.add( lineOnCat );

    points = [];
    points.push( new THREE.Vector3(-4,0,0));
    points.push( new THREE.Vector3(-4,4,0));
    points.push( new THREE.Vector3(0,4,0));
    points.push( new THREE.Vector3(0,0,0));
    points.push( new THREE.Vector3(-4,0,0));

    var geometry5 = new THREE.BufferGeometry().setFromPoints( points );
    //var boxMaterial = new THREE.LineBasicMaterial({color: 0x0000ff});
    var lineOnCat2 = new THREE.Line( geometry5, boxMaterial );
    sceneBox.add( lineOnCat2 );

    // Add a point light with #fff color, .7 intensity, and 0 distance
    var light2 = new THREE.PointLight( 0xffffff, 1, 0 );

    // Specify the light's position
    light2.position.set(1, 1, 100 );

    // Add the light to the scene
    sceneBox.add(light2)

    var meshLayers = new THREE.Mesh(geometry, material);
    sceneBox.add( meshLayers );


    function animate() {
    requestAnimationFrame( animate );
      //renderer.render( catScene, camera );
      //renderer.setClearColor(0xffffff, 0);
      //renderer.clearDepth();
      renderer.render( sceneBox, camera2 );
    }

    renderer.setClearColor(0xffffff, 0);
    renderer.clearDepth();


    animate();

    return (""

      )
    }
};

export default Annotator3;
