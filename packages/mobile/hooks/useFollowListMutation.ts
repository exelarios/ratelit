import { useCallback } from "react";
import { graphql, useMutation } from "react-relay";
import { useToast } from "@/mobile/context/ToastContext";

import type { useFollowListMutation } from "./__generated__/useFollowListMutation.graphql";

const FollowListMuatation = graphql`
  mutation useFollowListMutation($listId: ID!) {
    FollowList(listId: $listId) {
      title
      isFollowing
      role
    }
  }
`;

function useFollowListMutation() {
  const toast = useToast();
  const [commit, isInFlight] = useMutation<useFollowListMutation>(FollowListMuatation);

  const handleOnCommit = useCallback((listId: string) => {
    return commit({
      variables: {
        listId: listId
      },
      onCompleted: (response) => {
        const { title, isFollowing } = response.FollowList;
        toast.add({
          message: isFollowing ? `You are now following ${title}.` : `You unfollowed ${title}`
        });
      },
      onError(error) {
        console.log(error);
      },
    });
  }, []);

  return [
    handleOnCommit,
    isInFlight
  ] as const;
}

export default useFollowListMutation;