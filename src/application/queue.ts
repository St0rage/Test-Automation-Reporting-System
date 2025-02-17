import Queue from "promise-queue";

const sessionQueues = new Map<string, Queue>();

export const getSessionQueue = (token: string): Queue | undefined => {
  if (!sessionQueues.has(token)) {
    sessionQueues.set(token, new Queue(1));
  }

  return sessionQueues.get(token);
};

export const setSessionQueue = (token: string) => {
  sessionQueues.set(token, new Queue(1));
};

export const destroySessionQueue = (token: string) => {
  if (sessionQueues.has(token)) {
    sessionQueues.delete(token);
  }
};

export const clearSessioQueue = () => {
  sessionQueues.clear();
};
