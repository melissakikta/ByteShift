const resolvers = {
    Query: {
      tech: async (): Promise<null> => {
        return null;
      },
      matchups: async (_parent: any, { _id }: { _id: string }): Promise<null> => {
        console.log(_id);
        return null;
      },
    },
    Mutation: {
      createMatchup: async (_parent: any, args: any): Promise<null> => {
        console.log(args);
        return args;
      },
      createVote: async (_parent: any, { _id, techNum }: { _id: string, techNum: number}): Promise<null> => {
        console.log(_id, techNum);
        return null;
      },
    },
};

export default resolvers;