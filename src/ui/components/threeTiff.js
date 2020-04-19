import React, { Component } from "react";
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import { fApi } from '../../utils/index.js'
import { updateImage } from './../../imagecanvas/CanvasControl.js'

const style = {
    height: 500 // we can control scene size by setting container dimensions
};

class ThreeTiff extends Component {

    state = {
      rgba: null,
      width: 0,
      height: 0,
      pages: [],
      loaded: 0,
      pagenumber: 0,
      texture: [],
      t1: null
    }

    updateForFile(state) {

      if (state) {
        const file = state.file[0];
        this.setState( {
          rgba: file.rgba,
          width: file.image.width,
          height: file.image.height,
          pages: file.pages,
          t1: new THREE.DataTexture(file.pages[0], file.image.width, file.image.height, THREE.RGBAFormat)
        })
        if (this.state.loaded < 1) {
          var texts = []
          var pages = file.pages
          for (var i = 0; i < pages.length; i++) {
          // for (var i = 0; i < 1; i++) {
            const page = pages[i];
            var text = new THREE.DataTexture(page, file.image.width, file.image.height, THREE.RGBAFormat);
            texts.push(text);
          }

          this.setState( prevState => ({
            ...prevState,
            texture: texts,
            loaded: prevState.loaded + 1
          }))


          this.sceneSetup();
          this.addCustomSceneObjects();
          this.startAnimationLoop();
        }
        updateImage(state.file[state.selected], this.channel)
      }
      this.forceUpdate();
    }

    componentDidMount() {
        // this.sceneSetup();
        // this.addCustomSceneObjects();
        // this.startAnimationLoop();
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
        window.cancelAnimationFrame(this.requestID);
        this.controls.dispose();
    }

    // Standard scene setup in Three.js. Check "Creating a scene" manual for more information
    // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
    sceneSetup = () => {
        // get container dimensions and use them for scene sizing
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75, // fov = field of view
            width / height, // aspect ratio
            0.1, // near plane
            1000 // far plane
        );
        this.camera.position.z = 9; // is used here to set some distance from a cube that is located at z = 0
        // OrbitControls allow a camera to orbit around the object
        // https://threejs.org/docs/#examples/controls/OrbitControls
        this.controls = new OrbitControls( this.camera, this.mount );
        this.renderer = new THREE.WebGLRenderer({alpha: true});
        this.renderer.setSize( width, height );
        this.mount.appendChild( this.renderer.domElement ); // mount using React ref

        this.renderer.setClearColor(0xffffff, 0);
        this.scene.background = null;
    };

    addLights = () => {
      const lights = [];
      lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
      lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
      lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

      lights[ 0 ].position.set( 0, 200, 0 );
      lights[ 1 ].position.set( 100, 200, 100 );
      lights[ 2 ].position.set( - 100, - 200, - 100 );

      this.scene.add( lights[ 0 ] );
      this.scene.add( lights[ 1 ] );
      this.scene.add( lights[ 2 ] );

    }

    addCube = () => {
      const geometry = new THREE.BoxGeometry(2, 2, 2);
      const material = new THREE.MeshPhongMaterial( {
          color: 0x156289,
          emissive: 0x072534,
          side: THREE.DoubleSide,
          flatShading: true
      } );
      this.cube = new THREE.Mesh( geometry, material );
      this.scene.add( this.cube );

    }

    addImageStack = () => {
      const geometry = new THREE.PlaneGeometry(640, 352);
      for (var i = 0; i < this.state.texture.length; i++) {
      // for (var i = 0; i < 1; i++) {
        var material = new THREE.MeshBasicMaterial({
          map: this.state.texture[i],
          opacity: 1.00,
          transparent: true,
          depthTest: false
        });
        var plane = new THREE.Mesh(geometry, material);

        // plane.position.y = 300 - i;
        // plane.rotation.x = 90 * Math.PI / 180;
        // plane.doubleSided = true;
        this.scene.add(plane);
      }
    }

    addSingleImage = () => {
      const geometry = new THREE.PlaneGeometry(640, 352);
      var material = new THREE.MeshBasicMaterial({
        map: this.state.t1,
        opacity: 1.00,
        transparent: true,
        depthTest: false
      });
      var plane = new THREE.Mesh(geometry, material);
      this.scene.add(plane);
    }

    // Here should come custom code.
    // Code below is taken from Three.js BoxGeometry example
    // https://threejs.org/docs/#api/en/geometries/BoxGeometry
    addCustomSceneObjects = () => {
        // this.addCube();
        this.addImageStack();
        // this.addSingleImage();
        this.addLights();
    };

    startAnimationLoop = () => {
        if (this.cube) {
          this.cube.rotation.x += 0.01;
          this.cube.rotation.y += 0.01;
        }

        this.renderer.render( this.scene, this.camera );

        // The window.requestAnimationFrame() method tells the browser that you wish to perform
        // an animation and requests that the browser call a specified function
        // to update an animation before the next repaint
        this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
    };

    handleWindowResize = () => {
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;

        this.renderer.setSize( width, height );
        this.camera.aspect = width / height;

        // Note that after making changes to most of camera properties you have to call
        // .updateProjectionMatrix for the changes to take effect.
        this.camera.updateProjectionMatrix();
    };

    render() {
      fApi.subscribe(state =>  {
        this.updateForFile(state);
      })
      return <div style={style} ref={ref => (this.mount = ref)} />;
    }
}

export default ThreeTiff;