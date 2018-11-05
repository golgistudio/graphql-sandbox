import "isomorphic-fetch"

const baseURL = `http://127.0.0.1:3000`

const resolvers = {
  Query: {
    users: () => {
      return fetch(`${baseURL}/users`).then(res => res.json())
    },
    todos: () => {
      return fetch(`${baseURL}/todos`).then(res => res.json())
    },
    // comments: (parent, args) => {
    //   const { id } = args
    //   return fetch(`${baseURL}/comments/${id}`)
    //   .then(res => res.json());
    // },
  },
}

export default resolvers;
