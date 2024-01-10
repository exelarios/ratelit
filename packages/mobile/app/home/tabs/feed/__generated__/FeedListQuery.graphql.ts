/**
 * @generated SignedSource<<51828725ae396da797ef0ee751ac6371>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type FeedListQuery$variables = Record<PropertyKey, never>;
export type FeedListQuery$data = {
  readonly Feed: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly description: string | null | undefined;
        readonly id: string;
        readonly title: string;
      };
    } | null | undefined>;
  };
};
export type FeedListQuery = {
  response: FeedListQuery$data;
  variables: FeedListQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "QueryFeedConnection",
    "kind": "LinkedField",
    "name": "Feed",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "QueryFeedConnectionEdge",
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
                "name": "title",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "description",
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
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "FeedListQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "FeedListQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "0cebbaab49dd8e249ae0d0621d932987",
    "id": null,
    "metadata": {},
    "name": "FeedListQuery",
    "operationKind": "query",
    "text": "query FeedListQuery {\n  Feed {\n    edges {\n      node {\n        id\n        title\n        description\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "93d0d6f98d79702b2bf90315e90ab023";

export default node;
