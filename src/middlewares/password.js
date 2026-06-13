import validate from "./validate";

export const isSafe = (password) => {
    return password.length >= 6;
};

