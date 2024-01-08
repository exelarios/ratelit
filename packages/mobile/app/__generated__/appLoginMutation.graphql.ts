/**
 * @generated SignedSource<<410037fd77f669813930aadd06ea6906>>
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
export type appLoginMutation$variables = {
  input: LoginInput;
};
export type appLoginMutation$data = {
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
export type appLoginMutation = {
  response: appLoginMutation$data;
  variables: appLoginMutation$variables;
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
    "name": "appLoginMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "appLoginMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "3b4f4556201bfffed3776051d113e31d",
    "id": null,
    "metadata": {},
    "name": "appLoginMutation",
    "operationKind": "mutation",
    "text": "mutation appLoginMutation(\n  $input: LoginInput!\n) {\n  login(input: $input) {\n    access\n    refresh\n    user {\n      firstName\n      lastName\n      email\n      id\n      avatar\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "14b641c0648084a48f21674fb8980e7f";

export default node;
