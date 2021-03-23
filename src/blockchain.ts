import {Block} from './block';
import {Chain} from './chain';
import fs from 'fs'
import {createHash} from 'crypto'

export class Blockchain{

    public chain : Chain;
    public  block : Block;
    private index : number;


    public saveFile(filename : string){
        this.chain.blocks.push(this.block);
        this.chain.hash = this.getHash( this.chain.blocks);
        fs.writeFileSync(filename,this.chain.toString());
    }

    public loadFile(fileName : string){
        if (!fileName.endsWith(".json")) fileName += ".json";
        let raw = fs.readFileSync(fileName);
        this.load(raw.toString());

    } 

    public load(data : string){
        this.chain = JSON.parse(data.toString());
        if (this.chain.hash != this.getHash(this.chain.blocks)){
            throw new Error("Consistency Error");
        }

        if (!this.checkBlocks(this.chain.blocks)){
            throw new Error("Consistency Error"); 
        }
        this.block = this.chain.blocks.pop() as Block || new Block();
        this.index = this.block.Content.length || 0;
    }

    public getHash(object : Object) : string {
        let textBlock = JSON.stringify(object);
        let hash = createHash('md5').update(textBlock).digest("base64");
        return hash;
    }

    public AddElement(text : string){
        if (this.index == this.chain.maxContent){
            let oldHash = this.getHash(this.block);
            this.chain.blocks.push(this.block);
            this.block = new Block;
            this.index = 0;
            this.block.PrevHash = oldHash;
        }
    
        this.index++;
        this.block.Content.push(text);
    }
    
    public checkBlocks(bs : Block[],start : number = 0, count : number = bs.length - 1) : boolean {
        let result : boolean = true;
        let prevHash : String = (start == 0 ? "" : this.getHash(bs[start - 1]));
        bs.slice(start,start + count ).forEach((b,i) => {
            if (b.PrevHash != prevHash){
                result = false;
                return result;
            }
            prevHash = this.getHash(b)
        });
        return result;
    }


    constructor(filename : string | null = null){
        this.block = new Block();
        this.chain = new Chain();
        this.index = 0;
        if (filename != null ){
            this.loadFile(filename);
        }



    }

}