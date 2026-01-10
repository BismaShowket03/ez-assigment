export interface TreeNode {
  id: string;
  name: string;
  children?: TreeNode[];
  isExpanded?: boolean;
  isLoading?: boolean;
  hasChildren?: boolean;
}

export interface TreeViewProps {
  data: TreeNode[];
  onDataChange?: (data: TreeNode[]) => void;
  onLoadChildren?: (nodeId: string) => Promise<TreeNode[]>;
}
