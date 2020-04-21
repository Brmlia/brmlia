import React, { useRef, useMemo } from 'react';
import { uApi } from '../utils/index.js';
import { useFrame } from 'react-three-fiber';
import * as THREE from 'three';

const fragmentShader = `
  uniform sampler2D image;

  uniform float brightness;
  uniform float contrast;

  uniform float blackpoint;
  uniform float whitepoint;
  uniform vec3 color;

  varying vec2 vUv;

  vec4 getInputColor()
  {
    return vec4(color, 1.0); // Just a test
  }

  vec4 toGrayscale(in vec4 color)
  {
    float average = (color.r + color.g + color.b) / 3.0;
    return vec4(average, average, average, 1.0);
  }

  vec4 colorize(in vec4 grayscale, in vec4 color)
  {
    return (grayscale * color);
  }

  void main() {
    gl_FragColor = texture2D(image, vUv);
    gl_FragColor.rgb += brightness;

    if (contrast > 0.0) {
      gl_FragColor.rgb = (gl_FragColor.rgb - 0.5) / (1.0 - contrast) + 0.5;
    } else {
      gl_FragColor.rgb = (gl_FragColor.rgb - 0.5) * (1.0 + contrast) + 0.5;
    }

    float black_point = blackpoint / 255.0;
    float white_point = blackpoint == whitepoint ? (255.0 / 0.00025) : (255.0 / (whitepoint - blackpoint));

    gl_FragColor.rgb = gl_FragColor.rgb * white_point - (white_point * black_point);
    // *******  color  *******
    // This is the color you want to apply
    // in the "colorize" step. Should ultimately be a uniform var.
    vec4 c = vec4(0.6, 1.0, 1.0, 1.0);

    // The input fragment color.
    // Can come from a texture, a varying or a constant.
    vec4 inputColor = getInputColor();
  
    // Convert to grayscale first:
    vec4 grayscale = toGrayscale(inputColor);

    // Then "colorize" by simply multiplying the grayscale
    // with the desired color.
    vec4 colorizedOutput = colorize(grayscale, c);

    //gl_FragColor = colorizedOutput;

  }
`;

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }
`;

function Mesh(props) {
  const ref = useRef();
  const material = useRef();
  console.log('chanel: ', props.channel);
  var uniforms = useMemo(
    () => uApi.getState().channels[props.channel - 1].uniforms,
    [props]
  );

  useFrame(state => {
    material.current.uniforms.brightness.value = uApi.getState().channels[
      props.channel - 1
    ].uniforms.brightness.value;
    material.current.uniforms.contrast.value = uApi.getState().channels[
      props.channel - 1
    ].uniforms.contrast.value;
    material.current.uniforms.whitepoint.value = uApi.getState().channels[
      props.channel - 1
    ].uniforms.whitepoint.value;
    material.current.uniforms.blackpoint.value = uApi.getState().channels[
      props.channel - 1
    ].uniforms.blackpoint.value;
    material.current.uniforms.image.value = uApi.getState().channels[
      props.channel - 1
    ].uniforms.image.value;
    material.current.uniforms.color.value = uApi.getState().channels[
      props.channel - 1
    ].uniforms.color.value;
  });
  let color = new THREE.Color(
    uApi.getState().channels[props.channel - 1].uniforms.color.value
  );
  return (
    <mesh ref={ref} scale={[1.0, 1.0, 1.0]}>
      <planeBufferGeometry attach="geometry" args={[5.0, 5.0]} />
      <shaderMaterial
        attach="material"
        ref={material}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default Mesh;
