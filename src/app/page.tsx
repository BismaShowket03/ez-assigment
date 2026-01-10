import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Front-End Developer Test
          </h1>
          <p className="text-xl text-gray-600">React + TypeScript Components</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Tree View Card */}
          <Link href="/tree-view" className="group">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6 group-hover:bg-green-200 transition-colors">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-green-600"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Tree View Component
              </h2>
              <p className="text-gray-600 mb-4">
                A fully functional tree view with expand/collapse, add/remove
                nodes, drag & drop, lazy loading, and inline editing.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  Expand/Collapse
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                  Drag & Drop
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  Lazy Loading
                </span>
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                  CRUD Operations
                </span>
              </div>
              <div className="mt-6 flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                View Component
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="ml-2 transform group-hover:translate-x-2 transition-transform"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Kanban Board Card */}
          <Link href="/kanban" className="group">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 group-hover:bg-blue-200 transition-colors">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-blue-600"
                >
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Kanban Board
              </h2>
              <p className="text-gray-600 mb-4">
                A responsive Kanban board with three columns (Todo, In Progress,
                Done), drag & drop cards, and inline editing capabilities.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  Drag & Drop
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                  Responsive
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  Add/Delete Cards
                </span>
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                  Inline Editing
                </span>
              </div>
              <div className="mt-6 flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                View Component
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="ml-2 transform group-hover:translate-x-2 transition-transform"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-md p-6 inline-block">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Technical Stack
            </h3>
            <div className="flex flex-wrap gap-3 justify-center">
              <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg font-medium">
                React 19
              </span>
              <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg font-medium">
                TypeScript 5
              </span>
              <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg font-medium">
                Next.js 16
              </span>
              <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg font-medium">
                Tailwind CSS 4
              </span>
              <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg font-medium">
                DnD Kit
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
