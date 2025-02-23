import Bootleneck from "bottleneck";

const sessionQueues = new Map<string, Bootleneck>();

export const getSessionQueue = (token: string): Bootleneck | undefined => {
  if (!sessionQueues.has(token)) {
    sessionQueues.set(
      token,
      new Bootleneck({
        maxConcurrent: 1,
        minTime: 333,
      })
    );
  }

  return sessionQueues.get(token);
};

export const destroySessionQueue = (token: string) => {
  if (sessionQueues.has(token)) {
    sessionQueues.delete(token);
  }
};

export const clearSessioQueue = () => {
  sessionQueues.clear();
};
