import logic from "./logic";
import loops from "./Loops";
import math from "./Math";
import text from "./Text";
import lists from "./Lists";
import colour from "./Colors";
import variables from "./Variables";
import functions from "./Functions";

// import coretest from "./coretest";

export default [
    {
        id: "logic",
        kind: "category",
        name: "Logic",
        colour: "#5b80a5",
        contents: logic
    },
    {
        id: "loops",
        kind: "category",
        name: "Loops",
        colour: "#5ba55b",
        contents: loops
    },
    {
        id: "math",
        kind: "category",
        name: "Math",
        colour: "#5b67a5",
        contents: math
    },
    {
        id: "text",
        kind: "category",
        name: "Text",
        colour: "#5ba58c",
        contents: text
    },
    {
        id: "lists",
        kind: "category",
        name: "Lists",
        colour: "#745ba5",
        contents: lists
    },
    {
        id: "color",
        kind: "category",
        name: "Color",
        colour: "#a55b80",
        contents: colour
    },
    {
        id: "variables",
        kind: "category",
        name: "Variables",
        colour: "#a55b80",
        contents: variables
    },
    {
        id: "functions",
        kind: "category",
        name: "Functions",
        colour: "#995ba5",
        contents: functions
    }
]
