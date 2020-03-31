import React, { useState } from "react";
import Image from "./TestImage.js";
import { Canvas } from 'react-three-fiber'
import { useSpring, a } from 'react-spring/three';


export function TestImageWrapper() {
	  return (
	  	<Canvas>
	  	  <Image />
	  	</Canvas>
	  	)}

	export default TestImageWrapper;


