// src/app/3d/page.tsx
import SmartSight3D from '@/components/SmartSight3D'

export default function ThreeDPage() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">SmartSight 3D View</h1>
      <SmartSight3D />
    </main>
  )
}
