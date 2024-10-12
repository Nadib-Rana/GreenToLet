const PostShareModel = require("../models/postShareSchema");

const availableSeatFetch = async (req, res, next) => {
  console.log("working available seat fetch middleware.");
  try {
    //all post share collection fetch korlam
    const postInfo = await PostShareModel.find({});

    //total koto gula seat available post ase ta getch korlm
    const totalSeatAvailable = await PostShareModel.find({available:'yes'});

    req.totalSeatAvailable = totalSeatAvailable;
    req.totalSeatAvailableLength = totalSeatAvailable.length;

    //eita range er jonno
    let rangeTkAvailable = [0, 0, 0, 0, 0, 0]; //6ta range tai 6 ta array element rakhsi, egula count korbe ei range a koyta total seat available ase

    //available count kortesi j ei rent range a koyta seat available ase
    for (let i = 0; i < postInfo.length; i++) {
      if (postInfo[i].rent <= 1500) {
        rangeTkAvailable[0]++;
      } else if (postInfo[i].rent > 1500 && postInfo[i].rent <= 2000) {
        rangeTkAvailable[1]++;
      } else if (postInfo[i].rent > 2000 && postInfo[i].rent <= 2500) {
        rangeTkAvailable[2]++;
      } else if (postInfo[i].rent > 2500 && postInfo[i].rent <= 3000) {
        rangeTkAvailable[3]++;
      } else if (postInfo[i].rent > 3000 && postInfo[i].rent <= 3500) {
        rangeTkAvailable[4]++;
      } else {
        rangeTkAvailable[5]++;
      }
    }
    //array theke object a store korlam
    const obj = {
      r1: rangeTkAvailable[0],
      r2: rangeTkAvailable[1],
      r3: rangeTkAvailable[2],
      r4: rangeTkAvailable[3],
      r5: rangeTkAvailable[4],
      r6: rangeTkAvailable[5],
    };

    //req a ei obj ta pathiye dilam, er vitor count gula ase
    req.availableSeatFetch = obj;
    console.log("available seat fetched succesfull.");
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = availableSeatFetch;

