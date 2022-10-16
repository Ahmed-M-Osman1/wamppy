import { Request } from "express";
import { verify, JwtPayload, sign } from "jsonwebtoken";

const theSecretToken = process.env.TOKEN_SECRET as string;

// verify the user using bearer token word
function verifyUser(req: Request, userId?: number) {
  const authorization = req.headers.authorization;
  console.log("=>", authorization);
  const token = authorization!.split(" ")[1];

  const decoded = verify(token as string, theSecretToken) as JwtPayload;

  if (userId && decoded.user.userId != userId) {
    // If the user ID is passed and the decoded user ID is not the same as the passed userID then this error will be thrown
    throw new Error(
      "user you ask for does not match with current user token - please provide a correct user ID"
    );
    return;
  }
}

function SignIn(userId: number) {
  // just sign in normal function
  return sign({ user: { userId } }, theSecretToken);
}

export { verifyUser, SignIn };
