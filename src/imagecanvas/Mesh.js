import React, { useRef, useMemo } from 'react';
import { uApi } from '../utils/index.js'
import {useFrame} from 'react-three-fiber'
import '../styles.css'

const fragmentShader = `
  uniform sampler2D image;

  uniform float brightness;
  uniform float contrast;

  uniform float blackpoint;
  uniform float whitepoint;

  varying vec2 vUv;

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

  const ref = useRef()
  const material = useRef()

  var uniforms = useMemo(
    () =>
      uApi.getState().channels[props.channel-1].uniforms,
    []
  )

  useFrame(state => {
    material.current.uniforms.brightness.value = uApi.getState().channels[props.channel-1].uniforms.brightness.value;
    material.current.uniforms.contrast.value = uApi.getState().channels[props.channel-1].uniforms.contrast.value;
    material.current.uniforms.whitepoint.value = uApi.getState().channels[props.channel-1].uniforms.whitepoint.value;
    material.current.uniforms.blackpoint.value = uApi.getState().channels[props.channel-1].uniforms.blackpoint.value;
    material.current.uniforms.image.value = uApi.getState().channels[props.channel-1].uniforms.image.value;
  })

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
  )
}

export default Mesh;
