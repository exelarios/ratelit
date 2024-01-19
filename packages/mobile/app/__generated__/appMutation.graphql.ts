/**
 * @generated SignedSource<<989a4b3457b1e3f92f8774f2de78e777>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type LoginInput = {
  email: string;
  password: string;
};
export type appMutation$variables = {
  input: LoginInput;
};
export type appMutation$data = {
  readonly login: {
    readonly access: string;
    readonly refresh: string;
    readonly user: {
      readonly avatar: string;
      readonly email: string;
      readonly firstName: string;
      readonly id: string;
      readonly lastName: string;
    };
  };
};
export type appMutation = {
  response: appMutation$data;
  variables: appMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "LoginPayload",
    "kind": "LinkedField",
    "name": "login",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "access",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "refresh",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "firstName",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "lastName",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "email",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "avatar",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "appMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "appMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "cbf51a5c8c9f7daaede826322793469b",
    "id": null,
    "metadata": {},
    "name": "appMutation",
    "operationKind": "mutation",
    "text": "mutation appMutation(\n  $input: LoginInput!\n) {\n  login(input: $input) {\n    access\n    refresh\n    user {\n      firstName\n      lastName\n      email\n      id\n      avatar\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "cc53c3c689e78aaf300cddb199cf2309";

export default node;
