import {Block} from './block';
import {createHash} from 'crypto'

export class Chain{
    public maxContent : number = 0;
    public hash : string = "";
    public blocks : Block[] = []
    
    constructor(maxContent = 5) {
        this.maxContent = maxContent;
        
    }


    public toString() {
        return JSON.stringify(this);
    }
}