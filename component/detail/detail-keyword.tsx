interface DetailKeywordProps {
  feSkills?: string[];
  beSkills?: string[];
}

const DetailKeyword = ({ feSkills, beSkills }: DetailKeywordProps) => {
  return (
    <div className="flex flex-col gap-4 mt-4">
      {feSkills && (
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold">Frontend Skills</h2>
          <div className="flex flex-wrap gap-2">
            {feSkills?.map((skill, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-sm bg-gray-300 rounded-md"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
      {beSkills && (
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold">Backend Skills</h2>
          <div className="flex flex-wrap gap-2">
            {beSkills?.map((skill, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-sm bg-gray-300 rounded-md"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailKeyword;
