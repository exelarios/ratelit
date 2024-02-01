/**
 * @generated SignedSource<<004219b5254e1f65baff06f291337bf7>>
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
  editableCursor?: string | null | undefined;
  email: string;
  followingCursor?: string | null | undefined;
};
export type FeedUserEditableListQuery$data = {
  readonly User: {
    readonly " $fragmentSpreads": FragmentRefs<"FeedFollowingListFragment" | "FeedUserEditableListFragment">;
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
  "name": "editableCursor"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "email"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "followingCursor"
},
v4 = [
  {
    "kind": "Variable",
    "name": "email",
    "variableName": "email"
  }
],
v5 = {
  "kind": "Variable",
  "name": "first",
  "variableName": "count"
},
v6 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "editableCursor"
  },
  (v5/*: any*/)
],
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v8 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "List",
    "kind": "LinkedField",
    "name": "node",
    "plural": false,
    "selections": [
      (v7/*: any*/),
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
        "name": "thumbnail",
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
        "name": "categories",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "description",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "updatedAt",
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
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          (v7/*: any*/)
        ],
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
v9 = {
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
},
v10 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "followingCursor"
  },
  (v5/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "FeedUserEditableListQuery",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "User",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FeedUserEditableListFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FeedFollowingListFragment"
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
      (v3/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "FeedUserEditableListQuery",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "User",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v6/*: any*/),
            "concreteType": "UserEditableListConnection",
            "kind": "LinkedField",
            "name": "editableList",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "UserEditableListConnectionEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": (v8/*: any*/),
                "storageKey": null
              },
              (v9/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v6/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "User_editableList",
            "kind": "LinkedHandle",
            "name": "editableList"
          },
          (v7/*: any*/),
          {
            "alias": null,
            "args": (v10/*: any*/),
            "concreteType": "UserFollowingListConnection",
            "kind": "LinkedField",
            "name": "followingList",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "UserFollowingListConnectionEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": (v8/*: any*/),
                "storageKey": null
              },
              (v9/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v10/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "User_followingList",
            "kind": "LinkedHandle",
            "name": "followingList"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "cc3359531601cc487b4147981949da9b",
    "id": null,
    "metadata": {},
    "name": "FeedUserEditableListQuery",
    "operationKind": "query",
    "text": "query FeedUserEditableListQuery(\n  $email: String!\n  $count: Int!\n  $followingCursor: ID\n  $editableCursor: ID\n) {\n  User(email: $email) {\n    ...FeedUserEditableListFragment\n    ...FeedFollowingListFragment\n    id\n  }\n}\n\nfragment FeedFollowingListFragment on User {\n  followingList(first: $count, after: $followingCursor) {\n    edges {\n      node {\n        id\n        ...ListFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n}\n\nfragment FeedUserEditableListFragment on User {\n  editableList(first: $count, after: $editableCursor) {\n    edges {\n      node {\n        id\n        ...ListFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n}\n\nfragment ListFragment on List {\n  id\n  title\n  thumbnail\n  isFollowing\n  categories\n  description\n  updatedAt\n  owner {\n    name\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "eeae2e2235ab90fc7004de21b18e1156";

export default node;
