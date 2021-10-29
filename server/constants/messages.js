export const emptyTokenMessage = 'Please insert the token';
export const invalidTokenMessage = 'You have provided an invalid token. Please try to login again';

/**
 * Don't delete unknownTokenMessage, missingTokenMessage and userNotFound messages
 * userNotFound = It is used to verify public id of user in token is exist
 * missingTokenMessage = It is used to check whether token is not in database
 * unknownTokenMessage = It is used to compare incoming token against saved token
 * the same error mesage returned to client.
 * If messages are exactly the same we don't allow a user to continue
 */
export const unknownTokenMessage = 'You have provided wrong token.';
export const missingTokenMessage = 'The token is not found.';
export const userNotFound = 'User is not found.';

export const profileAlreadyExistMessage = 'User profile already exist';
export const imageIsNotValidMessage = 'Image is not valid';

export const userLogoutSuccessMessage = 'You have logged out successfully';

/**
 * Don't delete profileNotCreatedMessage message
 * We are relying to it to detect if user created a profile
 */
export const profileNotCreatedMessage = 'you did not create profile';

export const brandNameAlreadyCreated = 'You have already created a brand';
export const usernameAlreadyTaken = 'Username is already taken';

export const missingAuthTokenMessage = 'Missing auth token!';


export const usernameRequiredMessage = 'Username is required';
export const usernameMaximumMessage = 'Maximum username length is fifteen(15)';
export const usernameMinimumMessage = 'Minimum username length is one(1)';
export const usernameCategoryMessage = 'Username should include only alphabet, digits and underscore';
export const usernameIsnotAvailable = 'Provided username is not available';

export const coordinatesRequiredMessage = 'User coordinates is required';

export const noPhoneNumberDuplicateMessage = 'Owner and witnesses contact provided should be unique';
export const brandNotCreatedMessage = 'Brand is not create';

export const noItemFoundMessage = 'No item found';
export const usernameNotFoundMessage = 'Username is found';
export const firstNotNegativeMessage = 'Provided First should not be negative';
export const afterIsNotValidMessage = 'Provided After should be valid';

export const noContentMessage = 'Content is empty';
export const noUserFoundMessage = 'User not found';

export const AuthenticateAsGuest = 'Auth::Guest';
export const isAuthenticateMessage = 'You are not Authenticate';
export const allInputNotCorrectMessage = 'All input are not correct';
