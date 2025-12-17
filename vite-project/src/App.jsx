// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App


// blog-frontend/src/App.jsx

import { useState } from 'react' // Keep this if you want to use the counter example
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// 1. Zaroori Imports: React Router DOM aur naye Blog Components
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Blogpost from './components/Blogpost'; 
import Blogdetail from './components/Blogdetail';

// Yeh aapka pehle wala content hai, ab yeh Home component ban jayega
const HomeContent = ({ count, setCount }) => (
    <>
        <div>
            <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
            <p>
              Edit <code>src/App.jsx</code> and save to test HMR
            </p>
            {/* Nav Link jodne ke liye */}
            <Link to="/blog" className="text-blue-500 underline mt-4 block">
                Go to Blog Section
            </Link>
        </div>
        <p className="read-the-docs">
            Click on the Vite and React logos to learn more
        </p>
    </>
);

function App() {
    // State ko maintain rakha hai
    const [count, setCount] = useState(0); 

    return (
        // 2. BrowserRouter se poori app ko wrap kiya jata hai
        <BrowserRouter>
            {/* Optional: Navigation yahan daal sakte hain */}
            <header className="p-4 bg-gray-900 text-white shadow-lg mb-8">
                <nav className="container mx-auto flex justify-between">
                    <Link to="/" className="text-xl font-bold">My Blog App</Link>
                    <Link to="/blog" className="hover:text-blue-400">View Blogs</Link>
                </nav>
            </header>

            {/* 3. Routes block ke andar saare routes define kiye jate hain */}
            <Routes>
                
                {/* Default/Home Route */}
                <Route 
                    path="/" 
                    element={<HomeContent count={count} setCount={setCount} />} 
                />
                
                {/* 🚀 New Blog List Route 🚀 */}
                <Route path="/blog" element={<Blogpost />} />
                
                {/* 🚀 New Blog Detail Route 🚀 */}
                <Route path="/blog/:slug" element={<Blogdetail />} />
                
                {/* Agar koi galat URL daalta hai */}
                <Route path="*" element={<h2>404 Page Not Found</h2>} />

            </Routes>
        </BrowserRouter>
    )
}

export default App