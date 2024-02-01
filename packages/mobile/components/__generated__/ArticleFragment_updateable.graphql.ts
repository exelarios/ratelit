/**
 * @generated SignedSource<<ca65b7a7943cdbaca12c536c6f7360d3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { UpdatableFragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArticleFragment_updateable$data = {
  isFollowing: boolean;
  role: string;
  readonly " $fragmentType": "ArticleFragment_updateable";
};
export type ArticleFragment_updateable$key = {
  readonly " $data"?: ArticleFragment_updateable$data;
  readonly $updatableFragmentSpreads: FragmentRefs<"ArticleFragment_updateable">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArticleFragment_updateable",
  "selections": [
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
      "name": "role",
      "storageKey": null
    }
  ],
  "type": "List",
  "abstractKey": null
};

(node as any).hash = "90614868ba81f4e2d4ec692197742045";

export default node;
