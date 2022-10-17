import { Request } from "express";
import { verify, JwtPayload, sign } from "jsonwebtoken";


//get my secret token from env:
const theSecretToken = process.env.TOKEN_SECRET as string;

// verify the user using bearer token word:
function verifyUser(req: Request, userID?: number) {
  // First take the auth. token from the header:
  const authorizationFromHeader = req.headers.authorization;
  // if the auth. token exist:
  if(authorizationFromHeader) {
    //get the user token:
    const userToken = authorizationFromHeader.slice(7)
    // verify it:
    const decodedJWT = verify(userToken as string, theSecretToken) as JwtPayload;
    // then check is the used ID from user token is match the user ID required (extra step so no one can show others date).
    if (userID && decodedJWT.data.UID != userID) {
      // If the user ID is passed and the decoded user ID is not the same as the passed userID then this error will be thrown
      throw new Error(
        "user you ask for does not match with current user token - please provide a correct user ID!"
      );
      return; // return nothing
    }
  } else {
    // If sis not 
    throw new Error(
      "YOU ARE NOT AUTHORIZED. PLEASE LOGIN AND PROVIDE THE BEARER TOKEN!"
    );
  }
}

function SignIn(UID: number) {
  // just sign in normal function from JWT docs. I add some data for learning only I did not use them.
  return sign({ data: { UID, role: "client", state: "active" } }, theSecretToken);
}

export { verifyUser, SignIn };