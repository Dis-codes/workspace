export default [
    {
        kind: "block",
        type: "text"
    },
    {
        kind: "block",
        type: "text_join"
    },
    {
        kind: "block",
        type: "text_length",
        inputs: {
            VALUE: {
                shadow: {
                    type: "text",
                    fields: {
                        TEXT: "Hello!"
                    }
                }
            }
        }
    },
    {
        kind: "block",
        type: "text_isEmpty",
        inputs: {
            VALUE: {
                shadow: {
                    type: "text",
                    fields: {
                        TEXT: ""
                    }
                }
            }
        }
    },
    {
        kind: "block",
        type: "text_indexOf",
        inputs: {
            VALUE: {
                shadow: {
                    type: "text",
                    fields: {
                        TEXT: "Hello!"
                    }
                }
            },
            FIND: {
                shadow: {
                    type: "text",
                    fields: {
                        TEXT: "e"
                    }
                }
            }
        }
    },
    {
        kind: "block",
        type: "text_startsEndsWith",
        inputs: {
            TEXT: {
                shadow: {
                    type: "text",
                    fields: {
                        TEXT: "Hello!"
                    }
                }
            },
            OTHERTEXT: {
                shadow: {
                    type: "text",
                    fields: {
                        TEXT: "H"
                    }
                }
            }
        }
    },
    {
        kind: "block",
        type: "text_charAt"
    },
    {
        kind: "block",
        type: "text_getSubstring"
    },
    {
        kind: "block",
        type: "text_changeCase"
    },
    {
        kind: "block",
        type: "text_trim"
    },
    {
        kind: "block",
        type: "text_append"
    }
];
