import React, { useState } from "react";
import Image from "./TestImage.js";
import { Canvas } from 'react-three-fiber'
import { useSpring, a } from 'react-spring/three';


// function component


	const Box = () => {

		const  [hovered, setHovered] = useState(false);
		const  [active, setActive] = useState(false);

 		return (
		<mesh 
		onPointerOver={() => setHovered(true)}
		onPointerOut={() => setHovered(false)}
		onClick={() => setActive(!active)}
		scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}

		>
	    
	      
	      <boxBufferGeometry attach="geometry" args={[1,1,1]} />
	      <meshBasicMaterial attach="material" color={hovered ? "hotpink" : "gray"} />
	    </mesh>
		
		)
}


  export default () => (

    <Canvas >

    	<Image/>
    	<Box />

    </Canvas>
  
)