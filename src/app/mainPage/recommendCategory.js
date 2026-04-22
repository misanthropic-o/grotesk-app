import "./recommendCategory.css";
import Image from "next/image";

const CATEGORIES = [
  { src: "bombers.webp", label: "BOMBERS" },
  { src: "hoodies.webp", label: "HOODIES" },
  { src: "longsleeves.webp", label: "LONGSLEEVES" },
  { src: "sneakers.webp", label: "SNEAKERS" },
];

export function getCategoryImage(index) {
  return CATEGORIES[index % CATEGORIES.length];
}

export default function RecommendCategory({ index = 0 }) {
  const { src, label } = CATEGORIES[index % CATEGORIES.length];

  return (
    <div className="recommendCat">
      <div className="recommendCatTitle">
        <p>{label}</p>
      </div>
      <div className="recommendCatImg">
        <Image
          src={`/imgs/sampleImgsRecommend/${src}`}
          alt={label.toLowerCase()}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="recommendCatOverlay">
        <p>{label}</p>
      </div>
    </div>
  );
}
