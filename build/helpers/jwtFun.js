"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignIn = exports.verifyUser = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
//get my secret token from env:
const theSecretToken = process.env.TOKEN_SECRET;
// verify the user using bearer token word:
function verifyUser(req, userID) {
    // First take the auth. token from the header:
    const authorizationFromHeader = req.headers.authorization;
    // if the auth. token exist:
    if (authorizationFromHeader) {
        //get the user token:
        const userToken = authorizationFromHeader.slice(7);
        // verify it:
        const decoded = (0, jsonwebtoken_1.verify)(userToken, theSecretToken);
        // then check is the used ID from user token is match the user ID required (extra step so no one can show others date).
        if (userID && decoded.data.UID != userID) {
            // If the user ID is passed and the decoded user ID is not the same as the passed userID then this error will be thrown
            throw new Error("user you ask for does not match with current user token - please provide a correct user ID!");
            return; // return nothing
        }
    }
    else {
        // If sis not 
        throw new Error("YOU ARE NOT AUTHORIZED. PLEASE LOGIN AND PROVIDE THE BEARER TOKEN!");
    }
}
exports.verifyUser = verifyUser;
function SignIn(UID) {
    // just sign in normal function from JWT docs. I add some data for learning only I did not use them.
    return (0, jsonwebtoken_1.sign)({ data: { UID, role: "client", state: "active" } }, theSecretToken);
}
exports.SignIn = SignIn;
