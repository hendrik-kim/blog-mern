import postsReducer, { postAdded } from "../slices/postSlice";

describe("postsReducer", () => {
  const initialState = [];

  it("should handle initial state", () => {
    expect(postsReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it("should handle postAdded", () => {
    const title = "Test Post";
    const content = "Test content";
    const postVisibility = "public";

    const action = postAdded({
      title,
      content,
      postVisibility,
    });
    const result = postsReducer(initialState, action);

    expect(result.length).toBe(1);
    // FIXME: In the postAdded return value below,
    // title and others are passed as objects wrapped inside title. Should be enhanced.
    expect(result[0].title.title).toEqual(title);
    expect(result[0].title.content).toEqual(content);
    expect(result[0].title.postVisibility).toEqual(postVisibility);
    expect(result[0]).toHaveProperty("timestamp");
    expect(result[0]).toHaveProperty("postId");
  });
});
