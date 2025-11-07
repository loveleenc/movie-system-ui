const getTimeInHHMM = (timestamp: string):string => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
            timeStyle: "short",
    })
}

const getDate = (timestamp: string):string => {
    return new Date(timestamp).toLocaleString("default", {
            day: "numeric",
            month: "long",
            year: "numeric",
    });
}

const assertNever = (value: never) => {
  throw new Error(`Unhandled member: ${JSON.stringify(value)}`);
};

export default {
    getTimeInHHMM,
    getDate,
    assertNever
}