import { faEllipsis } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import ProfileIcon from "../../components/common/Profile/ProfileIcon";

interface IReviewItemHeader {
  writer: any;
  date: string;
}

function ReviewItemHeader({ writer, date }: IReviewItemHeader) {
  return (
    <Layout>
      <Profile>
        <ProfileIcon user={writer} size="sm" />
        <div>
          <span>{writer?.name}</span>
          <span>{date}</span>
        </div>
      </Profile>
      <FontAwesomeIcon icon={faEllipsis} size="lg" />
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 var(--padding-main);
  margin-bottom: var(--margin-sub);
  align-items: center;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  > div:last-child {
    margin-left: var(--margin-md);
    display: flex;
    flex-direction: column;
    > span:first-child {
      font-weight: 600;
      font-size: 12px;
    }
    > span:last-child {
      color: var(--font-h3);
      font-size: 10px;
    }
  }
`;

export default ReviewItemHeader;
