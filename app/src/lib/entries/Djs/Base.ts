export default [
    {
        kind: "block",
        type: "base_token",
        inputs: {
            TOKEN: {
                shadow: {
                    kind: "block",
                    type: "text",
                    fields: {
                        TEXT: "token"
                    }
                }
            },
        }
    },
    {
        kind: "block",
        type: "base_env",
        inputs: {
            NAME: {
                shadow: {
                    kind: "block",
                    type: "text",
                    fields: {
                        TEXT: "name"
                    }
                }
            },
        }
    },
    {
        kind: "block",
        type: "base_bot_connected",
    },
    {
        kind: "block",
        type: "base_bot_status",
        inputs: {
            MESSAGE: {
                shadow: {
                    kind: "block",
                    type: "text",
                    fields: {
                        TEXT: "message"
                    }
                }
            },
            NAME: {
                shadow: {
                    kind: "block",
                    type: "text",
                    fields: {
                        TEXT: "name"
                    }
                }
            },
        }
    },
    {
        kind: "block",
        type: "base_bot_as_member",
    },
    {
        kind: "block",
        type: "base_bot_in_server",
    },
    {
        kind: "block",
        type: "base_bot_info",
    }
]