import logic from "./logic";
import loops from "./Loops";
import math from "./Math";
import text from "./Text";
import lists from "./Lists";
import colour from "./Colors";
import variables from "./Variables";

import coretest from "./coretest";

export default [
    {
        id: "coretest",
        kind: "category",
        name: "Core Test",
        colour: "#5b80a5",
        contents: coretest
    },
   { 
    id: "javascript",
    kind: "category",
    name: "JavaScript",
    colour: "#5b80a5",
    expanded: "true",
    contents: [

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
        colour: "%{BKY_COLOUR_HUE}",
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
        custom: "PROCEDURE"
    },
    {
        id: "database",
        kind: "category",
        name: "Database",
        colour: "#995ba5",
    },
    {
        id: "other",
        kind: "category",
        name: "Other",
        colour: "#a55b80",
        contents: [
            {
                id: "objects",
                kind: "category",
                name: "Objects",
                colour: "#a55b80",
                contents: []
            },
            {
                id: "time",
                kind: "category",
                name: "Time",
                colour: "#a55b80",
                contents: []
            },
            {
                id: "terminal",
                kind: "category",
                name: "Terminal",
                colour: "#a55b80",
                contents: []
            },
        ]
    },
    {
        id: "websites",
        kind: "category",
        name: "Websites",
        colour: "#a55b80",
        contents: [
            {
                id: "requests",
                kind: "category",
                name: "Requests",
                colour: "#a55b80",
                contents: []
            },
        ]
    },
    {
        id: "files",
        kind: "category",
        name: "Files",
        colour: "#a55b80",
        contents: [
            {
                id: "text",
                kind: "category",
                name: "Text",
                colour: "#a55b80",
                contents: []
            },
            {
                id: "data",
                kind: "category",
                name: "data",
                colour: "#a55b80",
                contents: []
            },
            {
                id: "images",
                kind: "category",
                name: "Images",
                colour: "#a55b80",
                contents: []
            },
        ]
    },
    ]},


    {
        id: "separator",
        kind: "sep"
    },
    {
        id: "discord",
        kind: "category",
        name: "Discord.JS",
        expanded: "true",
        colour: "#5b80a5",
        contents: [
            {
                id: "base",
                kind: "category",
                name: "Base",
                colour: "#a55b80",
                contents: []
            },
            {
                id: "messages",
                kind: "category",
                name: "Messages",
                colour: "#a55b80",
                contents: [
                    {
                        id: "getmessages",
                        kind: "category",
                        name: "Get Message",
                        colour: "#a55b80",
                        contents: []
                    },
                    {
                        id: "setmessages",
                        kind: "category",
                        name: "Set Message",
                        colour: "#a55b80",
                        contents: []
                    },
                    {
                        id: "threads",
                        kind: "category",
                        name: "Threads",
                        colour: "#a55b80",
                        contents: []
                    },
                    {
                        id: "webhooks",
                        kind: "category",
                        name: "Webhooks",
                        colour: "#a55b80",
                        contents: []
                    },
                    {
                        id: "reactions",
                        kind: "category",
                        name: "Reactions",
                        colour: "#a55b80",
                        contents: []
                    },
                ]
            },
            {
                id: "separator",
                kind: "sep"
            },
            {
                id: "embeds",
                kind: "category",
                name: "Embeds",
                colour: "#a55b80",
                contents: []
            },
            {
                id: "interactions",
                kind: "category",
                name: "Interactions",
                colour: "#a55b80",
                contents: [
                    {
                        id: "slash",
                        kind: "category",
                        name: "Slash",
                        colour: "#a55b80",
                        contents: []
                    },
                    {
                        id: "buttons",
                        kind: "category",
                        name: "Buttons",
                        colour: "#a55b80",
                        contents: []
                    },
                    {
                        id: "menus",
                        kind: "category",
                        name: "Menus",
                        colour: "#a55b80",
                        contents: []
                    },
                    {
                        id: "forms",
                        kind: "category",
                        name: "Forms",
                        colour: "#a55b80",
                        contents: []
                    },
                ]
            },
            {
                id: "separator",
                kind: "sep"
            },
            {
                id: "servers",
                kind: "category",
                name: "Servers",
                colour: "#a55b80",
                contents: [
                    {
                        id: "server",
                        kind: "category",
                        name: "Server",
                        colour: "#a55b80",
                        contents: []
                    },
                    {
                        id: "channels",
                        kind: "category",
                        name: "Channels",
                        colour: "#a55b80",
                        contents: [
                            {
                                id: "text",
                                kind: "category",
                                name: "Text",
                                colour: "#a55b80",
                                contents: []
                            },
                            {
                                id: "voice",
                                kind: "category",
                                name: "Voice",
                                colour: "#a55b80",
                                contents: []
                            },
                        ]
                    },
                    {
                        id: "roles",
                        kind: "category",
                        name: "Roles",
                        colour: "#a55b80",
                        contents: []
                    },
                    {
                        id: "members",
                        kind: "category",
                        name: "Members",
                        colour: "#a55b80",
                        contents: []
                    },
                    {
                        id: "emojis",
                        kind: "category",
                        name: "Emojis",
                        colour: "#a55b80",
                        contents: []
                    },
                    {
                        id: "stickers",
                        kind: "category",
                        name: "Stickers",
                        colour: "#a55b80",
                        contents: []
                    },
                    {
                        id: "joins",
                        kind: "category",
                        name: "Joins",
                        colour: "#a55b80",
                        contents: [
                            {
                                id: "userjoins",
                                kind: "category",
                                name: "User Joins",
                                colour: "#a55b80",
                                contents: []
                            },
                            {
                                id: "userjoins",
                                kind: "category",
                                name: "User Leaves",
                                colour: "#a55b80",
                                contents: []
                            },
                            {
                                id: "invites",
                                kind: "category",
                                name: "Invites",
                                colour: "#a55b80",
                                contents: []
                            },
                        ]
                    },
                ]
            },
            {
                id: "users",
                kind: "category",
                name: "Users",
                colour: "#a55b80",
                contents: []
            },
            
            
        ]},
    {
        id: "other",
        kind: "category",
        name: "Other",
        colour: "#5b80a5",
        contents: [
        ]},
        {
        id: "custom",
        kind: "category",
        name: "Custom",
        colour: "#5b80a5",
        contents: [
        ]}
]
