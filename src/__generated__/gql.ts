/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\nmutation VerifyToken($input: String!) {\n  verifyToken(input: $input) {\n    isValid\n    token\n    email\n    userType\n    voiceLanguage\n  }\n}\n": types.VerifyTokenDocument,
    "\nmutation Signup($input: SignupInput!) {\n  signup(input: $input)\n}\n": types.SignupDocument,
    " \nmutation SaveCredential($input: CredentialInput!) {\n  saveCredential(input: $input) {\n    messages\n  }\n}\n": types.SaveCredentialDocument,
    "\nquery GetCredential {\n  getCredential {\n    userId\n    name\n    surname\n    dob\n    idNumberOrPassport\n    nationality\n    gender\n    homeLanguage\n    resAddress\n    postAddress\n    phoneNumber\n    parentOrGuardian\n    emailAddress\n    parentOrGuardianPhoneNumber\n    parentOrGuardianEmail\n    parentOrGuardianOccupation\n    parentOrGuardianWorkPhoneNumber\n    parentOrGuardianWorkAddress\n    parentOrGuardianHouseholdIncome\n    schoolName\n    examinationBoard\n    grade12Results\n    grade11Results\n    messages\n  }\n}\n": types.GetCredentialDocument,
    "\nmutation PasswordUpdate($password: String!) {\n  passwordUpdate(password: $password)\n}\n": types.PasswordUpdateDocument,
    "\n mutation SetUserLanguage($voiceLanguage: String!) {\n  setUserLanguage(voiceLanguage: $voiceLanguage)\n}\n  ": types.SetUserLanguageDocument,
    "\n  mutation Signin($input: SigninInput!) {\n    signin(input: $input) {\n      email\n      messages\n      token\n    }\n  }\n": types.SigninDocument,
    "\n  mutation Signup($input: SignupInput!) {\n    signup(input: $input)\n  }\n": types.SignupDocument,
    "\nquery GetAllApplications {\n  getAllApplications {\n    name\n    description\n    type\n    deadline\n    courses\n    applyLink\n    id\n    messages\n    succeeded\n    \n  }\n}": types.GetAllApplicationsDocument,
    "\nquery GetUserApplications($type: Float!) {\n  getUserApplications(type: $type) {\n    name\n    id\n    description\n    type\n    deadline\n    courses\n    applyLink\n    messages\n    succeeded\n    status\n  }\n}\n  ": types.GetUserApplicationsDocument,
    "\nmutation Mutation($input: UserApplicationInput!) {\n  updateApplication(input: $input) {\n    id\n    userId\n    applicationId\n    status\n    messages\n    succeeded\n  }\n}\n": types.MutationDocument,
    "\nquery GetApplicationById($getApplicationByIdId: String!) {\n  getApplicationById(id: $getApplicationByIdId) {\n    name\n    id\n    description\n    type\n    deadline\n    courses\n    applyLink\n    messages\n    succeeded\n  }\n}\n": types.GetApplicationByIdDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation VerifyToken($input: String!) {\n  verifyToken(input: $input) {\n    isValid\n    token\n    email\n    userType\n    voiceLanguage\n  }\n}\n"): (typeof documents)["\nmutation VerifyToken($input: String!) {\n  verifyToken(input: $input) {\n    isValid\n    token\n    email\n    userType\n    voiceLanguage\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation Signup($input: SignupInput!) {\n  signup(input: $input)\n}\n"): (typeof documents)["\nmutation Signup($input: SignupInput!) {\n  signup(input: $input)\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: " \nmutation SaveCredential($input: CredentialInput!) {\n  saveCredential(input: $input) {\n    messages\n  }\n}\n"): (typeof documents)[" \nmutation SaveCredential($input: CredentialInput!) {\n  saveCredential(input: $input) {\n    messages\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetCredential {\n  getCredential {\n    userId\n    name\n    surname\n    dob\n    idNumberOrPassport\n    nationality\n    gender\n    homeLanguage\n    resAddress\n    postAddress\n    phoneNumber\n    parentOrGuardian\n    emailAddress\n    parentOrGuardianPhoneNumber\n    parentOrGuardianEmail\n    parentOrGuardianOccupation\n    parentOrGuardianWorkPhoneNumber\n    parentOrGuardianWorkAddress\n    parentOrGuardianHouseholdIncome\n    schoolName\n    examinationBoard\n    grade12Results\n    grade11Results\n    messages\n  }\n}\n"): (typeof documents)["\nquery GetCredential {\n  getCredential {\n    userId\n    name\n    surname\n    dob\n    idNumberOrPassport\n    nationality\n    gender\n    homeLanguage\n    resAddress\n    postAddress\n    phoneNumber\n    parentOrGuardian\n    emailAddress\n    parentOrGuardianPhoneNumber\n    parentOrGuardianEmail\n    parentOrGuardianOccupation\n    parentOrGuardianWorkPhoneNumber\n    parentOrGuardianWorkAddress\n    parentOrGuardianHouseholdIncome\n    schoolName\n    examinationBoard\n    grade12Results\n    grade11Results\n    messages\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation PasswordUpdate($password: String!) {\n  passwordUpdate(password: $password)\n}\n"): (typeof documents)["\nmutation PasswordUpdate($password: String!) {\n  passwordUpdate(password: $password)\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n mutation SetUserLanguage($voiceLanguage: String!) {\n  setUserLanguage(voiceLanguage: $voiceLanguage)\n}\n  "): (typeof documents)["\n mutation SetUserLanguage($voiceLanguage: String!) {\n  setUserLanguage(voiceLanguage: $voiceLanguage)\n}\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Signin($input: SigninInput!) {\n    signin(input: $input) {\n      email\n      messages\n      token\n    }\n  }\n"): (typeof documents)["\n  mutation Signin($input: SigninInput!) {\n    signin(input: $input) {\n      email\n      messages\n      token\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Signup($input: SignupInput!) {\n    signup(input: $input)\n  }\n"): (typeof documents)["\n  mutation Signup($input: SignupInput!) {\n    signup(input: $input)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetAllApplications {\n  getAllApplications {\n    name\n    description\n    type\n    deadline\n    courses\n    applyLink\n    id\n    messages\n    succeeded\n    \n  }\n}"): (typeof documents)["\nquery GetAllApplications {\n  getAllApplications {\n    name\n    description\n    type\n    deadline\n    courses\n    applyLink\n    id\n    messages\n    succeeded\n    \n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetUserApplications($type: Float!) {\n  getUserApplications(type: $type) {\n    name\n    id\n    description\n    type\n    deadline\n    courses\n    applyLink\n    messages\n    succeeded\n    status\n  }\n}\n  "): (typeof documents)["\nquery GetUserApplications($type: Float!) {\n  getUserApplications(type: $type) {\n    name\n    id\n    description\n    type\n    deadline\n    courses\n    applyLink\n    messages\n    succeeded\n    status\n  }\n}\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation Mutation($input: UserApplicationInput!) {\n  updateApplication(input: $input) {\n    id\n    userId\n    applicationId\n    status\n    messages\n    succeeded\n  }\n}\n"): (typeof documents)["\nmutation Mutation($input: UserApplicationInput!) {\n  updateApplication(input: $input) {\n    id\n    userId\n    applicationId\n    status\n    messages\n    succeeded\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetApplicationById($getApplicationByIdId: String!) {\n  getApplicationById(id: $getApplicationByIdId) {\n    name\n    id\n    description\n    type\n    deadline\n    courses\n    applyLink\n    messages\n    succeeded\n  }\n}\n"): (typeof documents)["\nquery GetApplicationById($getApplicationByIdId: String!) {\n  getApplicationById(id: $getApplicationByIdId) {\n    name\n    id\n    description\n    type\n    deadline\n    courses\n    applyLink\n    messages\n    succeeded\n  }\n}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;