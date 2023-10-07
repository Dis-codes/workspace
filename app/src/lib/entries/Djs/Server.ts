export default [
    {
        kind: "label",
        text: "Server event"
    },
    {
        kind: "block",
        type: "server_event",
    },
    {
        kind: "block",
        type: "server_event_data",
    },
    {
        kind: "label",
        text: "Server info"
    },
    {
        kind: "block",
        type: "server_get",
        inputs: {
            INPUT: {
                shadow: {
                    kind: "block",
                    type: "text",
                    fields: {
                        TEXT: "0"
                    }
                }
            }
        }
    },
    {
        kind: "block",
        type: "server_data",
    },
    {
        kind: "label",
        text: "Server actions"
    },
    {
        kind: "block",
        type: "server_edit"
    },
    {
        kind: "block",
        type: "server_edit_options",
        inputs: {
            SETTING: {
                shadow: {
                    kind: "block",
                    type: "text",
                    fields: {
                        TEXT: "t/f"
                    }
                }
            }
        }
    },
    {
        kind: "block",
        type: "server_edit_options_util"
    },
    {
        kind: "block",
        type: "server_leave",
    }
]