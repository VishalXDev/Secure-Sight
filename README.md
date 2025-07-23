🔒 SecureSight Dashboard
SecureSight is a full-stack, real-time monitoring dashboard built with Next.js 15, React Three Fiber, and Zustand. It features a sleek UI, a 3D visualization scene, incident playback with a synced timeline, drag-and-drop incident reordering, and more — designed for managing security camera feeds and incidents efficiently.

🚀 Features
✅ Core Features
📺 Dashboard View – Overview of scenes, cameras, and incidents

🎥 Cameras Page – Manage and view connected camera data

🌐 Scenes Page – 3D scene rendered using Blender .glb model with React Three Fiber

⚠️ Incidents Page – View, manage, and reorder incidents

👤 Users Page – Admin view of registered users

⏱️ Incident Player – Timeline-synced playback of incident video

🧩 Global State Management – Zustand manages state across timeline/player/scene

🧪 Bonus Features
📊 Interactive timeline with incident markers synced to player

🔄 Drag-and-drop incident reordering (@hello-pangea/dnd)

🎮 3D object interactions: hover + click functionality in React Three Fiber scene

📱 Fully responsive design for desktop and mobile

🚀 Performance optimizations with useMemo, lazy loading, and @react-three/drei/Preload

🧱 Tech Stack
Technology	Description
Next.js 15 (App Router)	Full-stack framework (SSR + API Routes)
TypeScript	Type safety across codebase
Tailwind CSS	Utility-first styling for fast UI dev
Zustand	Lightweight, scalable state management
Framer Motion	Smooth, modern animations
React Three Fiber	3D rendering using WebGL via Three.js
@hello-pangea/dnd	Drag-and-drop experience
Prisma + MongoDB	Database ORM and schema
Blender + GLB	3D assets authored in Blender

⚙️ Getting Started
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/VishalXDev/secure-sight-dashboard.git
cd secure-sight-dashboard
2. Install Dependencies
bash
Copy
Edit
npm install
3. Run the Development Server
bash
Copy
Edit
npm run dev
Visit http://localhost:3000 to view the dashboard.

🗂️ Project Structure
bash
Copy
Edit
/app
  /dashboard       # Overview of scene/camera/incident stats
  /cameras         # View and manage camera info
  /scenes          # View 3D scenes from Blender model
  /incidents       # Incident timeline + playback
  /users           # Admin users list
/components        # Navbar, Player, Timeline, SceneRenderer
/lib               # Utilities (e.g. formatDuration, Zustand stores)
/public/favicon    # Favicon assets
/prisma/schema.prisma # DB schema using MongoDB
📁 Favicon Setup
All favicon files are placed in:

arduino
Copy
Edit
/public/favicon/
And used inside app/layout.tsx like:

tsx
Copy
Edit
<link rel="icon" href="/favicon/icons8-bullet-camera-ios-17-filled-32.png" />
🧪 Optional Enhancements
✅ Sync 3D camera nodes with selected incidents
✅ Persist state via localStorage or backend
🔜 Add WebSocket for real-time camera updates
🔒 Implement RBAC (Role-based Access Control)
📡 Connect to real camera feeds and incidents backend

👨‍💻 Author
Developed by Vishal Dwivedy
GitHub: https://github.com/VishalXDev