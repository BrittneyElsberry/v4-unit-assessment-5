const bcrypt = require('bcryptjs')

module.exports = {

    register: async (req, res)=> {
        const {username, password}  = req.body
        const db = req.app.get('db')
        const result = await db.get_user([username])
        const existingUser = result[0]

        if(existingUser){
            return res.status(409).send('Username taken')
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const registeredUser = await db.create_user.sql([username, hash, `https://robohash.org/${username}.png`])
        const user = registeredUser[0]
        req.session.user = 
        {
            username: registeredUser[0].username,
            id: registeredUser[0].id,
            profilePic: registeredUser[0].profile_pic 
        }
        res.status(201).send(req.session.user)
    },

    login: async (req, res)=>{
        const {username, password} = req.body
        dbInstance = req.app.get('db')
        const foundUser = await req.app.get('db').find_user_by_username.sql([username])
        const user = foundUser[0]
        if(!user){
            res.status(401).send('User not found. Please register as a new user before logging in')
        }

        const isAuthenticated = bcrypt.compareSync(password, user.hash)
        if(!isAuthenticated){
            res.status(403).send('Incorrect Password')
        }

        req.session.user = {
            username: foundUser[0].username
        }
        return res.send(req.session.user)
    },

    logout: (req, res)=>{
        req.session.destroy()
        return res.status(200)
    },

    getUser: ()=>{

    }


}