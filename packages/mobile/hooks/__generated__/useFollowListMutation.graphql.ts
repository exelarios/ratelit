/**
 * @generated SignedSource<<af9d015d490646fbba5e5235022d1dcd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type useFollowListMutation$variables = {
  listId: string;
};
export type useFollowListMutation$data = {
  readonly FollowList: {
    readonly isFollowing: boolean;
  };
};
export type useFollowListMutation = {
  response: useFollowListMutation$data;
  variables: useFollowListMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "listId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "listId",
    "variableName": "listId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isFollowing",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useFollowListMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "List",
        "kind": "LinkedField",
        "name": "FollowList",
        "plural": false,
        "selections": [
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useFollowListMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "List",
        "kind": "LinkedField",
        "name": "FollowList",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "1c9c1f41e11c9f4bb7b6b1b881f6179a",
    "id": null,
    "metadata": {},
    "name": "useFollowListMutation",
    "operationKind": "mutation",
    "text": "mutation useFollowListMutation(\n  $listId: ID!\n) {\n  FollowList(listId: $listId) {\n    isFollowing\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "407a3de1dae95f920e823d0aa2ae6c8a";

export default node;
