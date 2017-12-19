require('dotenv').config();
const express = require('express')
    , session = require('express-session')
    , bodyParser = require('body-parser')
    , massive = require('massive')
    , cors = require('cors')
    , axios = require('axios')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0');


//---controllers---//
const uc = require('./controllers/usersController.js')
    , pc = require('./controllers/productsController.js')
    , mc = require('./controllers/mail_controller.js');

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../build`));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}))

massive(process.env.CONNECTION_STRING).then(db => {
    console.log('Connected to the database')
    app.set('db', db);
})

app.use((req, res, next) => { console.log(req.method, req.url); next(); })

//---auth0 authentication---//

app.use(passport.initialize());
app.use(passport.session());


passport.use(new Auth0Strategy({
    domain: process.env.AUTH_DOMAIN,
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
    function (accessToken, refreshToken, extraParams, profile, done) {
        const db = app.get('db');

        db.find_user([profile.identities[0].user_id])
            .then(user => {
                console.log(profile.identities[0])
                if (user[0]) {
                    console.log('user1', user);
                    return done(null, user[0].id)
                }
                else {
                    //--if no user, create new user--//

                    const user = profile._json;
                    console.log('user2',user);
                    db.create_user([user.given_name,
                    user.family_name,
                        user.email,
                        user.picture,
                        'location',
                        'state',
                        false,
                    user.identities[0].user_id,
                        true])
                        .then(user => {
                            return done(null, user[0].id);
                        })
                }
            })
    }))

app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/loading',
    failureRedirect: '/auth'
}));
app.get('/auth/me', (req, res) => {
    if (!req.user) {
        return res.status(404).send('User Not Found');
    }
    else {
        return res.status(200).send(req.user);
    }
})

app.get('/auth/logout', (req, res) => {
    req.logOut();
    res.redirect(302, 'http://localhost:3000/')
})



passport.serializeUser((id, done) => {
    done(null, id);
})

passport.deserializeUser((id, done) => {
    app.get('db').find_current_user([id])
        .then(user => {

            done(null, user[0]);
        })

})
//---End of auth0---//



//----ENDPOINTS---//

//-------get all products---/
app.get('/getallproducts', pc.getAllProducts);

//-------Send message through nodemailer---/
app.post('/api/send_email', mc.sendEmail)

//--------SaveUserInfo------------------//
app.put('/api/saveuser/:id', uc.saveUser);


// for setting up online
const path = require('path')
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
})

const PORT = 3002;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));