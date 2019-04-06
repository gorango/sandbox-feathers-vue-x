
// Define the combined GraphQL schema. (Can be re-generated.)
// !code: imports // !end
// !code: init // !end

let moduleExports = `
type ConvoGroup {
  uuid: String
  userUuid: String!
  convoUuid: String!
  status: String
  createdAt: String
  updatedAt: String
  user(query: JSON, params: JSON, key: JSON): User!
  receipts(query: JSON, params: JSON, key: JSON): [MessageReceipt!]
}
 
type Convo {
  uuid: String
  title: String
  createdAt: String
  messages(query: JSON, params: JSON, key: JSON): [Message!]
  groups(query: JSON, params: JSON, key: JSON): [ConvoGroup!]
  receipts(query: JSON, params: JSON, key: JSON): [MessageReceipt]
}
 
type MessageReceipt {
  uuid: String
  authorUuid: String!
  recipientUuid: String!
  messageUuid: String!
  convoUuid: String!
  groupUuid: String!
  seen: Boolean
  createdAt: String
  author(query: JSON, params: JSON, key: JSON): User!
  recipient(query: JSON, params: JSON, key: JSON): User!
  message(query: JSON, params: JSON, key: JSON): Message!
  convo(query: JSON, params: JSON, key: JSON): Convo!
  group(query: JSON, params: JSON, key: JSON): ConvoGroup!
}
 
type Message {
  uuid: String
  authorUuid: String!
  convoUuid: String!
  body: String!
  oneOf: String
  createdAt: String
  author(query: JSON, params: JSON, key: JSON): User!
  convo(query: JSON, params: JSON, key: JSON): Convo!
}
 
type Relationship {
  uuid: String
  followerUuid: String!
  followeeUuid: String!
  createdAt: String
  follower(query: JSON, params: JSON, key: JSON): User!
  followee(query: JSON, params: JSON, key: JSON): User!
}
 
type User {
  uuid: String
  googleId: String
  facebookId: String
  email: String!
  password: String!
  permissions: String
  username: String
  avatar: String
  firstName: String
  lastName: String
  isVerified: Boolean
  verifyToken: String
  verifyShortToken: String
  verifyExpires: String
  verifyChanges: JSON
  resetToken: String
  resetShortToken: String
  resetExpires: String
  createdAt: String
  updatedAt: String
  groups(query: JSON, params: JSON, key: JSON): [ConvoGroup!]
  followers(query: JSON, params: JSON, key: JSON): [Relationship!]
  follows(query: JSON, params: JSON, key: JSON): [Relationship!]
}
 

type Query {
  getConvoGroup(key: JSON, query: JSON, params: JSON): ConvoGroup
  findConvoGroup(query: JSON, params: JSON): [ConvoGroup]!
  getConvo(key: JSON, query: JSON, params: JSON): Convo
  findConvo(query: JSON, params: JSON): [Convo]!
  getMessageReceipt(key: JSON, query: JSON, params: JSON): MessageReceipt
  findMessageReceipt(query: JSON, params: JSON): [MessageReceipt]!
  getMessage(key: JSON, query: JSON, params: JSON): Message
  findMessage(query: JSON, params: JSON): [Message]!
  getRelationship(key: JSON, query: JSON, params: JSON): Relationship
  findRelationship(query: JSON, params: JSON): [Relationship]!
  getUser(key: JSON, query: JSON, params: JSON): User
  findUser(query: JSON, params: JSON): [User]!
}
`

// !code: exports // !end
module.exports = moduleExports

// !code: funcs // !end
// !code: end // !end
