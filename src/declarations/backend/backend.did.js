export const idlFactory = ({ IDL }) => {
  const Post = IDL.Record({
    'title' : IDL.Text,
    'body' : IDL.Text,
    'tags' : IDL.Vec(IDL.Text),
    'author' : IDL.Text,
    'timestamp' : IDL.Int,
  });
  return IDL.Service({
    'createPost' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Vec(IDL.Text)],
        [],
        [],
      ),
    'getPosts' : IDL.Func([], [IDL.Vec(Post)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
