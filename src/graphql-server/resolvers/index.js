import "isomorphic-fetch"
import { filter } from 'lodash';

const baseURL = `http://127.0.0.1:3000`

const resolvers = {
  Query: {
    users: () => {
      return fetch(`${baseURL}/users`).then(res => res.json())
    },
    todos: () => {
      return fetch(`${baseURL}/todos`).then(res => res.json())
    },
    userById: (parent, args) => {
      const { id } = args;
      return fetch(`${baseURL}/users/${id}`).then(res => res.json())
    },
    completed: () => {
      return fetch(`${baseURL}/todos`)
      .then(res => {
        return res.json()
      })
      .then((results) => {
        console.log(results)
        const filteredResults = filter(results, { completed: true});
        return filteredResults; 
      })
    },
  },
}

export default resolvers;
