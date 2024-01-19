/**
 * @generated SignedSource<<7614c3daeec3d49076b575cb7452d8a6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ListFragment$data = {
  readonly id: string;
  readonly isFollowing: boolean;
  readonly title: string;
  readonly " $fragmentType": "ListFragment";
};
export type ListFragment$key = {
  readonly " $data"?: ListFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ListFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ListFragment",
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
      "name": "isFollowing",
      "storageKey": null
    }
  ],
  "type": "List",
  "abstractKey": null
};

(node as any).hash = "3928b5ee7df6650af3cd6cd9936b24fd";

export default node;
