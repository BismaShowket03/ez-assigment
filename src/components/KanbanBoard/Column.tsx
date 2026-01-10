"use client";

import React, { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Column as ColumnType } from "./types";
import { Card } from "./Card";

interface ColumnProps {
  column: ColumnType;
  onAddCard: (columnId: string, title: string) => void;
  onEditCard: (cardId: string, newTitle: string) => void;
  onDeleteCard: (cardId: string) => void;
}

export const Column: React.FC<ColumnProps> = ({
  column,
  onAddCard,
  onEditCard,
  onDeleteCard,
}) => {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");

  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  const handleAddCard = () => {
    if (newCardTitle.trim()) {
      onAddCard(column.id, newCardTitle.trim());
      setNewCardTitle("");
      setIsAddingCard(false);
    }
  };

  const getColumnColor = (columnId: string) => {
    switch (columnId) {
      case "todo":
        return "bg-blue-500";
      case "in-progress":
        return "bg-orange-500";
      case "done":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="flex flex-col bg-gray-50 rounded-lg p-2 min-h-[320px] w-[90vw] max-w-xs md:w-80 md:max-w-xs shrink-0">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${getColumnColor(column.id)}`}
          />
          <h3 className="font-semibold text-gray-800">{column.title}</h3>
          <span className="text-sm text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
            {column.cards.length}
          </span>
        </div>
      </div>

      {/* Cards Container */}
      <div ref={setNodeRef} className="flex-1 overflow-y-auto">
        <SortableContext
          items={column.cards.map((card) => card.id)}
          strategy={verticalListSortingStrategy}
        >
          {column.cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              onEdit={onEditCard}
              onDelete={onDeleteCard}
            />
          ))}
        </SortableContext>
      </div>

      {/* Add Card Section */}
      <div className="mt-3">
        {isAddingCard ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
            <textarea
              value={newCardTitle}
              onChange={(e) => setNewCardTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleAddCard();
                }
                if (e.key === "Escape") {
                  setNewCardTitle("");
                  setIsAddingCard(false);
                }
              }}
              placeholder="Enter card title..."
              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
              autoFocus
              rows={2}
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleAddCard}
                className="flex-1 px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
              >
                Add Card
              </button>
              <button
                onClick={() => {
                  setNewCardTitle("");
                  setIsAddingCard(false);
                }}
                className="flex-1 px-3 py-1.5 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsAddingCard(true)}
            className="w-full px-3 py-2 text-left text-gray-600 hover:bg-gray-200 rounded flex items-center gap-2 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 2a.75.75 0 01.75.75v4.5h4.5a.75.75 0 010 1.5h-4.5v4.5a.75.75 0 01-1.5 0v-4.5h-4.5a.75.75 0 010-1.5h4.5v-4.5A.75.75 0 018 2z" />
            </svg>
            <span className="text-sm">Add Card</span>
          </button>
        )}
      </div>
    </div>
  );
};
