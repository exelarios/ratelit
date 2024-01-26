/**
 * @generated SignedSource<<ac4e4c656e9bdf22add8ba2fc59921a7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Visibility = "PRIVATE" | "PUBLIC" | "RESTRICTED" | "%future added value";
export type ListDetailsQuery$variables = {
  listId: string;
};
export type ListDetailsQuery$data = {
  readonly List: {
    readonly categories: ReadonlyArray<string>;
    readonly createdAt: any;
    readonly description: string | null | undefined;
    readonly id: string;
    readonly owner: {
      readonly name: string;
    };
    readonly thumbnail: string;
    readonly title: string;
    readonly updatedAt: any;
    readonly visibility: Visibility;
    readonly " $fragmentSpreads": FragmentRefs<"ListDetailsEditorsFragment">;
  };
};
export type ListDetailsQuery = {
  response: ListDetailsQuery$data;
  variables: ListDetailsQuery$variables;
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
  "name": "categories",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "thumbnail",
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
  "name": "visibility",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "updatedAt",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ListDetailsQuery",
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
          (v8/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "owner",
            "plural": false,
            "selections": [
              (v9/*: any*/)
            ],
            "storageKey": null
          },
          (v10/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ListDetailsEditorsFragment"
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
    "name": "ListDetailsQuery",
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
          (v8/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "owner",
            "plural": false,
            "selections": [
              (v9/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v10/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ListEditorsConnection",
            "kind": "LinkedField",
            "name": "editors",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ListEditorsConnectionEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Membership",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "User",
                        "kind": "LinkedField",
                        "name": "user",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          (v9/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "avatar",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "88fe10c90e9f41416df3476c27792e79",
    "id": null,
    "metadata": {},
    "name": "ListDetailsQuery",
    "operationKind": "query",
    "text": "query ListDetailsQuery(\n  $listId: String!\n) {\n  List(id: $listId) {\n    id\n    title\n    description\n    categories\n    thumbnail\n    createdAt\n    visibility\n    owner {\n      name\n      id\n    }\n    updatedAt\n    ...ListDetailsEditorsFragment\n  }\n}\n\nfragment ListDetailsEditorsFragment on List {\n  editors {\n    edges {\n      node {\n        user {\n          id\n          name\n          avatar\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "7f1385c0be0fd0ce81af3dd7b4306c22";

export default node;
