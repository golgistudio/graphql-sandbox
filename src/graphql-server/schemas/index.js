const typeDefs = `
type Query {
  users: [User]
  todos: [Todo]
  userById(id: ID): User
  completed: [Todo]
}

type Geo {
  lat: String
  lng: String
}

type Address {
  street: String
  suite: String
  city: String
  zipcode: String
  geo: Geo
}

type Company {
  name: String
  catchPhrase: String
  bs: String
}

type User {
  id: ID!,
  name: String
  username: String
  email: String
  address: Address
  phone: String
  website: String
  company: Company
}

type Todo {
  userId: ID!,
  id: ID!,
  title: String,
  completed: Boolean
}
`;

export default typeDefs;
