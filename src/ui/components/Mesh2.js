import React, { useRef, useMemo } from 'react';
import { useFrame } from 'react-three-fiber';

import {
  uApi
} from './index.js';

const fragmentShader = `
  uniform sampler2D image;

  uniform float brightness;
  uniform float contrast;

  uniform float blackpoint;
  uniform float whitepoint;
  uniform float opacity;
  uniform vec3 color;

  varying vec2 vUv;

  vec4 setBrightness(in vec4 clr, in float br) {
    clr.rgb += br;
    return clr;
  }

  vec4 setContrast(in vec4 clr, in float ct) {
    if (ct > 0.0) {
      clr.rgb = (clr.rgb - 0.5) / (1.0 - ct) + 0.5;
    } else {
      clr.rgb = (clr.rgb - 0.5) * (1.0 + ct) + 0.5;
    }
    return clr;
  }

  vec4 setWpBp(in vec4 clr, in float bp, in float wp) {
    float _blackpoint = bp / 255.0;
    float _whitepoint = bp == wp ? (255.0 / 0.00025) : (255.0 / (wp - bp));
    clr.rgb = clr.rgb * _whitepoint - (_whitepoint * _blackpoint);
    return clr;
  }

  vec4 setOpacity(in vec3 clr, in float opc) {
    vec4 _color = vec4(clr, opc);
    return _color;
  }

  vec4 sampleColor() {
    // red with 50% opacity
    return vec4(1.0, 0.0, 0.0, 0.5);
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

  vec4 applyColorize(in vec4 color, in vec4 overlay) {
    vec4 grayscale = toGrayscale(color);
    vec4 colorizedOutput = colorize(grayscale, overlay);
    return colorizedOutput;
  }

  vec4 applyOverlay(in vec4 color, in vec4 overlay) {
    return (vec4(mix(color.rgb, overlay.rgb, overlay.a), color.a));
  }

  void main() {
    vec4 tColor = texture2D(image, vUv);
    tColor = setBrightness(tColor, brightness);
    tColor = setContrast(tColor, contrast);
    tColor = setWpBp(tColor, blackpoint, whitepoint);

    vec4 oColor = setOpacity(color, opacity);

    // tColor = applyColorize(tColor, oColor);
    tColor = applyOverlay(tColor, oColor);
    gl_FragColor = tColor;
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
    material.current.uniforms.opacity.value = uApi.getState().channels[
      props.channel - 1
    ].uniforms.opacity.value;
    material.current.uniforms.image.value = uApi.getState().channels[
      props.channel - 1
    ].uniforms.image.value;
    material.current.uniforms.color.value = uApi.getState().channels[
      props.channel - 1
    ].uniforms.color.value;
  });

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
