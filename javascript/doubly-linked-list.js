class DoublyLLNode {
    constructor(data) {
        this.data = data;
        this.previous = null; 
        this.next = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    /**
     * Empty the linked list.
     */
    clear() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    /**
     * Add a node to the end of the linked list.
     * @returns {number} new length of the linked list.
     */
    append(data) {
        let newNode = new DoublyLLNode(data);

        if (!this.head) {
            this.head = newNode;
            this.tail = this.head;
        } 
        else {
           this.tail.next = newNode;
           newNode.previous = this.tail;
           this.tail = newNode;
        }

        return ++this.length;
    }

    /**
     * Add a node to the beginning of the linked list.
     * @returns {number} new length of the linked list.
     */
    prepend(data) {
        let newNode = new DoublyLLNode(data);

        if (!this.head) {
            this.head = newNode;
            this.tail = this.head;
        } 
        else {
            newNode.next = this.head;
            this.head.previous = newNode;
            this.head = newNode;
        }

        return ++this.length;
    }

    /**
     * Remove the last node.
     * @returns last node or undefined if the list is empty.
     */
    pop() {
        if (!this.head) return undefined;

        let current = this.head;

        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        }
        else {
            let newTail = current;

            while (current.next) {
                newTail = current;
                current = current.next;
            }

            this.tail = newTail;
            this.tail.next = null;
        }
        
        this.length--;
        return current;
    }

    /**
     * Delete the first node.
     * @returns first node or undefined if the list is empty.
     */
    shift() { 
        if (!this.head) return undefined;

        let firstNode = this.head;
        this.head = this.head.next;
        this.head.previous = null;
        this.length--;

        if (this.length === 0) {
            this.tail = null;
        }

        return firstNode;
    }

    /**
     * Retrieve a node from the given index. Does not change the length of the list.
     * @param {number} index - the node's position in the linked list.
     * @returns node at the given index or null.
     */
    get(index) {
        if (index < 0 || index >= this.length) return null;

        let counter = 0;
        let current = this.head;

        while (counter !== index) {
            current = current.next;
            counter++;
        }

        return current;
    }

    /**
     * Set a node's value at the given index.
     * @param {number} index - the node's position in the linked list.
     * @returns {boolean} boolean indicating if the operation was successful.
     */
    set(index, data) {
        let foundNode = this.get(index);

        if (foundNode) {
            foundNode.data = data;
            return true;
        }

        return false;
    }

    /**
     * Insert a node into the linked list at a specified index.
     * @param {number} index - position at which to insert the node.
     * @returns {(number|boolean)} new length of the linked list or false if the operation failed.
     */
    insert(index, data) {
        if (index < 0 || index > this.length) return false;
        if (index === this.length) return this.append(data);       
        if (index === 0) return this.prepend(data);

        let newNode = new DoublyLLNode(data);
        let prevNode = this.get(index - 1);
        let nextNode = prevNode.next;

        newNode.next = nextNode;
        newNode.previous = prevNode;
        nextNode.previous = newNode;
        prevNode.next = newNode;

        return ++this.length;
    }

    /**
     * Remove a node at the specified index.
     * @param {number} index - position at which to remove a node.
     * @returns node or undefined.
     */
    remove(index) {
        if (index < 0 || index >= this.length) return undefined;
        if (index === 0) return this.shift();
        if (index === this.length - 1) return this.pop();

        let prevNode = this.get(index - 1);
        let removedNode = prevNode.next;
        let nextNode = removedNode.next;
        prevNode.next = nextNode;
        nextNode.previous = prevNode;
        this.length--;
        return removedNode;
    }

    /**
     * Reverse the order of the linked list.
     */
    reverse() {
        if (this.length <= 1) return;

        let currNode = this.head;

        for (let i = 0; i < this.length; i++) {
            [currNode.next, currNode.prev] = [currNode.prev, currNode.next]; // swap previous and next pointers
        }

        [this.head, this.tail] = [this.tail, this.head]; // swap head and tail pointers
    }
}

export { DoublyLLNode, DoublyLinkedList }