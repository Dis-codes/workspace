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
    }
]