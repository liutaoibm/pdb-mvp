import React from 'react';
import '../app/globals.css';

function Layout({ children }) {
  return (
    <html>
      <body>
        <div className="flex h-screen">
          <aside className="w-64 bg-gray-800 text-white">
            <nav className="flex flex-col p-4">
              <a href="#" className="py-2">Dashboard</a>
              <a href="#" className="py-2">Define Product</a>
              <a href="#" className="py-2">Product Repository</a>
            </nav>
          </aside>
          <main className="flex-1 p-4">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

export default Layout;
