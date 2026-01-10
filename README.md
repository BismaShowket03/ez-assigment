# Front-End Developer Test - React + TypeScript Components

This project contains two fully functional, production-ready components built with React, TypeScript, and modern web technologies.

## 🚀 Live Demo

- **Tree View Component**: `/tree-view`
- **Kanban Board**: `/kanban`

## 📋 Components

### 1. Tree View Component

A hierarchical tree structure with comprehensive features:

#### Features

- ✅ **Expand/Collapse**: Toggle parent nodes to show/hide children
- ✅ **Add Nodes**: Create child nodes with inline input
- ✅ **Edit Nodes**: Double-click to edit node names inline
- ✅ **Delete Nodes**: Remove nodes with confirmation dialog (deletes entire subtree)
- ✅ **Drag & Drop**: Reorder nodes within the same level
- ✅ **Lazy Loading**: Asynchronously load children when parent is expanded
- ✅ **Clean UI**: Modern, intuitive interface with hover states

#### Technical Implementation

- Recursive component structure
- State management with React hooks
- DnD Kit for drag-and-drop functionality
- Async data loading simulation
- TypeScript interfaces for type safety

### 2. Kanban Board Component

A responsive task management board with three columns:

#### Features

- ✅ **Three Columns**: Todo, In Progress, Done
- ✅ **Add Cards**: Create new cards in any column
- ✅ **Edit Cards**: Double-click to edit card titles inline
- ✅ **Delete Cards**: Remove cards with confirmation
- ✅ **Drag & Drop**: Move cards between columns and reorder within columns
- ✅ **Responsive Design**: Works seamlessly on desktop and mobile (columns stack vertically on small screens)
- ✅ **Visual Feedback**: Drag overlay and smooth transitions

#### Technical Implementation

- Component decomposition: Board → Column → Card
- DnD Kit for advanced drag-and-drop
- Responsive Tailwind CSS styling
- State management with React hooks
- TypeScript for type safety

## 🛠️ Tech Stack

- **React 19** - Latest React features
- **TypeScript 5** - Type safety and better DX
- **Next.js 16** - React framework with App Router
- **Tailwind CSS 4** - Utility-first CSS framework
- **DnD Kit** - Modern drag-and-drop library
- **ESLint** - Code linting

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🌐 Development

Open [http://localhost:3000](http://localhost:3000) to view the application.

- Home page shows both component cards with feature descriptions
- Navigate to `/tree-view` for the Tree View component
- Navigate to `/kanban` for the Kanban Board component

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home page
│   ├── tree-view/
│   │   └── page.tsx          # Tree View demo page
│   ├── kanban/
│   │   └── page.tsx          # Kanban Board demo page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── TreeView/
│   │   ├── TreeView.tsx      # Main tree component
│   │   ├── TreeNode.tsx      # Individual node component
│   │   ├── types.ts          # TypeScript types
│   │   └── index.ts          # Exports
│   └── KanbanBoard/
│       ├── KanbanBoard.tsx   # Main board component
│       ├── Column.tsx        # Column component
│       ├── Card.tsx          # Card component
│       ├── types.ts          # TypeScript types
│       └── index.ts          # Exports
```

## 🎨 Design Decisions

### Tree View

- **Drag Handle**: Visible grip icon for intuitive dragging
- **Lazy Loading**: Simulates API calls with 1-second delay
- **Inline Editing**: Double-click or edit icon to modify names
- **Confirmation Dialogs**: Prevent accidental deletions
- **Visual Hierarchy**: Indentation and expand/collapse icons

### Kanban Board

- **Color Coding**: Each column has a distinct color (blue, orange, green)
- **Card Count**: Shows number of cards in each column
- **Smooth Transitions**: Drag overlay and hover effects
- **Mobile First**: Responsive design that stacks columns on small screens
- **Accessibility**: Keyboard navigation support via DnD Kit

## 🔑 Key Features

### Component Reusability

Both components are designed to be reusable:

```typescript
// Tree View
<TreeView
  data={treeData}
  onDataChange={handleChange}
  onLoadChildren={loadChildren}
/>

// Kanban Board
<KanbanBoard
  initialData={columns}
  onDataChange={handleChange}
/>
```

### Type Safety

Full TypeScript support with well-defined interfaces:

```typescript
interface TreeNode {
  id: string;
  name: string;
  children?: TreeNode[];
  isExpanded?: boolean;
  isLoading?: boolean;
  hasChildren?: boolean;
}

interface Card {
  id: string;
  title: string;
  columnId: string;
}
```

### Clean State Management

- Local state with React hooks
- Immutable state updates
- Optional callbacks for parent components

## 🧪 Testing the Components

### Tree View

1. Click "Add Root Node" to create a new top-level node
2. Hover over any node to see action buttons
3. Click the expand icon to show/hide children
4. Double-click a node name to edit it
5. Click the + icon to add a child node
6. Drag the grip icon to reorder nodes
7. Click the delete icon to remove a node (with confirmation)
8. Try expanding nodes with lazy loading (shows loading spinner)

### Kanban Board

1. Click "Add Card" in any column
2. Enter a card title and press Enter or click "Add Card"
3. Double-click a card to edit its title
4. Drag cards between columns
5. Drag cards to reorder within a column
6. Click the delete icon on a card (with confirmation)
7. Resize your browser to see responsive behavior

## 🚀 Deployment

This project can be deployed to:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- Any platform supporting Node.js

```bash
# Build the project
npm run build

# The output will be in the .next folder
```

## 📝 Notes

- **No External UI Libraries**: Built from scratch with Tailwind CSS
- **Minimal Dependencies**: Only essential libraries (DnD Kit for drag-and-drop)
- **Clean Code**: Well-structured, commented, and maintainable
- **Performance**: Optimized re-renders and efficient state updates
- **Accessibility**: Keyboard navigation and semantic HTML

## 👨‍💻 Development Approach

1. **Component Decomposition**: Breaking down complex UIs into smaller, reusable components
2. **Type Safety**: Leveraging TypeScript for better developer experience
3. **Modern React**: Using hooks and functional components
4. **Clean Architecture**: Separating concerns and maintaining single responsibility
5. **User Experience**: Intuitive interactions with visual feedback

## 🎯 Requirements Met

### Tree View ✅

- [x] Expand/Collapse nodes
- [x] Add new nodes
- [x] Remove nodes with confirmation
- [x] Drag & drop support
- [x] Lazy loading with async behavior
- [x] Edit node names inline
- [x] React + TypeScript
- [x] Clean state management
- [x] Minimal external libraries

### Kanban Board ✅

- [x] Three columns (Todo, In Progress, Done)
- [x] Add/Delete cards
- [x] Move cards between columns
- [x] Editable card titles
- [x] Responsive layout
- [x] React + TypeScript
- [x] Drag-and-drop (DnD Kit)
- [x] Proper component structure

---

Built with ❤️ using React, TypeScript, and Next.js
