'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Html, useGLTF, Preload } from '@react-three/drei'
import { Suspense, useEffect, useRef, useMemo, useState } from 'react'
import * as THREE from 'three'

const ClickableModel = () => {
  const { scene, animations } = useGLTF('/models/SmartSight.glb')
  const mixer = useRef<THREE.AnimationMixer | null>(null)

  // Memoize scene to avoid unnecessary re-creation
  const clonedScene = useMemo(() => scene.clone(true), [scene])

  useEffect(() => {
    if (animations.length) {
      mixer.current = new THREE.AnimationMixer(clonedScene)
      animations.forEach((clip) => {
        mixer.current?.clipAction(clip).play()
      })
    }

    return () => {
      mixer.current?.stopAllAction()
    }
  }, [animations, clonedScene])

  useFrame((_, delta) => {
    mixer.current?.update(delta)
  })

  const handleClick = (event: any) => {
    event.stopPropagation()
    const clickedObject = event.object
    alert(`You clicked on: ${clickedObject.name}`)
  }

  return (
    <primitive
      object={clonedScene}
      scale={0.5}
      onPointerDown={handleClick}
    />
  )
}

export default function SmartSight3D() {
  return (
    <div className="w-full h-[600px] bg-[#111] rounded-xl shadow-lg overflow-hidden">
      <Canvas camera={{ position: [2, 2, 2], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <Suspense fallback={<Html center>Loading 3D model...</Html>}>
          <ClickableModel />
          <OrbitControls enableZoom enableRotate enablePan />
          <Environment preset="warehouse" background />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  )
}