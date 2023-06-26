import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import styled from "styled-components";
import { REVIEW_DATA } from "../../storage/Review";
import { SQUARE_RANDOM_IMAGE } from "../../storage/SquareRandomImage";

const kakaoAppKey = process.env.NEXT_PUBLIC_KAKAO_JS;

interface IKakaoShareBtn {
  type?: string;
  title: string;
  subtitle: string;
  img?: string;
  location?: string;
  url: string;
}

function KakaoShareBtn({
  type,
  title,
  subtitle,
  img,
  location,
  url,
}: IKakaoShareBtn) {
  const random_num = Math.floor(Math.random() * 3);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.Kakao &&
      !window.Kakao.isInitialized()
    ) {
      window.Kakao.init(kakaoAppKey);
    }
  }, []);

  useEffect(() => {
    if (window.Kakao) {
      const options =
        type === "gather"
          ? {
              container: "#kakao-share-button",
              objectType: "location",
              content: {
                title,
                description: subtitle,
                imageUrl:
                  "https://user-images.githubusercontent.com/84257439/235453825-026ca653-d356-485a-a916-19c21352e10a.png",
                link: {
                  mobileWebUrl: url,
                  webUrl: url,
                },
              },
              address: location,
              // addressTitle: "카카오 본사",
              buttons: [
                {
                  title: "웹으로 이동",
                  link: {
                    mobileWebUrl: url,
                    webUrl: url,
                  },
                },
                {
                  title: "앱으로 이동",
                  link: {
                    mobileWebUrl: url,
                    webUrl: url,
                  },
                },
              ],
            }
          : type === "study"
          ? {
              container: "#kakao-share-button",
              objectType: "location",
              content: {
                title,
                description: subtitle,
                imageUrl: SQUARE_RANDOM_IMAGE[random_num],
                link: {
                  mobileWebUrl: url,
                  webUrl: url,
                },
              },
              address: location,
              // addressTitle: "카카오 본사",
              buttons: [
                {
                  title: "웹으로 이동",
                  link: {
                    mobileWebUrl: url,
                    webUrl: url,
                  },
                },
              ],
            }
          : {
              container: "#kakao-share-button",
              objectType: "feed",
              content: {
                title,
                description: subtitle,
                imageUrl: REVIEW_DATA[0]?.images[0],
                link: {
                  mobileWebUrl: url,
                  webUrl: url,
                },
              },
            };
      window.Kakao.Link.createDefaultButton(options);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout id="kakao-share-button">
      <FontAwesomeIcon icon={faArrowUpFromBracket} size="lg" />
    </Layout>
  );
}

const Layout = styled.div``;

export default KakaoShareBtn;
