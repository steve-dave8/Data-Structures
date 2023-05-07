import { Queue } from "./queue";

const noPriority = "none";

const priorityOrders = Object.freeze(["highest first", "lowest first"]);

const validPriority = (level) => {
    return typeof level === "number" && Number.isInteger(level) && level > 0;
}

class PriorityQueue {
    /**
     * @param {string} [priorityValueOrder] - either "highest first" or "lowest first". Defaults to "highest first".
     * @param {?number[]} [priorityLevels] - an array of priority levels which are positive, non-zero integers. Defaults to null.
     */
    constructor(priorityValueOrder = "highest first", priorityLevels = null) {
        /**
         * Highest priority level. Defaults to "none".
         * @type {(number|"none")}
         */
        this.topPriority = noPriority;
        /**
         * A fixed set of priority levels. Defaults to null.
         * @type {(Set<number>|null)}
         */
        this.fixedPriorityLevels = null;
        /**
         * A set of priority levels which have active subqueues.
         * @type {Set<number>}
         */
        this.activePriorityLevels = new Set();
        /**
         * A collection of subqueues keyed by priority level. 
         * @property {Queue} none - subqueue for items with no defined priority level.
         */
        this.subQueues = {
            [noPriority]: new Queue() 
        };
        /**
         * Total length of the priority queue.
         * @type {number}
         */
        this.length = 0;

        if (priorityOrders.includes(priorityValueOrder)) {
            this.priorityValueOrder = priorityValueOrder;
        } else {
            this.priorityValueOrder = "highest first";
        }

        if (priorityLevels !== null && Array.isArray(priorityLevels) && priorityLevels.length) {
            this.fixedPriorityLevels = new Set();
            priorityLevels.forEach(level => { 
                if (validPriority(level)) {
                    this.fixedPriorityLevels.add(level);
                }
            });
        }
    }

    /**
     * Empty the priority queue and reset it to its intial property values.
     */
    reset() {
        this.topPriority = noPriority;
        this.activePriorityLevels = new Set();
        this.length = 0;

        Object.keys(this.subQueues).forEach(key => { delete this.subQueues[key] });

        this.subQueues[noPriority] = new Queue();
    }

    /**
     * Swap the priority value order between highest first and lowest first.
     */
    swapPriorityOrder() {
        this.priorityValueOrder = (this.priorityValueOrder === priorityOrders[0]) ? priorityOrders[1] : priorityOrders[0];

        if (this.topPriority !== noPriority) {
            this.topPriority = (this.priorityValueOrder === priorityOrders[0]) ? Math.max(...this.activePriorityLevels) : Math.min(...this.activePriorityLevels);
        }
    }

    /**
     * Add a node to the queue.
     * @param {(number|"none")} [priority] - a positive, non-zero integer indicating the node's priority level. Defaults to "none".
     * @returns {number} new length of the priority queue.
     */
    enqueue(data, priority = noPriority) {
        while (priority !== noPriority) {
            if (!validPriority(priority)) {
                priority = noPriority;
                break;
            }  

            if (this.fixedPriorityLevels !== null && !this.fixedPriorityLevels.has(priority)) {
                priority = noPriority;
                break;
            } 
            else {
                this.activePriorityLevels.add(priority);
            }

            if (this.topPriority === noPriority
                || (this.priorityValueOrder === "highest first" && priority > this.topPriority)
                || (this.priorityValueOrder === "lowest first" && priority < this.topPriority)
            ) {
                this.topPriority = priority;
            }

            break;
        }

        if (!Object.hasOwn(this.subQueues, priority)) {
            this.subQueues[priority] = new Queue();
        } 

        this.subQueues[priority].enqueue(data);

        return ++this.length;
    }

    /**
     * Remove the node from the queue based on the top priority level.
     * @returns node's data or undefined if the priority queue is empty.
     */
    dequeue() { 
        if (!this.length) return undefined;

        const nodeData = this.subQueues[this.topPriority].dequeue();
        this.length--;

        if (this.topPriority !== noPriority && !this.subQueues[this.topPriority].length) {
            delete this.subQueues[this.topPriority];
            this.activePriorityLevels.delete(this.topPriority)
            if (!this.activePriorityLevels.size) {
                this.topPriority = noPriority;
            } 
            else {
                this.topPriority = (this.priorityValueOrder === priorityOrders[0]) ? Math.max(...this.activePriorityLevels) : Math.min(...this.activePriorityLevels);
            }
        }

        return nodeData;
    }

    /**
     * See what the next item in the priority queue is. Does not change the length of the queue.
     * @returns next item in the queue or undefined if the queue is empty.
     */
    peek() {
        return this.subQueues[this.topPriority].head?.data;
    }
}

export { PriorityQueue }