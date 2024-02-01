/**
 * @generated SignedSource<<b312bc91b10d4684ebef643d5009d376>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ExploreFeedFragment$data = {
  readonly feed: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly $updatableFragmentSpreads: FragmentRefs<"ArticleFragment_updateable">;
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"ArticleFragment">;
      };
    } | null | undefined>;
  };
  readonly id: string;
  readonly " $fragmentType": "ExploreFeedFragment";
};
export type ExploreFeedFragment$key = {
  readonly " $data"?: ExploreFeedFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ExploreFeedFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "feed"
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "count"
    },
    {
      "kind": "RootArgument",
      "name": "cursor"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "count",
        "cursor": "cursor",
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "count",
          "cursor": "cursor"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [
        "node"
      ],
      "operation": require('./ExploreFeedPaginationFragment.graphql'),
      "identifierInfo": {
        "identifierField": "id",
        "identifierQueryVariableName": "id"
      }
    }
  },
  "name": "ExploreFeedFragment",
  "selections": [
    {
      "alias": "feed",
      "args": null,
      "concreteType": "UserFeedConnection",
      "kind": "LinkedField",
      "name": "__ExploreFeedLists_feed_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "UserFeedConnectionEdge",
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
                (v1/*: any*/),
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ArticleFragment"
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ArticleFragment_updateable"
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
    (v1/*: any*/)
  ],
  "type": "User",
  "abstractKey": null
};
})();

(node as any).hash = "4fa8bec3148fe9db8834a4828576b484";

export default node;
