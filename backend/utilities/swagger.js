// backend/utilities/swagger.js
import swaggerJsdoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Records RESTful API",
    version: "1.0.0",
    description:
      "Explore and test the Blog's RESTful API endpoints directly within this documentation.",
  },
  servers: [
    {
      url: "http://localhost:5001/api/",
      description: "Development Server",
    },
  ],
  components: {
    schemas: {
      Post: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "Unique identifier for the post",
          },
          user: {
            type: "string",
            description: "User ID of the post author",
          },
          title: {
            type: "string",
            description: "Title of the post",
          },
          imageUrl: {
            type: "string",
            description: "Image URL of the post",
          },
          category: {
            type: "string",
            description: "Category of the post",
          },
          content: {
            type: "string",
            description: "Content of the post",
          },
          comments: {
            type: "array",
            items: {
              type: "string",
              description: "Array of comment IDs",
            },
          },
          likes: {
            type: "array",
            items: {
              $ref: "#/components/schemas/Like",
            },
          },
          numComments: {
            type: "number",
            description: "Number of comments on the post",
          },
          numLikes: {
            type: "number",
            description: "Number of likes on the post",
          },
          numViews: {
            type: "number",
            description: "Number of views of the post",
          },
          isPublic: {
            type: "boolean",
            description: "Whether the post is public",
          },
        },
      },
      Like: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Name of the user who liked",
          },
          like: {
            type: "number",
            description: "Like count",
          },
        },
      },
      Comment: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "Unique identifier for the comment",
          },
          postId: {
            type: "string",
            description: "Post ID that the comment belongs to",
          },
          userId: {
            type: "string",
            description: "User ID of the comment author",
          },
          content: {
            type: "string",
            description: "Content of the comment",
          },
          likes: {
            type: "array",
            items: {
              type: "string",
              description: "Array of user IDs who liked the comment",
            },
          },
          replies: {
            type: "array",
            items: {
              type: "string",
              description: "Array of reply comment IDs",
            },
          },
        },
      },
      User: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "Unique identifier for the user",
          },
          username: {
            type: "string",
            description: "Username of the user",
          },
          email: {
            type: "string",
            description: "Email address of the user",
          },
          isAdmin: {
            type: "boolean",
            description: "Whether the user is an admin",
          },
        },
      },
      Category: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "Unique identifier for the category",
          },
          name: {
            type: "string",
            description: "Name of the category",
          },
          description: {
            type: "string",
            description: "Description of the category",
          },
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ["backend/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
