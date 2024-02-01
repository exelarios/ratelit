/**
 * @generated SignedSource<<ddc99d42b29ab5271e00d52ab87065cd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type ArticleListQuery$variables = {
  listId: string;
};
export type ArticleListQuery$data = {
  readonly List: {
    readonly createdAt: any;
    readonly description: string | null | undefined;
    readonly id: string;
    readonly isFollowing: boolean;
    readonly items: ReadonlyArray<{
      readonly description: string | null | undefined;
      readonly name: string;
    }>;
    readonly owner: {
      readonly name: string;
    };
    readonly thumbnail: string;
    readonly title: string;
  };
};
export type ArticleListQuery = {
  response: ArticleListQuery$data;
  variables: ArticleListQuery$variables;
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
    "name": "id",
    "variableName": "listId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "thumbnail",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isFollowing",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ArticleListQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "List",
        "kind": "LinkedField",
        "name": "List",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Item",
            "kind": "LinkedField",
            "name": "items",
            "plural": true,
            "selections": [
              (v8/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "owner",
            "plural": false,
            "selections": [
              (v8/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ArticleListQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "List",
        "kind": "LinkedField",
        "name": "List",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Item",
            "kind": "LinkedField",
            "name": "items",
            "plural": true,
            "selections": [
              (v8/*: any*/),
              (v4/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "owner",
            "plural": false,
            "selections": [
              (v8/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a95acac21e33ac9056bd093f95596c5d",
    "id": null,
    "metadata": {},
    "name": "ArticleListQuery",
    "operationKind": "query",
    "text": "query ArticleListQuery(\n  $listId: String!\n) {\n  List(id: $listId) {\n    id\n    title\n    description\n    thumbnail\n    isFollowing\n    createdAt\n    items {\n      name\n      description\n      id\n    }\n    owner {\n      name\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "26f28f837dbd6ac59abda9b5e5c129a1";

export default node;
