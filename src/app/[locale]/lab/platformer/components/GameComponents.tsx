import React from 'react'
import { useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import Ecctrl from 'ecctrl'

export function Player() {
    return (
        <Ecctrl
            camInitDis={-10}
            camMaxDis={-10}
            camMinDis={-10}
            followLight
            maxVelLimit={5}
            jumpVel={6}
            autoBalanceSpringK={0} // Disable springing if not needed for simple platformer
            position={[0, 5, 0]}
        >
            <mesh castShadow>
                <capsuleGeometry args={[0.5, 1, 4, 8]} />
                <meshStandardMaterial color="#2dffd4" emissive="#002b20" emissiveIntensity={0.5} />
            </mesh>
        </Ecctrl>
    )
}

export function Level({ onWin }: { onWin: () => void }) {
    return (
        <group>
            {/* Floor */}
            <RigidBody type="fixed" friction={2}>
                <mesh position={[0, -2, 0]} receiveShadow>
                    <boxGeometry args={[100, 2, 20]} />
                    <meshStandardMaterial color="#1a1a1a" />
                </mesh>
            </RigidBody>

            {/* Platforms */}
            <RigidBody type="fixed" position={[10, 2, 0]}>
                <mesh receiveShadow castShadow>
                    <boxGeometry args={[5, 1, 5]} />
                    <meshStandardMaterial color="#a855f7" emissive="#3b0764" emissiveIntensity={0.8} />
                </mesh>
            </RigidBody>

            <RigidBody type="fixed" position={[18, 5, 0]}>
                <mesh receiveShadow castShadow>
                    <boxGeometry args={[5, 1, 5]} />
                    <meshStandardMaterial color="#ec4899" emissive="#831843" emissiveIntensity={0.8} />
                </mesh>
            </RigidBody>

            <RigidBody type="fixed" position={[28, 8, -4]} rotation={[0, 0, 0.2]}>
                <mesh receiveShadow castShadow>
                    <boxGeometry args={[8, 1, 4]} />
                    <meshStandardMaterial color="#facc15" emissive="#713f12" emissiveIntensity={0.5} />
                </mesh>
            </RigidBody>

            {/* Win Zone */}
            <RigidBody type="fixed" sensor position={[28, 10, -4]} onIntersectionEnter={() => onWin()}>
                <mesh visible={false}>
                    <boxGeometry args={[2, 2, 2]} />
                </mesh>
                <group position={[0, 0.5, 0]}>
                    <mesh>
                        <boxGeometry args={[0.5, 0.5, 0.5]} />
                        <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={2} />
                    </mesh>
                    <pointLight color="#00ff00" distance={3} intensity={5} />
                </group>
            </RigidBody>
        </group>
    )
}

export function Lights() {
    return (
        <>
            <ambientLight intensity={0.2} />
            <directionalLight
                position={[20, 30, 20]}
                intensity={1}
                castShadow
                shadow-bias={-0.0001}
            />
            <pointLight position={[10, 5, 0]} intensity={2} color="#a855f7" distance={10} />
            <pointLight position={[18, 8, 0]} intensity={2} color="#ec4899" distance={10} />
        </>
    )
}

export function GameState({ setGameState }: { setGameState: (s: 'playing' | 'won' | 'lost') => void }) {
    useFrame((state) => {
        if (state.camera.position.y < -10) {
            setGameState('lost')
        }
    })
    return null
}
