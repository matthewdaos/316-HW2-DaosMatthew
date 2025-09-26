import { jsTPS_Transaction } from "jstps";
/**
 * DuplicateList_Transaction
 * 
 * This class represents a transaction that works with drag
 * and drop. It will be managed by the transaction stack.
 * 
 * @author Matthew Daos
 */

export default class DuplicateList_Transaction extends jsTPS_Transaction {
    constructor(initApp, initKey) {
        super();
        this.app = initApp;
        this.srcKey = initKey;
        this.newKey = null;
    }

    executeDo() {
        this.newKey = this.app.createDuplicateList(this.srcKey);
    }

    executeUndo() {
        if(this.newKey != null) {
            this.app.deleteList(this.newKey);
        }
    }
}