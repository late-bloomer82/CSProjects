// const list = function linkedList() {
//   return {
//     append: function append(value) {
//       node.value = value;
//     },
//     prepend: function prepend(value) {
//       node.value = value;
//     },
//     size: function size() {
//       return list.length;
//     },
//     head: function head() {
//       return list.head;
//     },
//     tail: function tail() {
//       return list.tail;
//     },
//     index: function atIndex(index) {
//       return list[index];
//     },
//     pop: function pop() {},
//     containsValue: function contains(value) {
//       for (let i = 0; i < list.length; i++) {
//         const element = list[i];
//         if (element === value) {
//           return true;
//         } else {
//           return false;
//         }
//       }
//     },
//     find: function find(value) {
//       for (let i = 0; i < list.length; i++) {
//         const element = list[i];
//         if (element === value) {
//           return element.length;
//         } else {
//           return null;
//         }
//       }
//     },
//     toString: function toString() {
//       for (let i = 0; i < list.length; i++) {
//         const element = list[i];
//         const stringElement = element.toString();
//         const stringList = +stringElement + "-->";
//       }
//     },
//   };
// };

// const node = function Node() {
//   return {
//     value: null,
//     nextNode: null,
//   };
// };

const createNode = (value = null) => {
  return {
    value: value,
    nextNode: null,
  };
};
const createLinkedList = () => {
  return {
    head: null,

    append(value) {
      const newNode = createNode(value);
      if (this.head === null) {
        this.head = newNode;
      } else {
        let current = this.head;
        while (current.nextNode !== null) {
          current = current.nextNode;
        }
        current.nextNode = newNode;
      }
    },

    prepend(value) {
      const newNode = createNode(value);
      newNode.nextNode = this.head;
      this.head = newNode;
    },

    size() {
      let count = 0;
      let current = this.head;
      while (current !== null) {
        count++;
        current = current.nextNode;
      }
      return count;
    },

    getHead() {
      return this.head;
    },

    getTail() {
      if (this.head === null) return null;
      let current = this.head;
      while (current.nextNode !== null) {
        current = current.nextNode;
      }
      return current;
    },

    at(index) {
      if (index < 0) return null;
      let current = this.head;
      let currentIndex = 0;
      while (current !== null) {
        if (currentIndex === index) return current;
        current = current.nextNode;
        currentIndex++;
      }
      return null;
    },

    pop() {
      if (this.head === null) return null;
      if (this.head.nextNode === null) {
        const poppedNode = this.head;
        this.head = null;
        return poppedNode;
      }
      let current = this.head;
      while (current.nextNode.nextNode !== null) {
        current = current.nextNode;
      }
      const poppedNode = current.nextNode;
      current.nextNode = null;
      return poppedNode;
    },

    contains(value) {
      let current = this.head;
      while (current !== null) {
        if (current.value === value) return true;
        current = current.nextNode;
      }
      return false;
    },

    find(value) {
      let current = this.head;
      let index = 0;
      while (current !== null) {
        if (current.value === value) return index;
        current = current.nextNode;
        index++;
      }
      return null;
    },

    toString() {
      let result = "";
      let current = this.head;
      while (current !== null) {
        result += `( ${current.value} ) -> `;
        current = current.nextNode;
      }
      return result + "null";
    },
  };
};

// Usage example:
const list = createLinkedList();
list.append(1);
list.append(2);
list.prepend(0);

console.log(list.toString()); // Output: ( 0 ) -> ( 1 ) -> ( 2 ) -> null
console.log(list.size()); // Output: 3
console.log(list.getHead()); // Output: Node { value: 0, nextNode: Node { value: 1, nextNode: [Node] } }
console.log(list.getTail()); // Output: Node { value: 2, nextNode: null }
console.log(list.at(1)); // Output: Node { value: 1, nextNode: Node { value: 2, nextNode: null } }
console.log(list.pop()); // Output: Node { value: 2, nextNode: null }
console.log(list.contains(1)); // Output: true
console.log(list.find(1)); // Output: 1
console.log(list.toString()); // Output: ( 0 ) -> ( 1 ) -> null
