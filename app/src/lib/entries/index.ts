import logic from "./logic";
import loops from "./Loops";
import math from "./Math";
import text from "./Text";
import lists from "./Lists";
import colour from "./Colors";
import variables from "./Variables";
import database from "./Database";
import objects from "./Others/Objects";
import time from "./Others/Time";
import terminal from "./Others/others";
import requests from "./Others/requests";
import base from "./Djs/Base";

import server from "./Djs/Server"

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
        colour: "#5aa48d",
        contents: database
    },
    {
        id: "other",
        kind: "category",
        name: "Other",
        colour: "#bc4c94",
        contents: [
            {
                id: "objects",
                kind: "category",
                name: "Objects",
                colour: "#bc4c94",
                contents: objects
            },
            {
                id: "time",
                kind: "category",
                name: "Time",
                colour: "#a4a464",
                contents: time
            },
            {
                id: "terminal",
                kind: "category",
                name: "Terminal",
                colour: "#d2437e",
                contents: terminal
            },
            {
                id: "requests",
                kind: "category",
                name: "API Requests",
                colour: "#4b9afb",
                contents: requests
            },
        ]
    },
    {
        id: "files",
        kind: "category",
        name: "Files",
        colour: "#ffac2c",
        contents: [
            {
                id: "text",
                kind: "category",
                name: "Text",
                colour: "#ffac2c",
                contents: []
            },
            {
                id: "data",
                kind: "category",
                name: "data",
                colour: "#ffac2c",
                contents: []
            },
            {
                id: "images",
                kind: "category",
                name: "Images",
                colour: "#ffac2c",
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
                colour: "#f5677f",
                contents: base
            },
            {
                id: "messages",
                kind: "category",
                name: "Messages",
                colour: "#509cfc",
                contents: [
                    {
                        id: "getmessages",
                        kind: "category",
                        name: "Get Message",
                        colour: "#509cfc",
                        contents: []
                    },
                    {
                        id: "setmessages",
                        kind: "category",
                        name: "Set Message",
                        colour: "#509cfc",
                        contents: []
                    },
                    {
                        id: "threads",
                        kind: "category",
                        name: "Threads",
                        colour: "#509cfc",
                        contents: []
                    },
                    {
                        id: "webhooks",
                        kind: "category",
                        name: "Webhooks",
                        colour: "#3c4cf0",
                        contents: []
                    },
                    {
                        id: "reactions",
                        kind: "category",
                        name: "Reactions",
                        colour: "#90644c",
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
                colour: "#40bc54",
                contents: []
            },
            {
                id: "interactions",
                kind: "category",
                name: "Interactions",
                colour: "#d054fc",
                contents: [
                    {
                        id: "slash",
                        kind: "category",
                        name: "Slash",
                        colour: "#d054fc",
                        contents: []
                    },
                    {
                        id: "buttons",
                        kind: "category",
                        name: "Buttons",
                        colour: "#d054fc",
                        contents: []
                    },
                    {
                        id: "menus",
                        kind: "category",
                        name: "Menus",
                        colour: "#d054fc",
                        contents: []
                    },
                    {
                        id: "forms",
                        kind: "category",
                        name: "Forms",
                        colour: "#d054fc",
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
                colour: "#e05c4c",
                contents: [
                    {
                        id: "server",
                        kind: "category",
                        name: "Server",
                        colour: "#e05c4c",
                        contents: server
                    },
                    {
                        id: "channels",
                        kind: "category",
                        name: "Channels",
                        colour: "#a85c7c",
                        contents: [
                            {
                                id: "text",
                                kind: "category",
                                name: "Text",
                                colour: "#a85c7c",
                                contents: []
                            },
                            {
                                id: "voice",
                                kind: "category",
                                name: "Voice",
                                colour: "#a85c7c",
                                contents: []
                            },
                        ]
                    },
                    {
                        id: "roles",
                        kind: "category",
                        name: "Roles",
                        colour: "#30b474",
                        contents: []
                    },
                    {
                        id: "members",
                        kind: "category",
                        name: "Members",
                        colour: "#187494",
                        contents: []
                    },
                    {
                        id: "emojis",
                        kind: "category",
                        name: "Emojis",
                        colour: "#187494",
                        contents: []
                    },
                    {
                        id: "stickers",
                        kind: "category",
                        name: "Stickers",
                        colour: "#187494",
                        contents: []
                    },
                    {
                        id: "joins",
                        kind: "category",
                        name: "Joins",
                        colour: "#60cc6c",
                        contents: [
                            {
                                id: "userjoins",
                                kind: "category",
                                name: "User Joins",
                                colour: "#60cc6c",
                                contents: []
                            },
                            {
                                id: "userjoins",
                                kind: "category",
                                name: "User Leaves",
                                colour: "#60cc6c",
                                contents: []
                            },
                            {
                                id: "invites",
                                kind: "category",
                                name: "Invites",
                                colour: "#60bcec",
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
                colour: "#60bcec",
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
