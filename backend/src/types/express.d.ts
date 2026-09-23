declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        role: "artist" | "manager";
      };
    }
  }
}

export {};
