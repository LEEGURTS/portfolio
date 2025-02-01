import { ContributionType } from "@/data/detail";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IoMdArrowDropdown } from "react-icons/io";
import Link from "next/link";

interface DetailWorkedItemProps {
  targetId: string;
  contribution: ContributionType;
}

const DetailWorkedItem = ({
  targetId,
  contribution,
}: DetailWorkedItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="flex flex-row items-center">
        <IoMdArrowDropdown
          size={"1.5rem"}
          transform={isOpen ? "" : "rotate(-90)"}
        />
        <p
          className="text-lg font-semibold cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {contribution.title}
        </p>
      </div>

      <motion.ul
        className="list-disc list-inside pl-8"
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <AnimatePresence>
          {isOpen &&
            contribution.content.map(({ title, id }, idx) => (
              <motion.li
                key={idx}
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
              >
                {id ? (
                  <Link
                    href={`/detail/markdown/${targetId}/${id}`}
                    className="text-blue-500"
                  >
                    {title}
                  </Link>
                ) : (
                  title
                )}
              </motion.li>
            ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
};

export default DetailWorkedItem;
