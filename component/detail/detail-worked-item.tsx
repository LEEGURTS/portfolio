import { ContributionType } from "@/data/detail";
import * as motion from "motion/react-client";
import Link from "next/link";

interface DetailWorkedItemProps {
  targetId: string;
  contribution: ContributionType;
}

const DetailWorkedItem = ({
  targetId,
  contribution,
}: DetailWorkedItemProps) => {
  const { Icon } = contribution;
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: -10 },
        show: { opacity: 1, y: 0 },
      }}
      className="border border-gray-200 p-4 rounded-md flex flex-col gap-2"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-6 h-6" />}
          <p className="font-semibold text-lg">{contribution.title}</p>
        </div>
        {contribution.id && (
          <Link
            href={`/detail/markdown/${targetId}/${contribution.id}`}
            className="font-semibold bg-gray-200 px-2 py-1 rounded-md"
          >
            자세히 보기
          </Link>
        )}
      </div>
      {contribution.subtitle && (
        <p className="text-sm text-gray-500">{contribution.subtitle}</p>
      )}
      <motion.ul
        className="list-disc list-inside"
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {contribution.content?.map((item, idx) => (
          <motion.li
            key={idx}
            variants={{
              hidden: { opacity: 0, y: -50 },
              show: { opacity: 1, y: 0 },
            }}
          >
            {item}
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
};

export default DetailWorkedItem;
