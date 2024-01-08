/**
 * @generated SignedSource<<2fb81354b7d3c017bed0ef484b21fef2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type AuthContextRefreshTokenMutation$variables = {
  token: string;
};
export type AuthContextRefreshTokenMutation$data = {
  readonly refreshToken: {
    readonly access: string;
    readonly refresh: string;
  };
};
export type AuthContextRefreshTokenMutation = {
  response: AuthContextRefreshTokenMutation$data;
  variables: AuthContextRefreshTokenMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "token"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "token",
        "variableName": "token"
      }
    ],
    "concreteType": "Tokens",
    "kind": "LinkedField",
    "name": "refreshToken",
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
    "name": "AuthContextRefreshTokenMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AuthContextRefreshTokenMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "5e90525ce0245ed7b7ddc155b7675b0f",
    "id": null,
    "metadata": {},
    "name": "AuthContextRefreshTokenMutation",
    "operationKind": "mutation",
    "text": "mutation AuthContextRefreshTokenMutation(\n  $token: String!\n) {\n  refreshToken(token: $token) {\n    access\n    refresh\n  }\n}\n"
  }
};
})();

(node as any).hash = "6f3bb5690015d36496dbc49074845eb3";

export default node;
