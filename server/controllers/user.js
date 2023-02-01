const jwt = require('jsonwebtoken')

function fetchUserId(token) {
    // console.log("fetchUserId", token, token?.length);
    if (token?.length) {
        return jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
                console.log("jwt error", err)
                return 'guest';
            }
            return user.id;
        })
    } else {
        return 'guest';
    }

}

module.exports = fetchUserId;