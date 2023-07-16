import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import styled from "styled-components";
import { DEFAULT_IMAGE_URL } from "../../../constants/default";
import { AVATAR_COLOR, AVATAR_ICON } from "../../../storage/Avatar";

import { IUser } from "../../../types/user";

interface IProfileIconXsOVerwrap {
  user: IUser;
  isOverlap?: boolean;
}

function ProfileIconXsOverwrap({ user, isOverlap }: IProfileIconXsOVerwrap) {
  const avatarType = user?.avatar?.type;
  const avatarBg = user?.avatar?.bg;
  const isAvatar = Boolean(avatarType >= 0 && avatarBg >= 0);

  const handleErrorImage = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = DEFAULT_IMAGE_URL;
  };
  const imageUrl = isAvatar
    ? `${AVATAR_ICON[avatarType]}`
    : `${user?.profileImage}`;

  return (
    <Layout>
      <Wrapper style={{ background: isAvatar && AVATAR_COLOR[avatarBg] }}>
        {!isOverlap ? (
          <Image
            src={imageUrl}
            width={isAvatar ? 21 : 26}
            height={isAvatar ? 21 : 26}
            alt="ProfileIconXsOverwrap"
            unoptimized={true}
            onError={handleErrorImage}
          />
        ) : (
          <OverlapWrapper>
            <Image
              src={imageUrl}
              width={isAvatar ? 21 : 26}
              height={isAvatar ? 21 : 26}
              alt="ProfileIconXsOverwrap"
              unoptimized={true}
              onError={handleErrorImage}
            />
            <IconWrapper>
              <FontAwesomeIcon icon={faEllipsis} size="lg" color="white" />
            </IconWrapper>
          </OverlapWrapper>
        )}
      </Wrapper>
    </Layout>
  );
}

const Layout = styled.div`
  width: 28px;
  height: 28px;
  padding: 2px;
  background-color: white;
  border-radius: 50%;
  display: inline-block;
  position: absolute;
  bottom: 0px;
  z-index: 1000;
`;

const Wrapper = styled.div`
  width: 26px;
  height: 26px;
  overflow: hidden;
  border-radius: 50%;
  margin-left: -1px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -1px;
`;

const OverlapWrapper = styled.div`
  position: relative;
  z-index: 5000;

  width: 100%;
  height: 100%;
`;

const IconWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); // 어두운 색상
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.7; // 투명도
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default ProfileIconXsOverwrap;
