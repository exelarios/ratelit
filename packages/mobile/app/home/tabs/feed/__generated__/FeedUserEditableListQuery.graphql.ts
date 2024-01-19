/**
 * @generated SignedSource<<94fef39dc56d770ea941e500bf6f527c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FeedUserEditableListQuery$variables = {
  count: number;
  cusor?: string | null | undefined;
  email: string;
};
export type FeedUserEditableListQuery$data = {
  readonly User: {
    readonly " $fragmentSpreads": FragmentRefs<"FeedUserEditableListFragment">;
  };
};
export type FeedUserEditableListQuery = {
  response: FeedUserEditableListQuery$data;
  variables: FeedUserEditableListQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "count"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "cusor"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "email"
},
v3 = [
  {
    "kind": "Variable",
    "name": "email",
    "variableName": "email"
  }
],
v4 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cusor"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "count"
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "FeedUserEditableListQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "User",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FeedUserEditableListFragment"
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
    "argumentDefinitions": [
      (v2/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "FeedUserEditableListQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "User",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v4/*: any*/),
            "concreteType": "UserMembershipConnection",
            "kind": "LinkedField",
            "name": "membership",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "UserMembershipConnectionEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "List",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v5/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "title",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isFollowing",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "cursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PageInfo",
                "kind": "LinkedField",
                "name": "pageInfo",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endCursor",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasNextPage",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v4/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "UserEditableList_membership",
            "kind": "LinkedHandle",
            "name": "membership"
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "c28e4df3209aae90ff29bbfbd9495c1c",
    "id": null,
    "metadata": {},
    "name": "FeedUserEditableListQuery",
    "operationKind": "query",
    "text": "query FeedUserEditableListQuery(\n  $email: String!\n  $count: Int!\n  $cusor: ID\n) {\n  User(email: $email) {\n    ...FeedUserEditableListFragment\n    id\n  }\n}\n\nfragment FeedUserEditableListFragment on User {\n  membership(first: $count, after: $cusor) {\n    edges {\n      node {\n        id\n        ...ListFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n}\n\nfragment ListFragment on List {\n  id\n  title\n  isFollowing\n}\n"
  }
};
})();

(node as any).hash = "47d6d4ef7ece570a0fa0b1673c8a13ab";

export default node;
