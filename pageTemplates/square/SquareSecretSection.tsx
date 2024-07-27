import { Box } from "@chakra-ui/react";
import { useState } from "react";

import { type SecretSquareCategory, type SecretSquareItem } from "../../types/models/square";
import SecretSquareCategories from "./SecretSquare/SecretSquareCategories";
import SquareItem from "./SecretSquare/SquareItem";

export const SECRET_SQUARE_CATEGORY: SecretSquareCategory[] = [
  "전체",
  "일상",
  "고민",
  "정보",
  "같이해요",
];

function SquareSecretSection() {
  const [category, setCategory] = useState<SecretSquareCategory>("전체");

  const temp: SecretSquareItem[] = [
    {
      category: "전체",
      title: "테스트",
      content:
        "테스트용 게시글입니다.테스트용 게시글입니다.테스트용 게시글입니다.테스트용 게시글입니다.테스트용 게시글입니다.테스트용 게시글입니다.",
      id: "34",
      type: "general",
      author: "이승주", // TODO 익명
      createdAt: "2024-07-24",
      viewCount: 10,
    },
    {
      category: "일상",
      title: "테스트",
      content:
        "테스트용 게시글입니다.테스트용 게시글입니다.테스트용 게시글입니다.테스트용 게시글입니다.테스트용 게시글입니다.테스트용 게시글입니다.테스트용 게시글입니다.테스트용 게시글입니다.테스트용 게시글입니다.테스트용 게시글입니다.테스트용 게시글입니다.테스트용 게시글입니다.테스트용 게시글입니다.테스트용 게시글입니다.테스트용 게시글입니다.테스트용 게시글입니다.",
      id: "35",
      type: "poll",
      author: "이승주", // TODO 익명
      createdAt: "2024-07-22",
      viewCount: 124,
      pollList: [
        { id: "0", value: "떡볶이", count: 3 },
        { id: "1", value: "마라탕", count: 3 },
        { id: "2", value: "연어", count: 3 },
        { id: "3", value: "대창", count: 3 },
      ],
      canMultiple: false,
    },
  ];

  return (
    <>
      <SecretSquareCategories category={category} setCategory={setCategory} />
      <Box>
        {temp.map((item) => (
          <SquareItem key={item.id} item={item} />
        ))}
      </Box>
    </>
  );
}

export default SquareSecretSection;
