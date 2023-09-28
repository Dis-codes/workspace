export default [
    {
        kind: "block",
        type: "controls_repeat_ext",
        inputs: {
            TIMES: {
                shadow: {
                    kind: "block",
                    type: "math_number",
                    fields: {
                        NUM: 10
                    }
                }
            }
        }
    },
    {
        kind: "block",
        type: "controls_whileUntil",
        inputs: {
            BOOL: {
                shadow: {
                    kind: "block",
                    type: "logic_boolean",
                    fields: {
                        BOOL: true
                    }
                }
            }
        }
    },
    {
        kind: "block",
        type: "controls_for",
        inputs: {
          FROM: {
            shadow: {
              type: "math_number",
              fields: {
                NUM: 1
              }
            }
          },
          TO: {
            shadow: {
              type: "math_number",
              fields: {
                NUM: 10
              }
            }
          },
          BY: {
            shadow: {
              type: "math_number",
              fields: {
                NUM: 1
              }
            }
          },
        }
      },
    {
        kind: "block",
        type: "controls_forEach"
    },
    {
        kind: "block",
        type: "controls_flow_statements"
    }
];
