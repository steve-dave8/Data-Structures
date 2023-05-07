class Stack {
    constructor() {
        this.contents = [];
    }

    /**
     * Empty the stack.
     */
    clear() {
        this.contents = [];
    }

    /**
     * Add an item to the top of the stack.
     * @returns {number} new length of the stack.
     */
    add(item) {
        return this.contents.push(item);
    }

    /**
     * Remove the item on top of the stack.
     * @returns last item on the stack or undefined if the stack is empty.
     */
    remove() {
        return this.contents.pop();
    }

    /**
     * See what the last item in the stack is. Does not change the length of the stack.
     * @returns last item on the stack or undefined if the stack is empty.
     */
    peek() {
        return this.contents[this.contents.length - 1];
    }
}

export { Stack }