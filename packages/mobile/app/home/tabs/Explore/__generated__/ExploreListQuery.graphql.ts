/**
 * @generated SignedSource<<342ec02ebe5c539514d97519e64f21c2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ExploreListQuery$variables = Record<PropertyKey, never>;
export type ExploreListQuery$data = {
  readonly Feed: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"ListFragment">;
      };
    } | null | undefined>;
  };
};
export type ExploreListQuery = {
  response: ExploreListQuery$data;
  variables: ExploreListQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ExploreListQuery",
    "selections": [
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
                  (v0/*: any*/),
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "ListFragment"
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
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ExploreListQuery",
    "selections": [
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
                  (v0/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "title",
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
    "cacheID": "80f7794a2fc23de7c88691738893065d",
    "id": null,
    "metadata": {},
    "name": "ExploreListQuery",
    "operationKind": "query",
    "text": "query ExploreListQuery {\n  Feed {\n    edges {\n      node {\n        id\n        ...ListFragment\n      }\n    }\n  }\n}\n\nfragment ListFragment on List {\n  id\n  title\n}\n"
  }
};
})();

(node as any).hash = "128b7f705bc909a2997afb6d8935e5c3";

export default node;
