export default [
  {
    kind: "label",
    text: "Role info"
  },
  {
    kind: "block",
    type: "role_get",
    inputs: {
      ID: {
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
    type: "role_get_all"
  },
  {
    kind: "block",
    type: "role_get_all_value"
  },
  {
    kind: "block",
    type: "role_member_has"
  },
  {
    kind: "block",
    type: "role_property"
  },
  {
    kind: "block",
    type: "role_is"
  },
  {
    kind: "label",
    text: "Role actions"
  },
  {
    kind: "block",
    type: "role_create",
    inputs: {
      NAME: {
        shadow: {
          kind: "block",
          type: "text",
          fields: {
            TEXT: "New Role"
          }
        }
      },
      COLOR: {
        shadow: {
          kind: "block",
          type: "text",
          fields: {
            TEXT: "#88F"
          }
        }
      },
      REASON: {
        shadow: {
          kind: "block",
          type: "text",
          fields: {
            TEXT: "Creation reason"
          }
        }
      }
    }
  },
  {
    kind: "block",
    type: "role_created"
  },
  {
    kind: "block",
    type: "role_delete"
  }
];
