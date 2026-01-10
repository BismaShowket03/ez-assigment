"use client";

import React, { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import {
  Column as ColumnType,
  Card as CardType,
  KanbanBoardProps,
} from "./types";
import { Column } from "./Column";

const defaultColumns: ColumnType[] = [
  {
    id: "todo",
    title: "Todo",
    cards: [
      { id: "card-1", title: "Create initial project plan", columnId: "todo" },
      { id: "card-2", title: "Design landing page", columnId: "todo" },
      { id: "card-3", title: "Review codebase structure", columnId: "todo" },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    cards: [
      {
        id: "card-4",
        title: "Implement authentication",
        columnId: "in-progress",
      },
      {
        id: "card-5",
        title: "Set up database schema",
        columnId: "in-progress",
      },
      { id: "card-6", title: "Fix navbar bugs", columnId: "in-progress" },
    ],
  },
  {
    id: "done",
    title: "Done",
    cards: [
      { id: "card-7", title: "Organize project repository", columnId: "done" },
      { id: "card-8", title: "Write API documentation", columnId: "done" },
    ],
  },
];

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  initialData = defaultColumns,
  onDataChange,
}) => {
  const [columns, setColumns] = useState<ColumnType[]>(initialData);
  const [activeCard, setActiveCard] = useState<CardType | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        // Use a short delay to avoid starting drag while scrolling
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const updateColumns = (newColumns: ColumnType[]) => {
    setColumns(newColumns);
    onDataChange?.(newColumns);
  };

  const findCardColumn = (cardId: string): string | null => {
    for (const column of columns) {
      if (column.cards.some((card) => card.id === cardId)) {
        return column.id;
      }
    }
    return null;
  };

  const handleAddCard = (columnId: string, title: string) => {
    const newCard: CardType = {
      id: `card-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title,
      columnId,
    };

    const newColumns = columns.map((column) => {
      if (column.id === columnId) {
        return {
          ...column,
          cards: [...column.cards, newCard],
        };
      }
      return column;
    });

    updateColumns(newColumns);
  };

  const handleEditCard = (cardId: string, newTitle: string) => {
    const newColumns = columns.map((column) => ({
      ...column,
      cards: column.cards.map((card) =>
        card.id === cardId ? { ...card, title: newTitle } : card
      ),
    }));

    updateColumns(newColumns);
  };

  const handleDeleteCard = (cardId: string) => {
    const newColumns = columns.map((column) => ({
      ...column,
      cards: column.cards.filter((card) => card.id !== cardId),
    }));

    updateColumns(newColumns);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const activeColumnId = findCardColumn(active.id as string);

    if (activeColumnId) {
      const column = columns.find((col) => col.id === activeColumnId);
      const card = column?.cards.find((card) => card.id === active.id);
      if (card) {
        setActiveCard(card);
      }
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeColumnId = findCardColumn(activeId);
    const overColumnId = findCardColumn(overId) || overId;

    if (!activeColumnId || !overColumnId) return;

    if (activeColumnId === overColumnId) return;

    const newColumns = columns.map((column) => {
      // Remove card from active column
      if (column.id === activeColumnId) {
        return {
          ...column,
          cards: column.cards.filter((card) => card.id !== activeId),
        };
      }

      // Add card to over column
      if (column.id === overColumnId) {
        const activeColumn = columns.find((col) => col.id === activeColumnId);
        const activeCard = activeColumn?.cards.find(
          (card) => card.id === activeId
        );

        if (!activeCard) return column;

        const overCardIndex = column.cards.findIndex(
          (card) => card.id === overId
        );
        const newCard = { ...activeCard, columnId: overColumnId };

        if (overCardIndex === -1) {
          // Drop at the end of the column
          return {
            ...column,
            cards: [...column.cards, newCard],
          };
        } else {
          // Drop at specific position
          const newCards = [...column.cards];
          newCards.splice(overCardIndex, 0, newCard);
          return {
            ...column,
            cards: newCards,
          };
        }
      }

      return column;
    });

    updateColumns(newColumns);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveCard(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeColumnId = findCardColumn(activeId);
    const overColumnId = findCardColumn(overId);

    if (!activeColumnId || !overColumnId) return;

    // Reorder within the same column
    if (activeColumnId === overColumnId && activeId !== overId) {
      const newColumns = columns.map((column) => {
        if (column.id === activeColumnId) {
          const oldIndex = column.cards.findIndex(
            (card) => card.id === activeId
          );
          const newIndex = column.cards.findIndex((card) => card.id === overId);

          return {
            ...column,
            cards: arrayMove(column.cards, oldIndex, newIndex),
          };
        }
        return column;
      });

      updateColumns(newColumns);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Kanban Board</h2>
        <p className="text-gray-600 text-sm mt-1">
          Drag and drop cards between columns to manage your workflow
        </p>
      </div>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div
          className="flex flex-row gap-4 overflow-x-auto pb-4"
          style={{ minHeight: '70vh' }}
        >
          {columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              onAddCard={handleAddCard}
              onEditCard={handleEditCard}
              onDeleteCard={handleDeleteCard}
            />
          ))}
        </div>

        <DragOverlay>
          {activeCard ? (
            <div className="bg-white rounded-lg shadow-lg border-2 border-blue-500 p-3 w-80 rotate-3 opacity-90">
              <p className="text-sm text-gray-800">{activeCard.title}</p>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};
