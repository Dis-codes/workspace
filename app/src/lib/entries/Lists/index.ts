    export default [
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
        type: "lists_contains",
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
            ITEM: {
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
    {
        kind: "block",
        type: "lists_push",
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
            ITEM: {
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
        type: "lists_concat",
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
            ITEM: {
                shadow: {
                    kind: "block",
                    type: "variables_get_variable",
                    fields: {
                        NAME: "list2"
                    }
                }
            }
        }
    },
    {
        kind: "block",
        type: "lists_filter",
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
            ITEM: {
                shadow: {
                    kind: "block",
                    type: "variables_get_variable",
                    fields: {
                        NAME: "item"
                    }
                }
            },
            CONDITION: {
                shadow: {
                    kind: "block",
                    type: "logic_compare",
                    fields: {
                        OP: "GT"
                    },
                    inputs: {
                        A: {
                            shadow: {
                                kind: "block",
                                type: "variables_get_variable",
                                fields: {
                                    NAME: "item"
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


                }
            }
        }
    },
    {
        kind: "block",
        type: "lists_map",
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
            ITEM: {
                shadow: {
                    kind: "block",
                    type: "variables_get_variable",
                    fields: {
                        NAME: "item"
                    }
                }
            },
            CONDITION: {
                shadow: {
                    kind: "block",
                    type: "math_arithmetic",
                    fields: {
                        OP: "ADD"
                    },
                    inputs: {
                        A: {
                            shadow: {
                                kind: "block",
                                type: "variables_get_variable",
                                fields: {
                                    NAME: "item"
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
                    
                }
            }
        }
    },

    
   
];
