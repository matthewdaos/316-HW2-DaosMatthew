import { jsTPS_Transaction } from "jstps";
/**
 * AddSong_Transaction
 * 
 * This class represents a transaction that works with drag
 * and drop. It will be managed by the transaction stack.
 * 
 * @author Matthew Daos
 */

export default class DuplicateSong_Transaction extends jsTPS_Transaction {
    constructor(initApp, initIndex) {
        super();
        this.app = initApp;
        this.srcIndex = initIndex;
        this.insertIndex = initIndex + 1;
        this.copied = null;
    }

    executeDo() {
        let snap = this.app.getSnapshot(this.srcIndex);
        this.copied = { ...snap };
        this.app.addSong(this.insertIndex, this.copied);
    }

    executeUndo() {
        this.app.removeSong(this.insertIndex);
    }
}