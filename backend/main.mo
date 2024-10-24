import Int "mo:base/Int";
import Text "mo:base/Text";

import Time "mo:base/Time";
import Array "mo:base/Array";
import List "mo:base/List";

actor {
  type Post = {
    title: Text;
    body: Text;
    author: Text;
    timestamp: Int;
    tags: [Text];
  };

  stable var posts : List.List<Post> = List.nil();

  public func createPost(title: Text, body: Text, author: Text, tags: [Text]) : async () {
    let newPost : Post = {
      title = title;
      body = body;
      author = author;
      timestamp = Time.now();
      tags = tags;
    };
    posts := List.push(newPost, posts);
  };

  public query func getPosts() : async [Post] {
    List.toArray(posts)
  };
}
