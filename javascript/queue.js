class QueueNode {
    constructor(data) {
        this.data = data;
        this.next = null;              
    }
}

class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    /**
     * Empty the queue.
     */
    clear() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    /**
     * Add a node to the end of the queue.
     * @returns {number} new length of the queue.
     */
    enqueue(data) {
        let newNode = new QueueNode(data);
        
        if (!this.head) {
            this.head = newNode;
            this.tail = this.head;
        } 
        else {
           this.tail.next = newNode
           this.tail = newNode 
        }

        return ++this.length;
    }

    /**
     * Remove the node at the beginning of the queue.
     * @returns first node's data or undefined if the queue is empty.
     */
    dequeue() { 
        if (!this.head) return undefined;

        let firstNode = this.head;
        this.head = this.head.next;
        this.length--;

        if (this.length === 0) {
            this.tail = null;
        }

        return firstNode.data;
    }

    /**
     * See what the first item in the queue is. Does not change the length of the queue.
     * @returns first item in the queue or undefined if the queue is empty.
     */
    peek() {
        return this.head?.data;
    }
}

export { QueueNode, Queue }