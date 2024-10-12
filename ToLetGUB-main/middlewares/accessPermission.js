const jwt = require('jsonwebtoken');
const Model = require('../models/studentSchema')

const accessPermission = async (req,res,next)=>{
    try {
        const cookieToken = req.cookies.studentCookie;

        const validUser = jwt.verify(cookieToken,process.env.SECRET_KEY)

        const user = await Model.findOne({_id: validUser._id});

        if(user){
            //value gulo pathiye dilam jate ak page theke another page a gele value gulo use kora jay
            
            req.token = cookieToken;
            //eita diye value ak page theke onno page a use korte pabo
            //like req.studentInfo.name
            req.studentInfo = user; 

            next();
        }
    } catch (error) {
        req.unAuthenticateUser=true;
        next();
        // return res.status(401).send(`
        //     <script>
        //         alert("Session time is out. Please Login again!!!");
        //         window.location.href = "/login";
        //     </script>
        // `);
    }


}

module.exports = accessPermission;