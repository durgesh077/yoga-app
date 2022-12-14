const {Users} = require('../db')
const md5  = require('md5') ;

module.exports =  async (req , res)=>{
    try{
        const session =  req.session ;
        const {username , firstName , lastName , dateOfBirth , password }  = req.body ;
        const user = new Users({
            username,
            firstName,
            lastName,
            dateOfBirth,
            hashedPasswd : md5(password) 
        }) ;
        await user.save();
        session.username =  username ;
        res.status(201).send('Registered Succesfully!!') ;
    }
    catch(err){
        console.error(err.message) ;
        res.status(401).send(err.message??'Unable to register') ;
    }

}