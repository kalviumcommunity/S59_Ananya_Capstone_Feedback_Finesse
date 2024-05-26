import React, { useState, useEffect, useRef } from 'react';
import { feature } from 'topojson-client';
import Globe from 'react-globe.gl';
import * as THREE from 'three';

const landMaterial = new THREE.MeshLambertMaterial({ color: '#900000', side: THREE.DoubleSide });

const World = () => {
  const [land, setLand] = useState([]);
  const globeRef = useRef(null);

  useEffect(() => {
    fetch('https://unpkg.com/world-atlas/land-110m.json')
    .then(response => response.json())
    .then(response => {
      setLand(feature(response, response.objects.land).features);
    });

    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.8; 
      globeRef.current.controls().autoRotate = true;
    }

  }, []);

  return (
    <>
    <div className="globe-container">
      <Globe
        ref={globeRef}
        polygonsData={land}
        polygonCapMaterial={landMaterial}
        backgroundColor="rgb(255, 255, 255)" 
        polygonSideColor={() => 'rgb(255, 255, 255)'}
        showGlobe={false}
        // globeImageUrl={'https://garden.spoonflower.com/c/9915758/p/f/m/c_PrrBpgF6T1KUSzgD4WOAITeQPaXkxYtzMULssGJW2ZoVVLXrQ/Light%20Baby%20Pink%20Solid.jpg'}
        showAtmosphere={false}
        // atmosphereColor='#ffd9d9'
        height={700} width={700} />
  </div>
  </>
  );
};

export default World;
