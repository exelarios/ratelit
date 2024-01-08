/**
 * @generated SignedSource<<eb15e1487cbcabdfb765844fafbb0ee2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type AuthContextValidateSessionMutation$variables = Record<PropertyKey, never>;
export type AuthContextValidateSessionMutation$data = {
  readonly verifyToken: {
    readonly avatar: string;
    readonly createdAt: string;
    readonly email: string;
    readonly firstName: string;
    readonly id: string;
    readonly lastName: string;
    readonly name: string;
  };
};
export type AuthContextValidateSessionMutation = {
  response: AuthContextValidateSessionMutation$data;
  variables: AuthContextValidateSessionMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "verifyToken",
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
        "name": "avatar",
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
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "createdAt",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "lastName",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AuthContextValidateSessionMutation",
    "selections": (v0/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AuthContextValidateSessionMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "fa2b7aa8cb594c7f623e6bd935b036e9",
    "id": null,
    "metadata": {},
    "name": "AuthContextValidateSessionMutation",
    "operationKind": "mutation",
    "text": "mutation AuthContextValidateSessionMutation {\n  verifyToken {\n    firstName\n    avatar\n    email\n    id\n    name\n    createdAt\n    lastName\n  }\n}\n"
  }
};
})();

(node as any).hash = "461033a95c3464d0863a3484892707e8";

export default node;
