export default [
    {
        kind: "block",
        type: "requests_request",
        inputs: {
            URL: {
                shadow: {
                    kind: "block",
                    type: "text",
                    fields: {
                        TEXT: "https://example.com"
                    }
                }
            },
            BRANCH1: {
                block: {
                    kind: "block",
                    type: "requests_header",
                    inputs: {
                        NAME: {
                            shadow: {
                                kind: "block",
                                type: "text",
                                fields: {
                                    TEXT: "content-type"
                                }
                            }
                        },
                        VALUE: {
                            shadow: {
                                kind: "block",
                                type: "text",
                                fields: {
                                    TEXT: "application/json"
                                }
                            }
                        }
                    }
                }
            },
            BRANCH2: {
                block: {
                    kind: "block",
                    type: "requests_body",
                    inputs: {
                        BRANCH1: {
                            block: {
                                kind: "block",
                                type: "requests_body_data",
                                inputs: {
                                    NAME: {
                                        shadow: {
                                            kind: "block",
                                            type: "text",
                                            fields: {
                                                TEXT: "key"
                                            }
                                        }
                                    },
                                    VALUE: {
                                        shadow: {
                                            kind: "block",
                                            type: "text",
                                            fields: {
                                                TEXT: "value"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            BRANCH3: {
                block: {
                    kind: "block",
                    type: "terminal_log",
                    inputs: {
                        TEXT: {
                            block: {
                                kind: "block",
                                type: "requests_all",
                            },
                        },
                        },
                    },
            },
            BRANCH4: {
                block: {
                    kind: "block",
                    type: "terminal_log",
                    inputs: {
                        TEXT: {
                            block: {
                                kind: "block",
                                type: "terminal_error",
                            },
                        },
                        },
                    },
            }
        }
    },
    {
        kind: "block",
        type: "requests_header",
    },
    {
        kind: "block",
        type: "requests_body",
    },
    {
        kind: "block",
        type: "requests_body_data",
    },
    {
        kind: "block",
        type: "requests_response",
    },
    {
        kind: "block",
        type: "requests_response_status",
    },
    {
        kind: "block",
        type: "requests_all",
    }
]