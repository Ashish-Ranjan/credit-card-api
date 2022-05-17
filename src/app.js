const express = require("express");

const app = express();

app.get("/getallcards", (req, res) => {
    res.send({data:[
        {
          id: "e1",
          name: "Client 1",
          cardnumber: 4659854435625484,
          balance: 100,
          limit: 5000,
        },
        {
          id: "e2",
          name: "Client 2",
          cardnumber: 4685443562548459,
          balance: 100,
          limit: 5000,
        },
        {
          id: "e3",
          name: "Client 3",
          cardnumber: 4685356254845944,
          balance: 100,
          limit: 5000,
        },
      ]});
});

app.listen(3001,()=>{
    console.log('Server is up on port 3001');
});
