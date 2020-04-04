import { Scene, PerspectiveCamera, WebGLRenderer } from 'three';

export const scene = new Scene();
export const camera = new PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
export const renderer =  new WebGLRenderer({ antialias:true });

renderer.setSize(window.innerWidth, window.innerHeight);

export const addMeshToScene = (canvas) => {
  scene.add(canvas);
  return canvas;
}
export const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};
