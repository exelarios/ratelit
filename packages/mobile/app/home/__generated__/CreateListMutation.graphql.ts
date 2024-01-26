/**
 * @generated SignedSource<<c73c837d8b8e3cc4a21f752ab00ce3b5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type Visibility = "PRIVATE" | "PUBLIC" | "RESTRICTED" | "%future added value";
export type ListCreateInput = {
  categories?: ReadonlyArray<string> | null | undefined;
  description?: string | null | undefined;
  thumbnail: any;
  title: string;
  visibility: Visibility;
};
export type CreateListMutation$variables = {
  input: ListCreateInput;
};
export type CreateListMutation$data = {
  readonly createList: {
    readonly categories: ReadonlyArray<string>;
    readonly createdAt: any;
    readonly description: string | null | undefined;
    readonly id: string;
    readonly title: string;
    readonly visibility: Visibility;
  };
};
export type CreateListMutation = {
  response: CreateListMutation$data;
  variables: CreateListMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "data",
        "variableName": "input"
      }
    ],
    "concreteType": "List",
    "kind": "LinkedField",
    "name": "createList",
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "visibility",
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
        "name": "createdAt",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateListMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateListMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "cbcc0726041b07fbffa499bb6d5b99e6",
    "id": null,
    "metadata": {},
    "name": "CreateListMutation",
    "operationKind": "mutation",
    "text": "mutation CreateListMutation(\n  $input: ListCreateInput!\n) {\n  createList(data: $input) {\n    id\n    title\n    description\n    visibility\n    categories\n    createdAt\n  }\n}\n"
  }
};
})();

(node as any).hash = "be8f8cdf7556c0323d3000097e916cab";

export default node;
