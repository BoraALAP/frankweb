const Mutation = {
  async createUser(parent, args, ctx, info) {
    console.log(args);

    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          pets: { set: args.pets },
          posts: args.posts
        }
      },
      info
    );
    return user;
  },

  async createPost(parent, args, ctx, info) {
    const post = await ctx.db.mutation.createPost(
      {
        data: { ...args }
      },
      info
    );
    console.log(args, post);

    return post;
  }
};

module.exports = Mutation;
