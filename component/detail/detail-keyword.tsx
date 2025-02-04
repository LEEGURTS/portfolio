import { IconType } from "react-icons";
import * as motion from "motion/react-client";
import { containerVariants, itemVariants } from "@/constants/motion-variants";

interface DetailKeywordProps {
  feSkills?: IconType[];
  beSkills?: IconType[];
}

const DetailKeyword = ({ feSkills, beSkills }: DetailKeywordProps) => {
  return (
    <div className="flex flex-col gap-4 mt-4">
      {feSkills && (
        <motion.div
          className="flex flex-col gap-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2
            className="text-xl font-bold"
            variants={{
              hidden: { opacity: 0, x: "-3rem" },
              show: { opacity: 1, x: 0 },
            }}
          >
            Frontend Skills
          </motion.h2>
          <div className="flex flex-wrap gap-2">
            {feSkills?.map((Skill, idx) => (
              <motion.span
                key={idx}
                className="bg-gray-200 rounded-md p-2"
                variants={itemVariants}
              >
                <Skill size={"2.5rem"} />
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
      {beSkills && (
        <motion.div
          className="flex flex-col gap-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2
            className="text-xl font-bold"
            variants={{
              hidden: { opacity: 0, x: "-3rem" },
              show: { opacity: 1, x: 0 },
            }}
          >
            Backend Skills
          </motion.h2>
          <div className="flex flex-wrap gap-2">
            {beSkills?.map((Skill, idx) => (
              <motion.span
                key={idx}
                className="bg-gray-200 rounded-md p-2"
                variants={itemVariants}
              >
                <Skill size={"2.5rem"} />
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DetailKeyword;
