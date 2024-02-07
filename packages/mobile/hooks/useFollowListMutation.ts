import { useCallback } from "react";
import { graphql, useMutation } from "react-relay";
import { useToast } from "@/mobile/context/ToastContext";

import type { useFollowListMutation } from "./__generated__/useFollowListMutation.graphql";
import { useAuth } from "@/mobile/context/AuthContext";

const FollowListMuatation = graphql`
  mutation useFollowListMutation($listId: ID!) {
    FollowList(listId: $listId) {
      isFollowing
    }
  }
`;

interface PreviousFollowListState {
  title: string;
  isFollowing: boolean;
  isAuthor: boolean;
}

function useFollowListMutation() {
  const auth = useAuth();
  const user = auth.state.user;

  const toast = useToast();
  const [commit, isInFlight] = useMutation<useFollowListMutation>(FollowListMuatation);

  const handleOnCommit = useCallback((listId: string, old: PreviousFollowListState) => {
    const { title, isAuthor, isFollowing } = old;
    return commit({
      variables: {
        listId: listId
      },
      onCompleted: (response) => {
        const state = response.FollowList;
        let message = "";

        if (isAuthor) {
          message = "You are already following this list.";
        } else {
          if (state.isFollowing) {
            message = `You are now following ${title}.`;
          } else {
            message = `You unfollowed ${title}`;
          }
        }

        toast.add({
          message
        });
      },
      optimisticResponse: {
        "FollowList": {
          id: listId,
          isFollowing: !isFollowing,
        }
      },
      onError(error) {
        console.log(error);
      }
    });
  }, []);

  return [
    handleOnCommit,
    isInFlight
  ] as const;
}

export default useFollowListMutation;