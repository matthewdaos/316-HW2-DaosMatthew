import { jsTPS_Transaction } from "jstps";
/**
 * RemoveSong_Transaction
 * 
 * This class represents a transaction that works with drag
 * and drop. It will be managed by the transaction stack.
 * 
 * @author Matthew Daos
 */
export default class RemoveSong_Transaction extends jsTPS_Transaction {
    constructor(initApp, initIndex) {
        super();
        this.app = initApp;
        this.index = initIndex;
        this.snapshot = null;
    }

    executeDo() {
        this.snapshot = this.app.getSnapshot(this.index);
        this.app.removeSong(this.index);
    }

    executeUndo() {
        this.app.addSong(this.index, this.snapshot);
    }
}