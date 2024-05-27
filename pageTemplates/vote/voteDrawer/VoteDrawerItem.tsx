import { Box, Flex } from "@chakra-ui/react";
import dayjs from "dayjs";
import styled from "styled-components";

import { STUDY_PREFERENCE_LOCAL } from "../../../constants/keys/queryKeys";
import { useToast } from "../../../hooks/custom/CustomToast";
import { useStudyPreferenceMutation } from "../../../hooks/study/mutations";
import { PreferStorageProps } from "../../../pages/vote";
import { DispatchType } from "../../../types/hooks/reactTypes";
import {
  IStudyVotePlaces,
  IStudyVoteWithPlace,
} from "../../../types/models/studyTypes/studyInterActions";
import { dayjsToStr } from "../../../utils/dateTimeUtils";
import { VoteDrawerItemProps as ItemProps } from "../VoteDrawer";

interface VoteDrawerItemProps {
  item: ItemProps;
  savedPrefer: IStudyVotePlaces;
  myVote: IStudyVoteWithPlace;
  setMyVote: DispatchType<IStudyVoteWithPlace>;
  setPlaceItems: DispatchType<ItemProps[]>;
}

function VoteDrawerItem({
  item,
  savedPrefer,
  myVote,
  setMyVote,
  setPlaceItems,
}: VoteDrawerItemProps) {
  const toast = useToast();

  const { mutate: setStudyPreference } = useStudyPreferenceMutation({
    onSuccess() {
      toast("success", "변경되었습니다.");
    },
  });

  //장소 선택
  const onClickItem = (item: ItemProps) => {
    //메인 장소 선택
    if (!myVote?.place) setMyVote({ place: item.place, subPlace: [], start: null, end: null });
    //서브 장소 선택
    else {
      setMyVote((prevState) => {
        const { subPlace } = prevState;
        const placeExists = subPlace?.some((obj) => obj._id === item.place._id);
        return {
          ...prevState,
          subPlace: placeExists
            ? subPlace.filter((obj) => obj._id !== item.place._id)
            : subPlace
              ? [...subPlace, item.place]
              : [item.place],
        };
      });
    }
  };

  //즐겨찾기에 추가 및 등록
  const onClickHeart = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    placeId: string,
    heartType: "first" | "second" | null,
  ) => {
    event.stopPropagation();
    const preferMain = savedPrefer?.place;
    const preferSub = savedPrefer?.subPlace;

    setPlaceItems((old) =>
      old.map((item) =>
        item.place._id === placeId
          ? { ...item, myFavorite: heartType ? null : preferMain ? "second" : "first" }
          : item,
      ),
    );
    const newPrefer = { ...savedPrefer };

    if (heartType === "first") {
      newPrefer.place = null;
    }

    if (heartType === "second") {
      if (Array.isArray(preferSub)) {
        newPrefer.subPlace = preferSub.filter((item) => item !== placeId);
      }
    }
    if (!heartType) {
      newPrefer.place = savedPrefer?.place || placeId;
      if (savedPrefer?.place) {
        if (Array.isArray(savedPrefer.subPlace)) {
          newPrefer.subPlace = [placeId, ...savedPrefer.subPlace];
        }
      } else {
        newPrefer.subPlace = savedPrefer?.subPlace;
      }
    }

    localStorage.setItem(
      STUDY_PREFERENCE_LOCAL,
      JSON.stringify({
        prefer: newPrefer,
        date: dayjsToStr(dayjs()),
      } as PreferStorageProps),
    );

    setStudyPreference(newPrefer);
  };

  return (
    <Flex
      py="8px"
      align="center"
      pl="16px"
      pr="20px"
      borderBottom="var(--border-main)"
      onClick={() => onClickItem(item)}
      as="button"
      w="100%"
    >
      <HeartButton>
        {myVote?.place ? (
          <i className="fa-regular fa-turn-down-right fa-lg" />
        ) : item.myFavorite ? (
          <Box onClick={(e) => onClickHeart(e, item.place._id, item.myFavorite)}>
            <i
              className="fa-solid fa-heart"
              style={{
                color: item.myFavorite === "first" ? "var(--color-red)" : "var(--color-orange)",
              }}
            />
          </Box>
        ) : (
          <Box onClick={(e) => onClickHeart(e, item.place._id, null)}>
            <i className="fa-regular fa-heart" />
          </Box>
        )}
      </HeartButton>

      <Flex direction="column" align="flex-start">
        <Box fontWeight={600} fontSize="16px">
          {item.place.fullname}
        </Box>
        <Box color="var(--gray-600)" fontSize="14px">
          <Box as="span">{item.voteCnt}명 참여중</Box>
          {" / "}
          <Box as="span">즐겨찾기: {item.favoritesCnt}</Box>
        </Box>
      </Flex>
      <Box ml="auto" mr="12px">
        {myVote?.subPlace?.map((obj) => obj._id).includes(item.place._id) ? (
          <i className="fa-solid fa-circle-check fa-xl" style={{ color: "var(--color-orange)" }} />
        ) : (
          <i className="fa-regular fa-circle-check fa-xl" style={{ color: "var(--gray-500)" }} />
        )}
      </Box>
    </Flex>
  );
}

const HeartButton = styled.div`
  padding: 8px;
  margin-right: 12px;
`;

export default VoteDrawerItem;
