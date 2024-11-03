import { Failed } from "./AlertUtil";

export const limitText = (text, limit) => {
    const words = text.split("");
    if (words.length > limit) {
        return words.slice(0, limit).join("") + "....";
    } else {
        return text;
    }
};

export const capitalizeFirstLetter = (data) => {
    if (typeof data !== "string") return data;
    return data
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

export const validateEmail = (str) => {
    const regex = /^[\w.-]+@[\w.-]+\.\w+$/;
    return regex.test(str);
};

export const validateFile = (files, type) => {
    const maxSize = 1 * 1024 * 1024;
    if (!files[0]?.type.includes(type)) {
        return Failed(`The file format is ${type} only`);
    }

    if (files[0]?.size >= maxSize) return Failed("Maximum files is 1MB");

    return true;
};

export const formatDate = (isoDateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const date = new Date(isoDateString);
    return date.toLocaleDateString("en-US", options);
};
