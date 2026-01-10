"use client";

import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TreeNode as TreeNodeType } from "./types";

interface TreeNodeProps {
  node: TreeNodeType;
  level: number;
  onToggle: (nodeId: string) => void;
  onAdd: (parentId: string, name: string) => void;
  onDelete: (nodeId: string) => void;
  onEdit: (nodeId: string, newName: string) => void;
  onLoadChildren?: (nodeId: string) => Promise<TreeNodeType[]>;
}

export const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  level,
  onToggle,
  onAdd,
  onDelete,
  onEdit,
  onLoadChildren,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(node.name);
  const [isAddingChild, setIsAddingChild] = useState(false);
  const [newChildName, setNewChildName] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: node.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleToggle = async () => {
    if (
      !node.isExpanded &&
      onLoadChildren &&
      node.hasChildren &&
      !node.children?.length
    ) {
      onToggle(node.id);
    } else {
      onToggle(node.id);
    }
  };

  const handleEdit = () => {
    if (editValue.trim() && editValue !== node.name) {
      onEdit(node.id, editValue.trim());
    }
    setIsEditing(false);
  };

  const handleAddChild = () => {
    if (newChildName.trim()) {
      onAdd(node.id, newChildName.trim());
      setNewChildName("");
      setIsAddingChild(false);
    }
  };

  const handleDelete = () => {
    onDelete(node.id);
    setShowDeleteConfirm(false);
  };

  const hasChildren = node.children && node.children.length > 0;
  const canExpand = hasChildren || node.hasChildren;

  return (
    <div ref={setNodeRef} style={style}
      {...attributes}
      {...listeners}
    >
      <div
        className="flex items-center gap-2 py-2 px-3 hover:bg-gray-100 rounded group"
        style={{ paddingLeft: `${level * 24 + 12}px`, touchAction: 'none' }}
      >
        {/* Drag Handle - now just visual */}
        <div
          className="cursor-move text-gray-400 hover:text-gray-600"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <circle cx="4" cy="4" r="1.5" />
            <circle cx="4" cy="8" r="1.5" />
            <circle cx="4" cy="12" r="1.5" />
            <circle cx="8" cy="4" r="1.5" />
            <circle cx="8" cy="8" r="1.5" />
            <circle cx="8" cy="12" r="1.5" />
          </svg>
        </div>

        {/* Expand/Collapse Button */}
        {canExpand ? (
          <button
            onClick={handleToggle}
            className="w-5 h-5 flex items-center justify-center text-gray-600 hover:bg-gray-200 rounded"
          >
            {node.isLoading ? (
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : node.isExpanded ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M4 6l4 4 4-4z" />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M6 4l4 4-4 4z" />
              </svg>
            )}
          </button>
        ) : (
          <div className="w-5 h-5" />
        )}

        {/* Node Name */}
        {isEditing ? (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleEdit();
              if (e.key === "Escape") {
                setEditValue(node.name);
                setIsEditing(false);
              }
            }}
            className="flex-1 px-2 py-1 border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
        ) : (
          <span
            onDoubleClick={() => setIsEditing(true)}
            className="flex-1 cursor-text select-none"
          >
            {node.name}
          </span>
        )}

        {/* Action Buttons */}
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setIsEditing(true)}
            className="p-1 text-gray-600 hover:bg-gray-200 rounded"
            title="Edit"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M11.013 1.427a1.75 1.75 0 012.474 0l1.086 1.086a1.75 1.75 0 010 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 01-.927-.928l.929-3.25a1.75 1.75 0 01.445-.758l8.61-8.61z" />
            </svg>
          </button>
          <button
            onClick={() => setIsAddingChild(true)}
            className="p-1 text-green-600 hover:bg-green-100 rounded"
            title="Add Child"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 2a.75.75 0 01.75.75v4.5h4.5a.75.75 0 010 1.5h-4.5v4.5a.75.75 0 01-1.5 0v-4.5h-4.5a.75.75 0 010-1.5h4.5v-4.5A.75.75 0 018 2z" />
            </svg>
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="p-1 text-red-600 hover:bg-red-100 rounded"
            title="Delete"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M11 1.75V3h2.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H5V1.75C5 .784 5.784 0 6.75 0h2.5C10.216 0 11 .784 11 1.75zM4.496 6.675l.66 6.6a.25.25 0 00.249.225h5.19a.25.25 0 00.249-.225l.66-6.6a.75.75 0 011.492.149l-.66 6.6A1.748 1.748 0 0110.595 15h-5.19a1.75 1.75 0 01-1.741-1.575l-.66-6.6a.75.75 0 111.492-.15zM6.5 1.75V3h3V1.75a.25.25 0 00-.25-.25h-2.5a.25.25 0 00-.25.25z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div
          className="ml-12 mb-2 p-3 bg-red-50 border border-red-200 rounded"
          style={{ marginLeft: `${level * 24 + 48}px` }}
        >
          <p className="text-sm text-red-800 mb-2">
            Delete &quot;{node.name}&quot; and all its children?
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleDelete}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
            >
              Delete
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Add Child Input */}
      {isAddingChild && (
        <div
          className="flex gap-2 py-2 px-3"
          style={{ paddingLeft: `${(level + 1) * 24 + 12}px` }}
        >
          <div className="w-5 h-5" />
          <input
            type="text"
            value={newChildName}
            onChange={(e) => setNewChildName(e.target.value)}
            onBlur={() => {
              if (!newChildName.trim()) setIsAddingChild(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddChild();
              if (e.key === "Escape") {
                setNewChildName("");
                setIsAddingChild(false);
              }
            }}
            placeholder="Enter node name..."
            className="flex-1 px-2 py-1 border border-green-500 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            autoFocus
          />
          <button
            onClick={handleAddChild}
            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
          >
            Add
          </button>
          <button
            onClick={() => {
              setNewChildName("");
              setIsAddingChild(false);
            }}
            className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-sm"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Children */}
      {node.isExpanded && hasChildren && (
        <div>
          {node.children!.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              onToggle={onToggle}
              onAdd={onAdd}
              onDelete={onDelete}
              onEdit={onEdit}
              onLoadChildren={onLoadChildren}
            />
          ))}
        </div>
      )}
    </div>
  );
};
