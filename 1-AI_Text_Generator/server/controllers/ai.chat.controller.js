const generateResponse = require('../services/ai.service') ;

const askAi = async (req ,res) => {
    try{
        let {prompt} = req.body ; 
        if(!prompt)
        {
            return res.status(400).json({
                Message : "Prompt not found.."
            })
        }
        const respone = await generateResponse(prompt) ;
        return res.status(200).json({
            success : true , 
            Response : respone
        })
    }
    catch(err) {
        console.log(err) ;
        res.status(500).json({
            error : err
        })
    }
}

module.exports = askAi ;