const bc = require("../build/blockchain");

test('create blockchain file',() => {
      var myBc = new bc.Blockchain();
      myBc.AddElement('test');
      myBc.saveFile("chain.test.json");
});

test('read from blockchain file',() =>{
      var myBc = new bc.Blockchain("chain.test.json");
      expect(myBc.index).toBe(1);
      expect(myBc.block.Content[0]).toStrictEqual('test');

});