export default [
    {
        kind: "block",
        type: "variables_floatingvariable",
        inputs: {
            NAME: {
                shadow: {
                    kind: "block",
                    type: "text",
                }
            },
            VALUE: {
                shadow: {
                    kind: "block",
                    type: "math_number",
                    fields: {
                        NUM: 0
                    }
                }
            }
        }
    },
    {
        kind: "block",
        type: "variables_variable",
        inputs: {
            NAME: {
                shadow: {
                    kind: "block",
                    type: "text",
                }
            },
            VALUE: {
                shadow: {
                    kind: "block",
                    type: "math_number",
                    fields: {
                        NUM: 0
                    }
                }
            }
        }
    },
    {
        kind: "block",
        type: "variables_get_variable"
    },
    {
        kind: "block",
        type: "variables_change_variable",
        inputs: {
            NAME: {
                shadow: {
                    kind: "block",
                    type: "text",
                }
            },
            VALUE: {
                shadow: {
                    kind: "block",
                    type: "math_number",
                    fields: {
                        NUM: 1
                    }
                }
            }
        }
    }
]

