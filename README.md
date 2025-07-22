🔒 SecureSight Dashboard

SecureSight is a full-stack, real-time monitoring dashboard built with Next.js 15, React Three Fiber, and Zustand. It features a sleek UI, a 3D visualization scene, incident playback with a timeline, drag-and-drop incident reordering, and more — designed for managing security camera feeds and incidents efficiently.

---

## 🚀 Features

### ✅ Core Features
- 📺 **Dashboard View**: Overview of scenes, cameras, and incidents.
- 🎥 **Cameras Page**: Manage and view connected camera data.
- 🌐 **Scenes Page**: 3D scene rendered using Blender `.glb` model with React Three Fiber.
- ⚠️ **Incidents Page**: View, manage, and reorder incidents.
- 👤 **Users Page**: Admin view of registered users.
- ⏱️ **Incident Player**: Timeline-synced playback of incidents.
- 🧩 **Global State Management**: Zustand used across timeline/player/scene.

### 🧪 Bonus Features
- 📊 Interactive timeline synced with incidents
- 🔄 Drag-and-drop incident reordering (`@hello-pangea/dnd`)
- 🎮 3D model interactions (hover/select objects in scene)
- 📱 Fully responsive design (desktop + mobile)
- 🚀 Optimized performance with `useMemo` and `@react-three/drei/Preload`

---

## 🧱 Tech Stack

| Technology       | Description                             |
| ---------------- | ---------------------------------------- |
| **Next.js 15**   | App Router, Server Components            |
| **TypeScript**   | Type safety throughout                   |
| **Tailwind CSS** | Utility-first UI styling                 |
| **Zustand**      | Lightweight global state management      |
| **Framer Motion**| UI Animations                            |
| **React Three Fiber** | 3D rendering + GLTF support        |
| **@hello-pangea/dnd** | Drag-and-drop incident list       |
| **Blender + GLB**| Custom 3D scenes rendered in-browser     |

---

## ⚙️ Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/securesight-dashboard.git
cd securesight-dashboard
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
  /dashboard         # Overview of stats
  /cameras           # Camera list and statuses
  /scenes            # 3D GLB-rendered view
  /incidents         # Incident timeline and cards
  /users             # Admin user list
/components          # Reusable components (Navbar, Player, Timeline etc.)
/lib                 # Utility functions (e.g., formatDuration)
/public/favicon      # Favicon assets
📁 Favicon Setup
All favicon files are placed in:

arduino
Copy
Edit
/public/favicon/
And used in layout.tsx as:

ts
Copy
Edit
<link rel="icon" href="/favicon/icons8-bullet-camera-ios-17-filled-32.png" />
🧪 Optional Enhancements
✅ Sync 3D camera nodes with selected incidents

✅ Persist state via localStorage or API

🔜 Realtime updates via WebSocket

🔒 Role-based access control (RBAC)

⚙️ Backend integration for real incidents/cameras

👨‍💻 Author
Vishal Dwivedy (VishXDev)

📄 License
This project is licensed under the MIT License – see the LICENSE file for details.