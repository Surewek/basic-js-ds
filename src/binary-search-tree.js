const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  treeRoot = null;

  root() {
    return this.treeRoot;
  }

  add(data) {
    const node = this.treeRoot;

    if(node === null){
      this.treeRoot = new Node(data);
      return;
    } else {
      const searchTree = function (node) {
        if(data < node.data) {
          if(node.left === null) {
            node.left = new Node(data);
          } else if (node.left !== null) {
            return searchTree(node.left);
          }
        } else if(data > node.data) {
          if(node.right === null) {
            node.right = new Node(data)
          } else if (node.right !== null) {
            return searchTree(node.right);
          }
        } else {
          return null;
        }
      }
      return searchTree(node);
    }
  }

  has(data) {
    return this.find(data) !== null;
  }

  find(data) {
    let node = this.treeRoot;

    if(node === null) {
      return new Node(null);
    } else {
      const findNode = function (node) {

        if (node !== null){
          if (node.data === data){
            return node;
          } else if(data < node.data) {
            if(node.left === null) {
              return null;
            } else if (node.left !== null) {
              return findNode(node.left);
            }
          } else if(data > node.data) {
            if(node.right === null) {
              return null;
            } else if (node.right !== null) {
              return findNode(node.right);
            }
          } else {
            return null;
          }

      } else {
        return null;
      }

      }
      return findNode(node);
    }
  }

  remove(data) {
    const removeNode = function(node, data){
      if (node === null) return null;
      if(data === node.data) {
        if(node.left === null && node.right === null) return null;
        if(node.left === null) return node.right;
        if(node.right === null) return node.left;

        let rawNode = node.right;

        while(rawNode.left !== null) {
          rawNode = rawNode.left;
        }

        node.data = rawNode.data;
        node.right = removeNode(node.right, rawNode.data);

        return node;

      } else if (data < node.data) {
        node.left = removeNode(node.left, data);

        return node;
      } else {
        node.right = removeNode(node.right, data);

        return node;
      }
    }

    this.treeRoot = removeNode(this.treeRoot, data);
  }

  min() {
    const node = this.treeRoot;
    if(node === null) return null;

    const findMin = function(node){
      if(node.left === null) {
        return node;
      } else {
        return findMin(node.left);
      }
    }
    return findMin(node).data;
  }

  max() {
    let node = this.treeRoot;
    if(node === null) return null;

    const findMax = function(node){
      if(node.right === null) {
        return node;
      } else {
        return findMax(node.right);
      }
    }
    return findMax(node).data;
  }
}

module.exports = {
  BinarySearchTree
};