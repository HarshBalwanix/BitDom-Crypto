import { PresentationControls, Stage, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";

function Model(props) {
  const { scene } = useGLTF("./bitcoin_twice.glb");
  return <primitive object={scene} {...props} />;
}

const OurModel = () => {
  return (
    <div>
      <Canvas
        dpr={[1, 2]}
        shadows
        camera={{ fov: 45 }}
        style={{
          position: "absolute",
          top: "10%",
        }}
      >
        <color attach="background" args={["#13073a"]} />
        <ambientLight intensity={-1} />

        <PresentationControls
          speed={1.5}
          global
          zoom={0.5}
          polar={[-0.1, Math.PI / 4]}
        >
          <Stage environment={null}>
            <Model scale={0.01} />
          </Stage>
        </PresentationControls>
      </Canvas>
    </div>
  );
};

export default OurModel;
