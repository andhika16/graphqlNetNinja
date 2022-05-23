const graphql = require("graphql");
const _ = require("lodash");
const Books = require("../models/Books");
const Authors = require("../models/Authors");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    Author: {
      type: AuthorType,
      resolve(parent, args) {
        // return _.find(authors, { id: parent.authorId });
        return Authors.findById(parent.authorId)
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    Age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return _.filter(books, { authorId: parent.id });
        return Books.find({authorId : parent.id});
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parents, args) {
        // return _.find(books, { id: args.id });
        return Books.findById(args.id)
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parents, args) {
        // return _.find(authors, { id: args.id });
        return Authors.findById(args.id)
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parents, args) {
        // return books;
        return Books.find({})
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parents, args) {
        // return authors;
        return Authors.find({})

      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString)  },
        Age: { type: new GraphQLNonNull(GraphQLInt)  }
      },
      resolve(parent, args) {
        let author = new Authors({
          name: args.name,
          Age: args.Age
        });
        return author.save();
      }
    },
    addBook : {
      type : BookType, 
        args : {
          name : {type : new GraphQLNonNull( GraphQLString )},
          genre : {type : new GraphQLNonNull( GraphQLString)},
          authorId : {type : new GraphQLNonNull(GraphQLID) }
        },
        resolve (parent,args) {
          let book = new Books({
            name : args.name,
            genre : args.genre,
            authorId : args.authorId
          });
          return book.save();
        }
      
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
