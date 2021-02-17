const bcrypt = require('bcryptjs')

module.exports = {

    register: async (req, res)=> {
        const {username, password}  = req.body
        const pic = `https://robohash.org/${username}.png`
        const db = req.app.get('db')
        const result = await db.user.find_user_by_username([username])
        const existingUser = result[0]
        console.log(result)
        if(existingUser){
            return res.status(409).send('Username taken')
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const registeredUser = await db.user.create_user([username, hash, pic])
        const user = registeredUser[0]
        req.session.user = 
        {
            username: user.username,
            id: user.id,
            profilePic: user.pic 
        }
        res.status(201).send(req.session.user)
    },

    login: async (req, res)=>{
        const {username, password} = req.body
        dbInstance = req.app.get('db')
        const foundUser = await req.app.get('db').find_user_by_username([username])
        const user = foundUser[0]
        if(!user){
            res.status(401).send('User not found. Please register as a new user before logging in')
        }

        const isAuthenticated = bcrypt.compareSync(password, user.password)
        if(!isAuthenticated){
            res.status(403).send('Incorrect Password')
        }

        req.session.user = {
            username: user.username,
            id: user.id
        }
        return res.send(req.session.user)
    },

    logout: (req, res)=>{
        req.session.destroy()
        return res.status(200)
    },

    getUser: ()=>{
        const {user} = req.session
        if(user){
            return res.send(200).send({loggedIn: true, user})
        } else {
            return res.send(404)
        }
    }


}