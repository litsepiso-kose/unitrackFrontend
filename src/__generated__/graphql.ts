/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.This scalar is serialized to a string in ISO 8601 format and parsed from a string in ISO 8601 format. */
  DateTimeISO: { input: any; output: any; }
};

export type ApplicationDataOutput = {
  __typename?: 'ApplicationDataOutput';
  applyLink: Scalars['String']['output'];
  courses?: Maybe<Array<Scalars['String']['output']>>;
  deadline: Scalars['DateTimeISO']['output'];
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  messages: Array<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  status: Scalars['Float']['output'];
  succeeded: Scalars['Boolean']['output'];
  type: Scalars['Float']['output'];
};

export type CredentialInput = {
  dob: Scalars['String']['input'];
  emailAddress: Scalars['String']['input'];
  examinationBoard: Scalars['String']['input'];
  gender: Scalars['String']['input'];
  grade11Results: Scalars['String']['input'];
  grade12Results: Scalars['String']['input'];
  homeLanguage: Scalars['String']['input'];
  idNumberOrPassport: Scalars['String']['input'];
  name: Scalars['String']['input'];
  nationality: Scalars['String']['input'];
  parentOrGuardian: Scalars['String']['input'];
  parentOrGuardianEmail: Scalars['String']['input'];
  parentOrGuardianHouseholdIncome: Scalars['String']['input'];
  parentOrGuardianOccupation: Scalars['String']['input'];
  parentOrGuardianPhoneNumber: Scalars['String']['input'];
  parentOrGuardianWorkAddress: Scalars['String']['input'];
  parentOrGuardianWorkPhoneNumber: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  postAddress: Scalars['String']['input'];
  resAddress: Scalars['String']['input'];
  schoolName: Scalars['String']['input'];
  surname: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type CredentialOutput = {
  __typename?: 'CredentialOutput';
  dob?: Maybe<Scalars['String']['output']>;
  emailAddress?: Maybe<Scalars['String']['output']>;
  examinationBoard?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  grade11Results?: Maybe<Scalars['String']['output']>;
  grade12Results?: Maybe<Scalars['String']['output']>;
  homeLanguage?: Maybe<Scalars['String']['output']>;
  idNumberOrPassport?: Maybe<Scalars['String']['output']>;
  messages: Array<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  nationality?: Maybe<Scalars['String']['output']>;
  parentOrGuardian?: Maybe<Scalars['String']['output']>;
  parentOrGuardianEmail?: Maybe<Scalars['String']['output']>;
  parentOrGuardianHouseholdIncome?: Maybe<Scalars['String']['output']>;
  parentOrGuardianOccupation?: Maybe<Scalars['String']['output']>;
  parentOrGuardianPhoneNumber?: Maybe<Scalars['String']['output']>;
  parentOrGuardianWorkAddress?: Maybe<Scalars['String']['output']>;
  parentOrGuardianWorkPhoneNumber?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  postAddress?: Maybe<Scalars['String']['output']>;
  resAddress?: Maybe<Scalars['String']['output']>;
  schoolName?: Maybe<Scalars['String']['output']>;
  surname?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createRoom: Scalars['String']['output'];
  forgotPassword: Scalars['Boolean']['output'];
  passwordUpdate: Scalars['Boolean']['output'];
  resetPassword: Scalars['Boolean']['output'];
  saveCredential: CredentialOutput;
  setUserLanguage: Scalars['Boolean']['output'];
  setUserType: Scalars['Boolean']['output'];
  signin: SigninOutput;
  signup: Scalars['Boolean']['output'];
  updateApplication: UserApplicationOutput;
  verifyToken: VerifyTokenOutput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationPasswordUpdateArgs = {
  password: Scalars['String']['input'];
};


export type MutationResetPasswordArgs = {
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationSaveCredentialArgs = {
  input: CredentialInput;
};


export type MutationSetUserLanguageArgs = {
  voiceLanguage: Scalars['String']['input'];
};


export type MutationSetUserTypeArgs = {
  userType: Scalars['Float']['input'];
};


export type MutationSigninArgs = {
  input: SigninInput;
};


export type MutationSignupArgs = {
  input: SignupInput;
};


export type MutationUpdateApplicationArgs = {
  input: UserApplicationInput;
};


export type MutationVerifyTokenArgs = {
  input: Scalars['String']['input'];
};

export type NotificationOutput = {
  __typename?: 'NotificationOutput';
  applicationId: Scalars['String']['output'];
  deadline: Scalars['DateTimeISO']['output'];
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  messages: Array<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  succeeded: Scalars['Boolean']['output'];
};

export type Query = {
  __typename?: 'Query';
  getAllApplications: Array<ApplicationDataOutput>;
  getApplicationById: ApplicationDataOutput;
  getCredential: CredentialOutput;
  getUserApplications: Array<ApplicationDataOutput>;
  getUserNotifications: Array<NotificationOutput>;
  test: Scalars['String']['output'];
};


export type QueryGetApplicationByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetUserApplicationsArgs = {
  type: Scalars['Float']['input'];
};

export type SigninInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SigninOutput = {
  __typename?: 'SigninOutput';
  email?: Maybe<Scalars['String']['output']>;
  messages: Array<Scalars['String']['output']>;
  token: Scalars['String']['output'];
};

export type SignupInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type UserApplicationInput = {
  applicationId: Scalars['String']['input'];
  status?: InputMaybe<Scalars['Float']['input']>;
};

export type UserApplicationOutput = {
  __typename?: 'UserApplicationOutput';
  applicationId: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  messages: Array<Scalars['String']['output']>;
  status?: Maybe<Scalars['Float']['output']>;
  succeeded: Scalars['Boolean']['output'];
  userId: Scalars['String']['output'];
};

export type VerifyTokenOutput = {
  __typename?: 'VerifyTokenOutput';
  email?: Maybe<Scalars['String']['output']>;
  isValid: Scalars['Boolean']['output'];
  token: Scalars['String']['output'];
  userType?: Maybe<Scalars['Float']['output']>;
  voiceLanguage?: Maybe<Scalars['String']['output']>;
};

export type GetUserNotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserNotificationsQuery = { __typename?: 'Query', getUserNotifications: Array<{ __typename?: 'NotificationOutput', name: string, id: string, applicationId: string, description: string, deadline: any, messages: Array<string>, succeeded: boolean }> };

export type VerifyTokenMutationVariables = Exact<{
  input: Scalars['String']['input'];
}>;


export type VerifyTokenMutation = { __typename?: 'Mutation', verifyToken: { __typename?: 'VerifyTokenOutput', isValid: boolean, token: string, email?: string | null, userType?: number | null, voiceLanguage?: string | null } };

export type SignupMutationVariables = Exact<{
  input: SignupInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: boolean };

export type SaveCredentialMutationVariables = Exact<{
  input: CredentialInput;
}>;


export type SaveCredentialMutation = { __typename?: 'Mutation', saveCredential: { __typename?: 'CredentialOutput', messages: Array<string> } };

export type GetCredentialQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCredentialQuery = { __typename?: 'Query', getCredential: { __typename?: 'CredentialOutput', userId?: string | null, name?: string | null, surname?: string | null, dob?: string | null, idNumberOrPassport?: string | null, nationality?: string | null, gender?: string | null, homeLanguage?: string | null, resAddress?: string | null, postAddress?: string | null, phoneNumber?: string | null, parentOrGuardian?: string | null, emailAddress?: string | null, parentOrGuardianPhoneNumber?: string | null, parentOrGuardianEmail?: string | null, parentOrGuardianOccupation?: string | null, parentOrGuardianWorkPhoneNumber?: string | null, parentOrGuardianWorkAddress?: string | null, parentOrGuardianHouseholdIncome?: string | null, schoolName?: string | null, examinationBoard?: string | null, grade12Results?: string | null, grade11Results?: string | null, messages: Array<string> } };

export type PasswordUpdateMutationVariables = Exact<{
  password: Scalars['String']['input'];
}>;


export type PasswordUpdateMutation = { __typename?: 'Mutation', passwordUpdate: boolean };

export type SetUserLanguageMutationVariables = Exact<{
  voiceLanguage: Scalars['String']['input'];
}>;


export type SetUserLanguageMutation = { __typename?: 'Mutation', setUserLanguage: boolean };

export type SigninMutationVariables = Exact<{
  input: SigninInput;
}>;


export type SigninMutation = { __typename?: 'Mutation', signin: { __typename?: 'SigninOutput', email?: string | null, messages: Array<string>, token: string } };

export type GetAllApplicationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllApplicationsQuery = { __typename?: 'Query', getAllApplications: Array<{ __typename?: 'ApplicationDataOutput', name: string, description: string, type: number, deadline: any, courses?: Array<string> | null, applyLink: string, id: string, messages: Array<string>, succeeded: boolean }> };

export type MutationMutationVariables = Exact<{
  input: UserApplicationInput;
}>;


export type MutationMutation = { __typename?: 'Mutation', updateApplication: { __typename?: 'UserApplicationOutput', id?: string | null, userId: string, applicationId: string, status?: number | null, messages: Array<string>, succeeded: boolean } };

export type GetApplicationByIdQueryVariables = Exact<{
  getApplicationByIdId: Scalars['String']['input'];
}>;


export type GetApplicationByIdQuery = { __typename?: 'Query', getApplicationById: { __typename?: 'ApplicationDataOutput', name: string, id: string, description: string, type: number, deadline: any, courses?: Array<string> | null, applyLink: string, messages: Array<string>, succeeded: boolean } };

export type GetUserApplicationsQueryVariables = Exact<{
  type: Scalars['Float']['input'];
}>;


export type GetUserApplicationsQuery = { __typename?: 'Query', getUserApplications: Array<{ __typename?: 'ApplicationDataOutput', name: string, id: string, description: string, type: number, deadline: any, courses?: Array<string> | null, applyLink: string, messages: Array<string>, succeeded: boolean, status: number }> };


export const GetUserNotificationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserNotifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserNotifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"applicationId"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"deadline"}},{"kind":"Field","name":{"kind":"Name","value":"messages"}},{"kind":"Field","name":{"kind":"Name","value":"succeeded"}}]}}]}}]} as unknown as DocumentNode<GetUserNotificationsQuery, GetUserNotificationsQueryVariables>;
export const VerifyTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isValid"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"voiceLanguage"}}]}}]}}]} as unknown as DocumentNode<VerifyTokenMutation, VerifyTokenMutationVariables>;
export const SignupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Signup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignupInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<SignupMutation, SignupMutationVariables>;
export const SaveCredentialDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SaveCredential"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CredentialInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"saveCredential"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messages"}}]}}]}}]} as unknown as DocumentNode<SaveCredentialMutation, SaveCredentialMutationVariables>;
export const GetCredentialDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCredential"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCredential"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"dob"}},{"kind":"Field","name":{"kind":"Name","value":"idNumberOrPassport"}},{"kind":"Field","name":{"kind":"Name","value":"nationality"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"homeLanguage"}},{"kind":"Field","name":{"kind":"Name","value":"resAddress"}},{"kind":"Field","name":{"kind":"Name","value":"postAddress"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"parentOrGuardian"}},{"kind":"Field","name":{"kind":"Name","value":"emailAddress"}},{"kind":"Field","name":{"kind":"Name","value":"parentOrGuardianPhoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"parentOrGuardianEmail"}},{"kind":"Field","name":{"kind":"Name","value":"parentOrGuardianOccupation"}},{"kind":"Field","name":{"kind":"Name","value":"parentOrGuardianWorkPhoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"parentOrGuardianWorkAddress"}},{"kind":"Field","name":{"kind":"Name","value":"parentOrGuardianHouseholdIncome"}},{"kind":"Field","name":{"kind":"Name","value":"schoolName"}},{"kind":"Field","name":{"kind":"Name","value":"examinationBoard"}},{"kind":"Field","name":{"kind":"Name","value":"grade12Results"}},{"kind":"Field","name":{"kind":"Name","value":"grade11Results"}},{"kind":"Field","name":{"kind":"Name","value":"messages"}}]}}]}}]} as unknown as DocumentNode<GetCredentialQuery, GetCredentialQueryVariables>;
export const PasswordUpdateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PasswordUpdate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"passwordUpdate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<PasswordUpdateMutation, PasswordUpdateMutationVariables>;
export const SetUserLanguageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetUserLanguage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"voiceLanguage"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setUserLanguage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"voiceLanguage"},"value":{"kind":"Variable","name":{"kind":"Name","value":"voiceLanguage"}}}]}]}}]} as unknown as DocumentNode<SetUserLanguageMutation, SetUserLanguageMutationVariables>;
export const SigninDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Signin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SigninInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"messages"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<SigninMutation, SigninMutationVariables>;
export const GetAllApplicationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllApplications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllApplications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"deadline"}},{"kind":"Field","name":{"kind":"Name","value":"courses"}},{"kind":"Field","name":{"kind":"Name","value":"applyLink"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"messages"}},{"kind":"Field","name":{"kind":"Name","value":"succeeded"}}]}}]}}]} as unknown as DocumentNode<GetAllApplicationsQuery, GetAllApplicationsQueryVariables>;
export const MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Mutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserApplicationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateApplication"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"applicationId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"messages"}},{"kind":"Field","name":{"kind":"Name","value":"succeeded"}}]}}]}}]} as unknown as DocumentNode<MutationMutation, MutationMutationVariables>;
export const GetApplicationByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetApplicationById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"getApplicationByIdId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getApplicationById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"getApplicationByIdId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"deadline"}},{"kind":"Field","name":{"kind":"Name","value":"courses"}},{"kind":"Field","name":{"kind":"Name","value":"applyLink"}},{"kind":"Field","name":{"kind":"Name","value":"messages"}},{"kind":"Field","name":{"kind":"Name","value":"succeeded"}}]}}]}}]} as unknown as DocumentNode<GetApplicationByIdQuery, GetApplicationByIdQueryVariables>;
export const GetUserApplicationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserApplications"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserApplications"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"deadline"}},{"kind":"Field","name":{"kind":"Name","value":"courses"}},{"kind":"Field","name":{"kind":"Name","value":"applyLink"}},{"kind":"Field","name":{"kind":"Name","value":"messages"}},{"kind":"Field","name":{"kind":"Name","value":"succeeded"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<GetUserApplicationsQuery, GetUserApplicationsQueryVariables>;