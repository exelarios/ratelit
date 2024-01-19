/**
 * @generated SignedSource<<6fb385e50fd2fe8702529378b11c4fa7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type Visibility = "PRIVATE" | "PUBLIC" | "RESTRICTED" | "%future added value";
export type ListCreateInput = {
  category?: string | null | undefined;
  description?: string | null | undefined;
  thumbnail?: string | null | undefined;
  title: string;
  visibility: Visibility;
};
export type CreateListMutation$variables = {
  input: ListCreateInput;
};
export type CreateListMutation$data = {
  readonly createList: {
    readonly category: string | null | undefined;
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
        "name": "category",
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
    "cacheID": "f0154d2770f6743aed315d1646629997",
    "id": null,
    "metadata": {},
    "name": "CreateListMutation",
    "operationKind": "mutation",
    "text": "mutation CreateListMutation(\n  $input: ListCreateInput!\n) {\n  createList(data: $input) {\n    id\n    title\n    description\n    visibility\n    category\n    createdAt\n  }\n}\n"
  }
};
})();

(node as any).hash = "016073b02e41a04662e4854a547c63bb";

export default node;
