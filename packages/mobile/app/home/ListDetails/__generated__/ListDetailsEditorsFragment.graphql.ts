/**
 * @generated SignedSource<<de581160e88fb338bd8f2b4c31f12417>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ListDetailsEditorsFragment$data = {
  readonly editors: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly user: {
          readonly avatar: string;
          readonly id: string;
          readonly name: string;
        };
      };
    } | null | undefined>;
  };
  readonly " $fragmentType": "ListDetailsEditorsFragment";
};
export type ListDetailsEditorsFragment$key = {
  readonly " $data"?: ListDetailsEditorsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ListDetailsEditorsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ListDetailsEditorsFragment",
  "selections": [
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
                      "name": "name",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "avatar",
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
      ],
      "storageKey": null
    }
  ],
  "type": "List",
  "abstractKey": null
};

(node as any).hash = "0a9a89d56314c6cc88f5603e6e1cf83c";

export default node;
