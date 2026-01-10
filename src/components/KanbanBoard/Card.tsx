"use client";

import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card as CardType } from "./types";

interface CardProps {
  card: CardType;
  onEdit: (cardId: string, newTitle: string) => void;
  onDelete: (cardId: string) => void;
}

export const Card: React.FC<CardProps> = ({ card, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(card.title);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleEdit = () => {
    if (editValue.trim() && editValue !== card.title) {
      onEdit(card.id, editValue.trim());
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(card.id);
    setShowDeleteConfirm(false);
  };

  return (
    <div ref={setNodeRef} className="mb-3 select-none" style={{...style, touchAction: 'none'}} {...attributes} {...listeners}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 hover:shadow-md transition-shadow group">
        {showDeleteConfirm ? (
          <div className="space-y-2">
            <p className="text-sm text-gray-700">Delete this card?</p>
            <div className="flex gap-2">
              <button
                onClick={handleDelete}
                className="flex-1 px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-2 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-start gap-2">
              {/* Drag Handle */}
              <div
                {...attributes}
                {...listeners}
                style={{ touchAction: "none" }}
                className="cursor-move text-gray-400 hover:text-gray-600 mt-1"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <circle cx="4" cy="4" r="1.5" />
                  <circle cx="4" cy="8" r="1.5" />
                  <circle cx="4" cy="12" r="1.5" />
                  <circle cx="8" cy="4" r="1.5" />
                  <circle cx="8" cy="8" r="1.5" />
                  <circle cx="8" cy="12" r="1.5" />
                </svg>
              </div>

              {/* Card Content */}
              <div className="flex-1 min-w-0">
                {isEditing ? (
                  <textarea
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={handleEdit}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleEdit();
                      }
                      if (e.key === "Escape") {
                        setEditValue(card.title);
                        setIsEditing(false);
                      }
                    }}
                    className="w-full px-2 py-1 border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                    autoFocus
                    rows={2}
                  />
                ) : (
                  <p
                    onDoubleClick={() => setIsEditing(true)}
                    className="text-sm text-gray-800 cursor-text wrap-break-word"
                  >
                    {card.title}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                  title="Edit"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M11.013 1.427a1.75 1.75 0 012.474 0l1.086 1.086a1.75 1.75 0 010 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 01-.927-.928l.929-3.25a1.75 1.75 0 01.445-.758l8.61-8.61z" />
                  </svg>
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="p-1 text-red-600 hover:bg-red-100 rounded"
                  title="Delete"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M11 1.75V3h2.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H5V1.75C5 .784 5.784 0 6.75 0h2.5C10.216 0 11 .784 11 1.75zM4.496 6.675l.66 6.6a.25.25 0 00.249.225h5.19a.25.25 0 00.249-.225l.66-6.6a.75.75 0 011.492.149l-.66 6.6A1.748 1.748 0 0110.595 15h-5.19a1.75 1.75 0 01-1.741-1.575l-.66-6.6a.75.75 0 111.492-.15zM6.5 1.75V3h3V1.75a.25.25 0 00-.25-.25h-2.5a.25.25 0 00-.25.25z" />
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
