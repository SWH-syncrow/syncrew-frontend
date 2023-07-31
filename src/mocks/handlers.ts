import { rest } from "msw";

export const handlers = [
  rest.post("/api/auth/login", async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        user: {
          id: 1,
          name: "김지현",
          email: "test@gmail.com",
          profileImage: null,
          temp: 36.5,
        },
        token: {
          accessToken: "test",
          refreshToken: "test_rf",
        },
      })
    );
  }),
  rest.post("/api/auth/reissue", async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        accessToken: "test",
        refreshToken: "test_rf",
      })
    );
  }),
  rest.delete("/api/auth/logout", async (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get("/api/auth/user", async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        name: "김지현",
        email: "test@gmail.com",
        profileImage: null,
        temp: 36.5,
      })
    );
  }),
  rest.post("/api/group/:groupId/enter", async (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get("/api/groups", async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: [
          {
            id: 1,
            name: "스마트폰 활용 초급",
            category: "SMARTPHONE",
            memberCount: 5,
            postCount: 8,
          },
          {
            id: 2,
            name: "스마트폰 활용 중급",
            category: "SMARTPHONE",
            memberCount: 2,
            postCount: 3,
          },
          {
            id: 3,
            name: "스마트폰 활용 고급",
            category: "SMARTPHONE",
            memberCount: 2,
            postCount: 3,
          },
        ],
      })
    );
  }),
  rest.get("/api/groups/:groupId/posts", async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        name: "스마트폰 활용 초급",
        memberCount: 5,
        postCount: 8,
        posts: [
          {
            id: 3,
            title: "친구 구해요",
            content: "스마트폰 잘하는 사람",
            writer: {
              id: 2,
              username: "소미",
              profileImage: null,
              temp: 42.0,
            },
            rejectedUsers: [1],
          },
          {
            id: 2,
            title: "친구 구해요",
            content: "스마트폰 잘하는 사람",
            writer: {
              id: 3,
              username: "김그루",
              profileImage: null,
              temp: 42.0,
            },
            rejectedUsers: [0],
          },
        ],
      })
    );
  }),
  rest.post("/api/friend/request", async (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.post("/api/friend", async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 3,
        name: "김그루",
        email: "grew@gmail.com",
        profileImage: null,
        temp: 36.5,
      })
    );
  }),
  rest.get("/api/users/posts", async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: [
          {
            id: 1,
            title: "친구 구해요",
            content: "스마트폰 잘하는 사람",
            writer: {
              id: 2,
              username: "김지현",
              profileImage: null,
              temp: 42.0,
            },
            rejectedUsers: [1],
          },
          {
            id: 1,
            title: "친구 구해요",
            content: "스마트폰 잘하는 사람",
            writer: {
              id: 3,
              username: "김지현",
              profileImage: null,
              temp: 42.0,
            },
            rejectedUsers: [0],
          },
        ],
      })
    );
  }),
  rest.get("/api/users/groups", async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: [
          {
            id: 1,
            name: "스마트폰 활용 초급",
            category: "SMARTPHONE",
            memberCount: 5,
            postCount: 8,
          },
        ],
      })
    );
  }),
  rest.post("/api/posts", async (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.delete("/api/posts/:postId", async (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get("/api/notifications", async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: [
          {
            id: 1,
            friendRequestId: 1,
            friendName: "소미",
            status: "MATCHED",
            read: false,
          },
          {
            id: 2,
            friendRequestId: 2,
            friendName: "소미",
            status: "REQUESTED",
            read: false,
          },
          {
            id: 3,
            friendRequestId: 3,
            friendName: "소미",
            status: "RECEIVED",
            read: false,
          },
        ],
      })
    );
  }),
];
