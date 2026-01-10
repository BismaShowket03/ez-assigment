"use client";

import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { TreeNode as TreeNodeType, TreeViewProps } from "./types";
import { TreeNode } from "./TreeNode";

export const TreeView: React.FC<TreeViewProps> = ({
  data,
  onDataChange,
  onLoadChildren,
}) => {
  const [treeData, setTreeData] = useState<TreeNodeType[]>(data);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const updateTreeData = (newData: TreeNodeType[]) => {
    setTreeData(newData);
    onDataChange?.(newData);
  };

  const findNodeById = (
    nodes: TreeNodeType[],
    id: string
  ): TreeNodeType | null => {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (node.children) {
        const found = findNodeById(node.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const updateNode = (
    nodes: TreeNodeType[],
    id: string,
    updater: (node: TreeNodeType) => TreeNodeType
  ): TreeNodeType[] => {
    return nodes.map((node) => {
      if (node.id === id) {
        return updater(node);
      }
      if (node.children) {
        return {
          ...node,
          children: updateNode(node.children, id, updater),
        };
      }
      return node;
    });
  };

  const deleteNode = (nodes: TreeNodeType[], id: string): TreeNodeType[] => {
    return nodes.filter((node) => {
      if (node.id === id) return false;
      if (node.children) {
        node.children = deleteNode(node.children, id);
      }
      return true;
    });
  };

  const addNode = (
    nodes: TreeNodeType[],
    parentId: string,
    newNode: TreeNodeType
  ): TreeNodeType[] => {
    return nodes.map((node) => {
      if (node.id === parentId) {
        return {
          ...node,
          children: [...(node.children || []), newNode],
          isExpanded: true,
        };
      }
      if (node.children) {
        return {
          ...node,
          children: addNode(node.children, parentId, newNode),
        };
      }
      return node;
    });
  };

  const handleToggle = async (nodeId: string) => {
    const node = findNodeById(treeData, nodeId);
    if (!node) return;

    // If node needs to load children
    if (
      !node.isExpanded &&
      onLoadChildren &&
      node.hasChildren &&
      !node.children?.length
    ) {
      // Set loading state
      const updatedData = updateNode(treeData, nodeId, (n) => ({
        ...n,
        isLoading: true,
        isExpanded: true,
      }));
      updateTreeData(updatedData);

      try {
        const children = await onLoadChildren(nodeId);
        const finalData = updateNode(updatedData, nodeId, (n) => ({
          ...n,
          children,
          isLoading: false,
        }));
        updateTreeData(finalData);
      } catch (error) {
        console.error("Failed to load children:", error);
        const errorData = updateNode(updatedData, nodeId, (n) => ({
          ...n,
          isLoading: false,
          isExpanded: false,
        }));
        updateTreeData(errorData);
      }
    } else {
      // Just toggle expanded state
      const updatedData = updateNode(treeData, nodeId, (node) => ({
        ...node,
        isExpanded: !node.isExpanded,
      }));
      updateTreeData(updatedData);
    }
  };

  const handleAdd = (parentId: string, name: string) => {
    const newNode: TreeNodeType = {
      id: `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name,
      children: [],
      isExpanded: false,
    };
    const updatedData = addNode(treeData, parentId, newNode);
    updateTreeData(updatedData);
  };

  const handleDelete = (nodeId: string) => {
    const updatedData = deleteNode(treeData, nodeId);
    updateTreeData(updatedData);
  };

  const handleEdit = (nodeId: string, newName: string) => {
    const updatedData = updateNode(treeData, nodeId, (node) => ({
      ...node,
      name: newName,
    }));
    updateTreeData(updatedData);
  };

  const getAllNodeIds = (nodes: TreeNodeType[]): string[] => {
    const ids: string[] = [];
    const traverse = (nodes: TreeNodeType[]) => {
      nodes.forEach((node) => {
        ids.push(node.id);
        if (node.children) traverse(node.children);
      });
    };
    traverse(nodes);
    return ids;
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    // Simple reordering at the same level
    const reorderNodes = (nodes: TreeNodeType[]): TreeNodeType[] => {
      const ids = nodes.map((n) => n.id);
      const oldIndex = ids.indexOf(active.id as string);
      const newIndex = ids.indexOf(over.id as string);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newNodes = [...nodes];
        const [removed] = newNodes.splice(oldIndex, 1);
        newNodes.splice(newIndex, 0, removed);
        return newNodes;
      }

      return nodes.map((node) => ({
        ...node,
        children: node.children ? reorderNodes(node.children) : node.children,
      }));
    };

    const updatedData = reorderNodes(treeData);
    updateTreeData(updatedData);
  };

  const handleAddRoot = () => {
    const newNode: TreeNodeType = {
      id: `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: "New Node",
      children: [],
      isExpanded: false,
    };
    updateTreeData([...treeData, newNode]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Tree View</h2>
        <button
          onClick={handleAddRoot}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 2a.75.75 0 01.75.75v4.5h4.5a.75.75 0 010 1.5h-4.5v4.5a.75.75 0 01-1.5 0v-4.5h-4.5a.75.75 0 010-1.5h4.5v-4.5A.75.75 0 018 2z" />
          </svg>
          Add Root Node
        </button>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {treeData.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No nodes yet. Click &quot;Add Root Node&quot; to get started.
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={getAllNodeIds(treeData)}
              strategy={verticalListSortingStrategy}
            >
              <div className="divide-y divide-gray-100">
                {treeData.map((node) => (
                  <TreeNode
                    key={node.id}
                    node={node}
                    level={0}
                    onToggle={handleToggle}
                    onAdd={handleAdd}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    onLoadChildren={onLoadChildren}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  );
};
