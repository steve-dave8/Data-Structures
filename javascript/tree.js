class TreeNode {
    constructor(data) {
        this.data = data;
        this.parent = null;
        this.children = [];
    }
}

class Tree {
    constructor(data) {
        this.root = new TreeNode(data);
    }

    /**
     * Find the node that has the given data or null. Uses a depth-first search.
     */
    find(data, node = this.root) {
        // if the current node matches the data, return it
        if (node.data == data) return node;

        // recurse on each child node
        for (let child of node.children) {
            // if the data is found in any child node it will be returned here
            if (this.find(data, child)) return child;
        }   

        // otherwise, the data was not found
        return null;
    }

    /**
     * Create a new node with the given data and add it to the specified parent node.
     * @returns {boolean} boolean indicating if the operation was successful.
     */
    add(data, parentData) {
        let node = new TreeNode(data);
        let parent = this.find(parentData);
    
        if (parent) {
            parent.children.push(node);
            node.parent = parent;
            return true;
        }
    
        return false;
    }

    /**
     * Removes the node with the specified data from the tree
     * @returns {boolean} boolean indicating if the operation was successful.
     */
    remove(data) {
        let node = this.find(data)
    
        if (node) {
            if (!node.parent) {
                console.log("Error: unable to remove root tree node.");
                return false;
            }
            let parent = node.parent;
            let index = parent.children.indexOf(node);
            parent.children.splice(index, 1);
            return true;
        }
    
        return false;
    }

    forEachDepthFirst(callback, node = this.root) {
        // recurse on each child node
        for (let child of node.children) {
            this.forEachDepthFirst(callback, child);
        }   

        callback(node);
    }

    forEachBreadthFirst(callback) {
        let queue = [];
        queue.push(this.root); // start with the root node
    
        while (queue.length > 0) {
            let node = queue.shift(); // take the next node from the queue
            callback(node);
            // and enqueue its children
            for (let child of node.children) {
                queue.push(child);
            }
        }
    }
    
}

