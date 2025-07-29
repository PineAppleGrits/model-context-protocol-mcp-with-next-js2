import { createMcpHandler } from "@vercel/mcp-adapter";
import { z } from "zod";

const handler = createMcpHandler(
  async (server) => {
    server.tool(
      "echo",
      "description",
      {
        message: z.string(),
      },
      async ({ message }) => ({
        content: [{ type: "text", text: `Tool echo: ${message}` }],
      })
    );
    server.tool("get-transport", "description", {}, async () => ({
      content: [{ type: "text", text: `Tool get-transport` }],
    }));
    server.tool("get_time", "description", {}, async () => ({
      content: [{ type: "text", text: new Date().toISOString() }],
    }));
  },
  {
    capabilities: {
      tools: {
        echo: {
          description: "Echo a message",
        },
        getTransport: {
          description: "Get transport",
        },
        getTime: {
          description: "Get time",
        },
      },
    },
  },
  {
    basePath: "",
    verboseLogs: true,
    maxDuration: 60,
  }
);

export { handler as GET, handler as POST, handler as DELETE };
