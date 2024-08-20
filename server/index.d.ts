type Payload = {
  id: string;
  name: string;
  email: string;
};

declare global {
  namespace Express {
    export interface Request {
      user: Payload;
    }
  }
}

export {};
