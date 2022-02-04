/* eslint-disable no-undef */
const { read, save, remove } = require("../src/background-store.js");

// eslint-disable-next-line no-undef
test("concurrent SRR store penetration", async() => {
  let count = 500;
  let proms = [];
  for (let i = 1; i <= count; i++) {
    process.stdout.write(`counter: ${i}`);  
    proms.push(
      new Promise((r) => {
        if(i === count) console.log(`Saved: ${count}`);
        save(`TEST-${i}`, `TEST-${i}`);r();
      })
    );
    proms.push(
        new Promise((r) => {
          if(i === count) console.log(`Read: ${count}`);
          read(`TEST-${i}`, `TEST-${i}`);r();
        })
    );
    proms.push(
        new Promise((r) => {
          if(i === count) console.log(`Removed: ${count}`);
          remove(`TEST-${i}`, `TEST-${i}`);r();
        })
      );
  }
  let res = await resovle(proms);
  expect(res).toBe(true)
});


const resovle = async (proms)=>
{ 
    try {
        await Promise.all(proms);
        return true;
    }catch (err){
        return err;
    }
}