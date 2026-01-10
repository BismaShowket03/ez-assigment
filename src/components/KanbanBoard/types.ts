export interface Card {
  id: string;
  title: string;
  columnId: string;
}

export interface Column {
  id: string;
  title: string;
  cards: Card[];
}

export interface KanbanBoardProps {
  initialData?: Column[];
  onDataChange?: (data: Column[]) => void;
}
