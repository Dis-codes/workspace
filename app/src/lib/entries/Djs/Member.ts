export default [
  {
    kind: "block",
    type: "member_get_member_by_id",
    inputs: {
      ID: {
        shadow: {
          kind: "block",
          type: "text",
          fields: {
            TEXT: "id",
          },
        },
      },
    },
  },
  {
    kind: "block",
    type: "member_get_member_by_name",
    inputs: {
      NAME: {
        shadow: {
          kind: "block",
          type: "text",
          fields: {
            TEXT: "name",
          },
        },
      },
    },
  },
  {
    kind: "block",
    type: "member_get_members_by_role",
    inputs: {
      ROLE: {
        shadow: {
          kind: "block",
          type: "text",
          fields: {
            TEXT: "role",
          },
        },
      },
    },
  },
  {
    kind: "block",
    type: "member_id_of_member",
    inputs: {
      MEMBER: {
        shadow: {
          kind: "block",
          type: "text",
          fields: {
            TEXT: "member",
          },
        },
      },
    },
  },
  {
    kind: "block",
    type: "member_username_of_member",
    inputs: {
      MEMBER: {
        shadow: {
          kind: "block",
          type: "text",
          fields: {
            TEXT: "member",
          },
        },
      },
    },
  },
  {
    kind: "block",
    type: "member_presence_of_member",
    inputs: {
      MEMBER: {
        shadow: {
          kind: "block",
          type: "text",
          fields: {
            TEXT: "member",
          },
        },
      },
    },
  }
]