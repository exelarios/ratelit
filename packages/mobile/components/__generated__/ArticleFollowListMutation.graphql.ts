/**
 * @generated SignedSource<<192f21ecbe8b2b06d0dd39928a39a0a9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ArticleFollowListMutation$variables = {
  listId: string;
};
export type ArticleFollowListMutation$data = {
  readonly FollowList: {
    readonly role: string;
  };
};
export type ArticleFollowListMutation = {
  response: ArticleFollowListMutation$data;
  variables: ArticleFollowListMutation$variables;
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
  "name": "role",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ArticleFollowListMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Membership",
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
    "name": "ArticleFollowListMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Membership",
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
    "cacheID": "b958d5883effb386141c41fa82055a0b",
    "id": null,
    "metadata": {},
    "name": "ArticleFollowListMutation",
    "operationKind": "mutation",
    "text": "mutation ArticleFollowListMutation(\n  $listId: ID!\n) {\n  FollowList(listId: $listId) {\n    role\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "155987cf9f7f2464c73b7933f8961480";

export default node;
