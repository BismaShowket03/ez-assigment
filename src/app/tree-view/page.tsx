"use client";

import { useState } from "react";
import Link from "next/link";
import { TreeView, TreeNode } from "@/components/TreeView";

// Mock data with lazy loading support
const initialData: TreeNode[] = [
  {
    id: "root-1",
    name: "Project Root",
    isExpanded: true,
    children: [
      {
        id: "node-1-1",
        name: "src",
        isExpanded: false,
        children: [
          { id: "node-1-1-1", name: "components", hasChildren: true },
          { id: "node-1-1-2", name: "utils", hasChildren: true },
          { id: "node-1-1-3", name: "styles", children: [] },
        ],
      },
      {
        id: "node-1-2",
        name: "public",
        children: [
          { id: "node-1-2-1", name: "images", children: [] },
          { id: "node-1-2-2", name: "fonts", children: [] },
        ],
      },
      { id: "node-1-3", name: "package.json", children: [] },
    ],
  },
  {
    id: "root-2",
    name: "Documentation",
    hasChildren: true,
  },
];

// Simulate async data loading
const loadChildren = async (nodeId: string): Promise<TreeNode[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock data based on node
  const mockData: Record<string, TreeNode[]> = {
    "node-1-1-1": [
      { id: `${nodeId}-1`, name: "Button.tsx", children: [] },
      { id: `${nodeId}-2`, name: "Input.tsx", children: [] },
      { id: `${nodeId}-3`, name: "Modal.tsx", children: [] },
    ],
    "node-1-1-2": [
      { id: `${nodeId}-1`, name: "helpers.ts", children: [] },
      { id: `${nodeId}-2`, name: "validators.ts", children: [] },
    ],
    "root-2": [
      { id: `${nodeId}-1`, name: "README.md", children: [] },
      { id: `${nodeId}-2`, name: "API.md", children: [] },
      { id: `${nodeId}-3`, name: "CONTRIBUTING.md", children: [] },
    ],
  };

  return mockData[nodeId] || [];
};

export default function TreeViewPage() {
  const [data, setData] = useState<TreeNode[]>(initialData);

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-emerald-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="mr-2"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Tree View Component
          </h1>
          <p className="text-gray-600">
            A hierarchical tree structure with full CRUD operations, drag &
            drop, and lazy loading
          </p>
        </div>

        {/* Features List */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Features</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-green-600"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Expand/Collapse</h3>
                <p className="text-sm text-gray-600">
                  Toggle parent nodes to show or hide children
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-green-600"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Add Nodes</h3>
                <p className="text-sm text-gray-600">
                  Click the + icon to add child nodes
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-green-600"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Edit Nodes</h3>
                <p className="text-sm text-gray-600">
                  Double-click any node name to edit inline
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-green-600"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Delete Nodes</h3>
                <p className="text-sm text-gray-600">
                  Remove nodes with confirmation dialog
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-green-600"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Drag & Drop</h3>
                <p className="text-sm text-gray-600">
                  Reorder nodes by dragging the handle
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-green-600"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Lazy Loading</h3>
                <p className="text-sm text-gray-600">
                  Children load asynchronously when expanded
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tree View Component */}
        <TreeView
          data={data}
          onDataChange={setData}
          onLoadChildren={loadChildren}
        />
      </div>
    </div>
  );
}
