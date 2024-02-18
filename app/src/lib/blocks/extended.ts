export default {
    category: {
        "discord.js": {
          name: "Discord.JS",
	    	colour: "#5b80a5",
	    	expanded: false
        },
        "javascript": {
		    name: "JavaScript",
	    	colour: "#5b80a5",
		    expanded: true
        },
        "other": {
            name: "Others",
            colour: "#bc4c94",
            expanded: false
        },
        "servers":{
            name: "Servers",
		    colour: "#e05c4c",
		    expanded: false
        },
        "Files":{
            name: "Files",
            colour: "#ffac2c",
            expanded: false
        }
    },
    logic: [
        {
            kind: "block",
            type: "controls_if"
        },
        {
            kind: "block",
            type: "logic_compare"
        },
        {
            kind: "block",
            type: "logic_operation"
        },
        {
            kind: "block",
            type: "logic_negate"
        },
        {
            kind: "block",
            type: "logic_boolean"
        },
        {
            kind: "block",
            type: "logic_null"
        },
        {
            kind: "block",
            type: "logic_ternary"
        },
    ],
    loops: [
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
                }
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
    ],
    math: [
        {
            kind: "block",
            type: "math_number"
        },
        {
            kind: "block",
            type: "math_arithmetic",
            inputs: {
                A: {
                    shadow: {
                        kind: "block",
                        type: "math_number",
                        fields: {
                            NUM: 1
                        }
                    }
                },
                B: {
                    shadow: {
                        kind: "block",
                        type: "math_number",
                        fields: {
                            NUM: 1
                        }
                    }
                }
            }
        },
        {
            kind: "block",
            type: "math_single",
            inputs: {
                NUM: {
                    shadow: {
                        kind: "block",
                        type: "math_number",
                        fields: {
                            NUM: 9
                        }
                    }
                }
            }
        },
        {
            kind: "block",
            type: "math_trig",
            inputs: {
                NUM: {
                    shadow: {
                        kind: "block",
                        type: "math_number",
                        fields: {
                            NUM: 45
                        }
                    }
                }
            }
        },
        {
            kind: "block",
            type: "math_constant"
        },
        {
            kind: "block",
            type: "math_number_property",
            inputs: {
                NUMBER_TO_CHECK: {
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
            type: "math_round",
            inputs: {
                NUM: {
                    shadow: {
                        kind: "block",
                        type: "math_number",
                        fields: {
                            NUM: 3.1
                        }
                    }
                }
            }
        },
        {
            kind: "block",
            type: "math_on_list"
        },
        {
            kind: "block",
            type: "math_modulo",
            inputs: {
                DIVIDEND: {
                    shadow: {
                        kind: "block",
                        type: "math_number",
                        fields: {
                            NUM: 64
                        }
                    }
                },
                DIVISOR: {
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
            type: "math_constrain",
            inputs: {
                VALUE: {
                    shadow: {
                        kind: "block",
                        type: "math_number",
                        fields: {
                            NUM: 50
                        }
                    }
                },
                LOW: {
                    shadow: {
                        kind: "block",
                        type: "math_number",
                        fields: {
                            NUM: 1
                        }
                    }
                },
                HIGH: {
                    shadow: {
                        kind: "block",
                        type: "math_number",
                        fields: {
                            NUM: 100
                        }
                    }
                }
            }
        },
        {
            kind: "block",
            type: "math_random_int",
            inputs: {
                FROM: {
                    shadow: {
                        kind: "block",
                        type: "math_number",
                        fields: {
                            NUM: 1
                        }
                    }
                },
                TO: {
                    shadow: {
                        kind: "block",
                        type: "math_number",
                        fields: {
                            NUM: 100
                        }
                    }
                }
            }
        },
        {
            kind: "block",
            type: "math_random_float"
        },
    ],
    text: [
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
            type: "text_replace",
            inputs: {
                TEXT: {
                    shadow: {
                        type: "text",
                        fields: {
                            TEXT: "Hello World!"
                        }
                    }
                },
                FROM: {
                    shadow: {
                        type: "text",
                        fields: {
                            TEXT: "World"
                        }
                    }
                },
                TO: {
                    shadow: {
                        type: "text",
                        fields: {
                            TEXT: "Goodbye"
                        }
                    }
                }
            }
        },
        {
            kind: "block",
            type: "text_isEmpty"
        },
        {
            kind: "block",
            type: "text_reverse"
        },
        {
            kind: "block",
            type: "text_append"
        },
        {
            kind: "block",
            type: "text_length",
            inputs: {
                VALUE: {
                    shadow: {
                        type: "text",
                        fields: {
                            TEXT: "abc"
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
                    block: {
                        kind: "block",
                        type: "variables_get_variable",
                        fields: {
                            NAME: "text"
                        }
                    }
                },
                FIND: {
                    shadow: {
                        type: "text",
                        fields: {
                            TEXT: "World"
                        }
                    }
                }
            }
        },
        {
            kind: "block",
            type: "text_charAt",
            inputs: {
                VALUE: {
                    block: {
                        kind: "block",
                        type: "variables_get_variable",
                        fields: {
                            NAME: "text"
                        }
                    }
                },
                AT: {
                    shadow: {
                        type: "math_number",
                        fields: {
                            NUM: 1
                        }
                    }
                }
            }
        },
        {
            kind: "block",
            type: "text_getSubstring",
            inputs: {
                STRING: {
                    block: {
                        kind: "block",
                        type: "variables_get_variable",
                        fields: {
                            NAME: "text"
                        }
                    }
                },
                AT1: {
                    shadow: {
                        type: "math_number",
                        fields: {
                            NUM: 1
                        }
                    }
                },
                AT2: {
                    shadow: {
                        type: "math_number",
                        fields: {
                            NUM: 5
                        }
                    }
                }
            }
        },
        {
            kind: "block",
            type: "text_changeCase",
            inputs: {
                TEXT: {
                    shadow: {
                        type: "text",
                        fields: {
                            TEXT: "Hello World!"
                        }
                    }
                }
            }
        },
        {
            kind: "block",
            type: "text_trim",
            inputs: {
                TEXT: {
                    shadow: {
                        type: "text",
                        fields: {
                            TEXT: " abc "
                        }
                    }
                }
            }
        },
        {
            kind: "block",
            type: "text_count",
            inputs: {
                TEXT: {
                    shadow: {
                        type: "text",
                        fields: {
                            TEXT: "Hello World!"
                        }
                    }
                },
                SUB: {
                    shadow: {
                        type: "text",
                        fields: {
                            TEXT: "o"
                        }
                    }
                }
            }
        },
    ],
    lists: [
        {
            kind: "block",
            type: "lists_create_empty"
        },
        {
            kind: "block",
            type: "lists_create_with"
        },
        {
            kind: "block",
            type: "lists_repeat",
            inputs: {
                NUM: {
                    shadow: {
                        kind: "block",
                        type: "math_number",
                        fields: {
                            NUM: 5
                        }
                    }
                }
            }
        },
        {
            kind: "block",
            type: "lists_length"
        },
        {
            kind: "block",
            type: "lists_isEmpty"
        },
        {
            kind: "block",
            type: "lists_sort"
        },
        {
            kind: "block",
            type: "lists_reverse"
        },
        {
            kind: "block",
            type: "lists_indexOf",
            inputs: {
                VALUE: {
                    shadow: {
                        kind: "block",
                        type: "variables_get_variable",
                        fields: {
                            NAME: "list"
                        }
                    }
                },
                FIND: {
                    shadow: {
                        kind: "block",
                        type: "text",
                        fields: {
                            TEXT: "abc"
                        }
                    }
                }
            }
        },
        {
            kind: "block",
            type: "lists_getIndex",
            inputs: {
                VALUE: {
                    shadow: {
                        kind: "block",
                        type: "variables_get_variable",
                        fields: {
                            NAME: "list"
                        }
                    }
                },
                AT: {
                    shadow: {
                        kind: "block",
                        type: "math_number",
                        fields: {
                            NUM: 1
                        }
                    }
                }
            }
        },
        {
            kind: "block",
            type: "lists_setIndex",
            inputs: {
                LIST: {
                    shadow: {
                        kind: "block",
                        type: "variables_get_variable",
                        fields: {
                            NAME: "list"
                        }
                    }
                },
                AT: {
                    shadow: {
                        kind: "block",
                        type: "math_number",
                        fields: {
                            NUM: 1
                        }
                    }
                }
            }
        },
        {
            kind: "block",
            type: "lists_getSublist",
            inputs: {
                LIST: {
                    shadow: {
                        kind: "block",
                        type: "variables_get_variable",
                        fields: {
                            NAME: "list"
                        }
                    }
                },
                AT1: {
                    shadow: {
                        kind: "block",
                        type: "math_number",
                        fields: {
                            NUM: 1
                        }
                    }
                },
                AT2: {
                    shadow: {
                        kind: "block",
                        type: "math_number",
                        fields: {
                            NUM: 2
                        }
                    }
                }
            }
        },
    
        {
            kind: "block",
            type: "lists_split",
            inputs: {
                DELIM: {
                    shadow: {
                        kind: "block",
                        type: "text",
                        fields: {
                            TEXT: ","
                        }
                    }
                }
            }
        },
    ],
    colour: [
        {
            kind: "block",
            type: "colour_picker"
        },
        {
            kind: "block",
            type: "colour_blend",
            inputs: {
                COLOUR1: {
                    shadow: {
                        kind: "block",
                        type: "colour_picker"
                    }
                },
                COLOUR2: {
                    shadow: {
                        kind: "block",
                        type: "colour_picker",
                        fields: {
                            COLOUR: "#333333"
                        }
                    }
                },
                RATIO: {
                    shadow: {
                        kind: "block",
                        type: "math_number",
                        fields: {
                            NUM: 0.5
                        }
                    }
                }
            }
        }
    ],

}