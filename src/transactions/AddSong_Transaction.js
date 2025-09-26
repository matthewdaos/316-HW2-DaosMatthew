import { jsTPS_Transaction } from "jstps";
/**
 * AddSong_Transaction
 * 
 * This class represents a transaction that works with drag
 * and drop. It will be managed by the transaction stack.
 * 
 * @author Matthew Daos
 */
export default class AddSong_Transaction extends jsTPS_Transaction {
    constructor(initApp, initIndex) {
        super();
        this.app = initApp;
        this.index = initIndex;
        this.snapshot = null;
    }

    executeDo() {
        if(!this.snapshot) {
            this.snapshot = this.app.addDefaultSong(this.index);
        } else {
            this.app.addSong(this.index, this.snapshot)
        }
    }

    executeUndo() {
        this.app.removeSong(this.index);
    }
}