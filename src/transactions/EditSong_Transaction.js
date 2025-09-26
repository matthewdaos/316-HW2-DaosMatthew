import { jsTPS_Transaction } from "jstps";
/**
 * EditSong_Transaction
 * 
 * This class represents a transaction that works with drag
 * and drop. It will be managed by the transaction stack.
 * 
 * @author Matthew Daos
 */
export default class EditSong_Transaction extends jsTPS_Transaction {
    constructor(initApp, initIndex, initNew) {
        super();
        this.app = initApp;
        this.index = initIndex;
        this.new = { ...initNew };
        this.old = null;
    }

    executeDo() {
        if(!this.old) {
            let current = this.app.getSnapshot(this.index);
            this.old = { ...current };
        } 
        this.app.editSongAtIndex(this.index, this.new);
    }

    executeUndo() {
        this.app.editSongAtIndex(this.index, this.old);
    }
}