export default
[
    {
        kind: "label",
        text: "Create a new database (MANDATORY)"
    },
    {
        kind: "block",
        type: "database_create_new",
        inputs: {
            NAME: {
                shadow: {
                    kind: "block",
                    type: "text",
                    fields: {
                        TEXT: "database"
                    }
                }
            }
        }
    },
    {
        kind: "label",
        text: "Read from a database"
    },
    {
        kind: "block",
        type: "database_get",
        inputs: {
            NAME: {
                shadow: {
                    kind: "block",
                    type: "text",
                    fields: {
                        TEXT: "item"
                    }
                }
            },
            DATABASE: {
                shadow: {
                    kind: "block",
                    type: "text",
                    fields: {
                        TEXT: "database"
                    }
                }
            }
        }
    },
    {
        kind: "block",
        type: "database_exists",
        inputs: {
            NAME: {
                shadow: {
                    kind: "block",
                    type: "text",
                    fields: {
                        TEXT: "item"
                    }
                }
            },
            DATABASE: {
                shadow: {
                    kind: "block",
                    type: "text",
                    fields: {
                        TEXT: "database"
                    }
                }
            }
        }
    },
    {
        kind: "block",
        type: "database_all",
        inputs: {
            DATABASE: {
                shadow: {
                    kind: "block",
                    type: "text",
                    fields: {
                        TEXT: "database"
                    }
                }
            }
        }
    },
    {
        kind: "label",
        text: "Update a database"
    },
    {
        kind: "block",
        type: "database_set",
        inputs: {
            NAME: {
                shadow: {
                    kind: "block",
                    type: "text",
                    fields: {
                        TEXT: "foo"
                    }
                }
            },
            VALUE: {
                shadow: {
                    kind: "block",
                    type: "text",
                    fields: {
                        TEXT: "bar"
                    }
                }
            },
            DATABASE: {
                shadow: {
                    kind: "block",
                    type: "text",
                    fields: {
                        TEXT: "database"
                    }
                }
            }
        }
    },
    {
        kind: "block",
        type: "database_delete",
        inputs: {
            NAME: {
                shadow: {
                    kind: "block",
                    type: "text",
                    fields: {
                        TEXT: "foo"
                    }
                }
            },
            DATABASE: {
                shadow: {
                    kind: "block",
                    type: "text",
                    fields: {
                        TEXT: "database"
                    }
                }
            }
        }
    },
    {
        kind: "block",
        type: "database_push",
        inputs: {
            NAME: {
                shadow: {
                    kind: "block",
                    type: "text",
                    fields: {
                        TEXT: "foo"
                    }
                }
            },
            VALUE: {
                shadow: {
                    kind: "block",
                    type: "text",
                    fields: {
                        TEXT: "bar"
                    }
                }
            },
            DATABASE: {
                shadow: {
                    kind: "block",
                    type: "text",
                    fields: {
                        TEXT: "database"
                    }
                }
            }
        }
    },
    {
        kind: "block",
        type: "database_addsubstract",
        inputs: {
            VALUE: {
                shadow: {
                    kind: "block",
                    type: "math_number",
                    fields: {
                        NUM: 1
                    }
                }
            },
            NAME: {
                shadow: {
                    kind: "block",
                    type: "text",
                    fields: {
                        TEXT: "foo"
                    }
                }
            },
            DATABASE: {
                shadow: {
                    kind: "block",
                    type: "text",
                    fields: {
                        TEXT: "database"
                    }
                }
            }
        }
    },
    {
        kind: "block",
        type: "database_clear",
        inputs: {
            DATABASE: {
                shadow: {
                    kind: "block",
                    type: "text",
                    fields: {
                        TEXT: "database"
                    }
                }
            }
        }
    },

]