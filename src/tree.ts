export class TreeNode {
    name: string;
    parent: TreeNode | null = null;
    children: TreeNode[] = [];
  
    constructor(name: string) {
      this.name = name;
    }
}

function buildTree(jsonData: any): TreeNode | null {
    const nodesMap: Map<number, TreeNode> = new Map();
  
    jsonData.nodes.forEach((nodeData: any) => {
      const node = new TreeNode(nodeData.name);
      nodesMap.set(nodeData.id, node);
    });
  
    jsonData.nodes.forEach((nodeData: any) => {
      if (nodeData.parent !== null) {
        const parentNode = nodesMap.get(nodeData.parent);
        if (parentNode) {
          parentNode.children.push(nodesMap.get(nodeData.id)!);
        }
      }
      if (nodeData.children.length !== 0) {
        const parentNode = nodesMap.get(nodeData.id);
        nodeData.children.forEach((childId: number) => {
          const childNode = nodesMap.get(childId);
          if (childNode && parentNode) {
            childNode.parent = parentNode
          }
        })
        
      }
    });
  
    let rootNode: TreeNode | null = null;
    nodesMap.forEach((node) => {
      if (node.parent === null) {
        rootNode = node;
      }
    });
  
    return rootNode;
  }

export default buildTree;
