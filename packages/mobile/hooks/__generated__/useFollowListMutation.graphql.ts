/**
 * @generated SignedSource<<1183d58838148d6ac0a38f7b2bbd770c>>
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
    readonly role: string;
    readonly title: string;
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
  "name": "title",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isFollowing",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "role",
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
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/)
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
          (v3/*: any*/),
          (v4/*: any*/),
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
    "cacheID": "11599ed915fe45bf8aa67eead0ff517e",
    "id": null,
    "metadata": {},
    "name": "useFollowListMutation",
    "operationKind": "mutation",
    "text": "mutation useFollowListMutation(\n  $listId: ID!\n) {\n  FollowList(listId: $listId) {\n    title\n    isFollowing\n    role\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "2e6fc440fd80d9c87df930cc69821319";

export default node;
