// class Node {
//   constructor(data, left, right) {
//     this.data = data;
//     this.left = left;
//     this.right = right;
//   }
// }
// class tree {
//   constructor(arr, root) {
//     this.array = arr;
//     this.root = root;
//   }

//   buildtree(array, start, end) {
//     array.sort((a, b) => a - b);

//     const uniqueSet = new Set(array);

//     const trimmedArr = [...uniqueSet];

//     /* Base Case */
//     if (start > end) {
//       return null;
//     }
//     /* Get the middle element and make it root */
//     let mid = Math.floor((start + end) / 2);
//     let node = new Node(trimmedArr[mid]);
//     /* Recursively construct the left subtree and make it
//          left child of root */
//     node.left = buildtree(trimmedArr, start, mid - 1);
//     /* Recursively construct the right subtree and make it
//          right child of root */
//     node.right = buildtree(trimmedArr, mid + 1, end);
//     return node;
//   }

//   insert(value) {
//     function inOrderTraversal(value) {
//       if (value !== null) {
//         inOrderTraversal(value.left);
//         console.log(node.data);
//         inOrderTraversal(node.right);
//       }
//     }
//   }

//   delete(value) {}

//   find(value) {
//     if(value !== null) {
//       find(value.left);

//       find(value.right);
//     return value.data;
//     }
//   }
// }

class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(arr) {
    this.root = null;
    if (arr) {
      this.root = this.buildTree(arr);
    }
  }

  buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) {
      return null;
    }
    const mid = Math.floor((start + end) / 2);
    const node = new Node(array[mid]);
    node.left = this.buildTree(array, start, mid - 1);
    node.right = this.buildTree(array, mid + 1, end);
    return node;
  }

  insert(value) {
    const insertNode = (node, value) => {
      if (node === null) {
        return new Node(value);
      }
      if (value < node.data) {
        node.left = insertNode(node.left, value);
      } else if (value > node.data) {
        node.right = insertNode(node.right, value);
      }
      return node;
    };
    this.root = insertNode(this.root, value);
  }

  deleteItem(value) {
    const deleteNode = (node, value) => {
      if (node === null) {
        return null;
      }
      if (value === node.data) {
        if (node.left === null && node.right === null) {
          return null;
        }
        if (node.left === null) {
          return node.right;
        }
        if (node.right === null) {
          return node.left;
        }
        let tempNode = node.right;
        while (tempNode.left !== null) {
          tempNode = tempNode.left;
        }
        node.data = tempNode.data;
        node.right = deleteNode(node.right, tempNode.data);
        return node;
      } else if (value < node.data) {
        node.left = deleteNode(node.left, value);
        return node;
      } else {
        node.right = deleteNode(node.right, value);
        return node;
      }
    };
    this.root = deleteNode(this.root, value);
  }

  find(value) {
    const findNode = (node, value) => {
      if (node === null || node.data === value) {
        return node;
      }
      if (value < node.data) {
        return findNode(node.left, value);
      }
      return findNode(node.right, value);
    };
    return findNode(this.root, value);
  }

  levelOrder(callback = null) {
    if (!this.root) return [];

    const result = [];
    const queue = [this.root];

    while (queue.length > 0) {
      const node = queue.shift();
      result.push(node.data);
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
      if (callback) {
        callback(node);
      }
    }

    return result;
  }

  inOrder(callback = null, node = this.root) {
    const result = [];
    const traverse = (node) => {
      if (node !== null) {
        traverse(node.left);
        result.push(node.data);
        if (callback) {
          callback(node);
        }
        traverse(node.right);
      }
    };
    traverse(node);
    return result;
  }

  preOrder(callback = null, node = this.root) {
    const result = [];
    const traverse = (node) => {
      if (node !== null) {
        result.push(node.data);
        if (callback) {
          callback(node);
        }
        traverse(node.left);
        traverse(node.right);
      }
    };
    traverse(node);
    return result;
  }

  postOrder(callback = null, node = this.root) {
    const result = [];
    const traverse = (node) => {
      if (node !== null) {
        traverse(node.left);
        traverse(node.right);
        result.push(node.data);
        if (callback) {
          callback(node);
        }
      }
    };
    traverse(node);
    return result;
  }

  height(node = this.root) {
    if (node === null) return -1;
    return Math.max(this.height(node.left), this.height(node.right)) + 1;
  }

  depth(node) {
    if (node === null) return 0;
    return this.depth(node.parent) + 1;
  }

  isBalanced(node = this.root) {
    if (node === null) return true;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return (
      Math.abs(leftHeight - rightHeight) <= 1 &&
      this.isBalanced(node.left) &&
      this.isBalanced(node.right)
    );
  }

  rebalance() {
    const nodes = [];
    this.inOrder((node) => nodes.push(node));

    return this.buildTree(nodes.map((node) => node.data));
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

// Example usage:
const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log("Initial tree:");
prettyPrint(tree.root);

console.log("Inserting");
