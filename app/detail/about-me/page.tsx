import Image from "next/image";
import Link from "next/link";
import { AboutMeData } from "@/data/about-me/about-me";

const AboutMePage = () => {
  return (
    <div className="flex flex-col p-8 lg:p-16 gap-16 lg:gap-24">
      <div className="relative w-full mt-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative flex flex-col gap-2">
            <div className="relative">
              <Image
                src={AboutMeData.profileImage}
                alt=""
                className="w-full sm:w-60 lg:w-80 lg:max-w-[50vw] object-cover aspect-square"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 15rem, 20rem"
              />
            </div>
            <div>
              <p className="font-bold">🎂 Birth</p>
              <p>· {AboutMeData.birth}</p>
            </div>
            <div>
              <p className="font-bold">📧 Email</p>
              <p>· {AboutMeData.email}</p>
            </div>
            <div>
              <p className="font-bold">🐱 Github</p>
              <a href={AboutMeData.github}>· {AboutMeData.github}</a>
            </div>
            <div>
              <p className="font-bold">📚 Blog</p>
              <a href={AboutMeData.blog}>· {AboutMeData.blog}</a>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-medium">
              {AboutMeData.introduce.title}
            </h2>
            <h1 className="text-2xl font-bold">
              {AboutMeData.introduce.boldTitle}
            </h1>
            <h2 className="text-lg font-medium">
              {AboutMeData.introduce.subTitle}
            </h2>
            <div className="whitespace-pre-wrap my-8 sm:max-w-96">
              {AboutMeData.introduce.content.map((sentence, idx) => (
                <p key={idx}>· {sentence}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <p className="font-bold text-xl">SKILLS</p>
        <p className="font-semibold">자신있는 기술스택</p>
        <div className="flex flex-wrap gap-2">
          {AboutMeData.skills.bestSkills.map((Skill, idx) => (
            <span key={idx} className="bg-gray-200 rounded-md p-2">
              <Skill size={"2.5rem"} />
            </span>
          ))}
        </div>
        <p className="font-semibold mt-4">사용 가능한 기술스택</p>
        <div className="flex flex-wrap gap-2">
          {AboutMeData.skills.usableSkills.map((Skill, idx) => (
            <span key={idx} className="bg-gray-200 rounded-md p-2">
              <Skill size={"2.5rem"} />
            </span>
          ))}
        </div>
        <p className="font-semibold mt-4">사용해본 경험이 있는 기술스택</p>
        <div className="flex flex-wrap gap-2">
          {AboutMeData.skills.experiencedSkills.map((Skill, idx) => (
            <span key={idx} className="bg-gray-200 rounded-md p-2">
              <Skill size={"2.5rem"} />
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p className="font-bold text-xl">커리어</p>
        <div className="relative flex flex-col gap-4">
          {AboutMeData.career.map((career, idx) => (
            <div key={idx} className="flex flex-col gap-4">
              <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center gap-4">
                  {career?.logo && (
                    <Image
                      src={career.logo}
                      alt=""
                      className="object-contain size-24 border rounded-lg"
                    />
                  )}
                  <div>
                    <p className="font-bold text-lg">{career.company}</p>
                    <p className="text-sm text-gray-500">{career.duration}</p>
                    <p className="text-sm my-2">{career.explain}</p>
                  </div>
                </div>
                <Link
                  className="bg-gray-200 rounded-lg px-2 py-1 text-sm h-fit font-semibold"
                  href={career.href}
                >
                  자세히 보기
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {career.roles?.map((roles, idx) => (
                  <span
                    key={idx}
                    className="text-sm bg-black text-white font-semibold rounded-md px-2 py-1"
                  >
                    {roles}
                  </span>
                ))}
              </div>
              {career.acted?.map((act, idx) => (
                <div key={idx} className="flex flex-col gap-2 border-b py-2">
                  <p className="font-bold text-lg px-4 border-l-4 border-black flex items-center">
                    {act.title}
                  </p>
                  <p className="text-sm text-gray-500">{act.duration}</p>
                  <p className="text-sm">{act.explain}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
        <p className="font-bold text-xl">학력</p>
        {AboutMeData.education.map((education, idx) => (
          <div key={idx} className="flex flex-row justify-between">
            <div className="flex flex-row items-center gap-4">
              {education?.logo && (
                <Image
                  src={education.logo}
                  alt=""
                  className="object-contain size-24 border rounded-lg"
                />
              )}
              <div>
                <p className="font-bold text-lg">{education.title}</p>
                <p className="text-sm text-gray-500">{education.duration}</p>
                <p className="text-sm my-2">{education.explain}</p>
                {education?.score && (
                  <p className="text-sm">{education.score}</p>
                )}
              </div>
            </div>
          </div>
        ))}
        <p className="font-bold text-xl">활동</p>
        <div className="relative grid grid-cols-1 gap-4 lg:grid-cols-2">
          {AboutMeData.activities.map((activity, idx) => (
            <Link
              key={idx}
              href={activity.href}
              className="w-full border rounded-lg p-4 flex flex-row items-center justify-between"
            >
              <div>
                <p className="font-bold text-lg">{activity.title}</p>
                <p className="text-sm text-gray-500">{activity.duration}</p>
                {activity?.acted.map((act, idx) => (
                  <p
                    key={idx}
                    className="text-sm border-l-4 pl-2 border-black my-1"
                  >
                    {act}
                  </p>
                ))}
              </div>
              {activity?.logo && (
                <Image
                  src={activity.logo}
                  alt=""
                  className="object-contain size-16"
                />
              )}
            </Link>
          ))}
        </div>
        <p className="font-bold text-xl">프로젝트</p>
        <div className="relative grid grid-cols-1 gap-4 lg:grid-cols-2">
          {AboutMeData.sideProjects.map((project, idx) => (
            <Link
              key={idx}
              href={project.href}
              className="w-full border rounded-lg p-4 flex flex-row items-center justify-between"
            >
              <div>
                <p className="font-bold text-lg">{project.title}</p>
                <p className="text-sm text-gray-500">{project.duration}</p>
                {project?.details.map((detail, idx) => (
                  <p
                    key={idx}
                    className="text-sm border-l-4 pl-2 border-black my-1"
                  >
                    {detail}
                  </p>
                ))}
              </div>
              {project?.logo && (
                <Image
                  src={project.logo}
                  alt=""
                  className="object-contain size-16"
                />
              )}
            </Link>
          ))}
        </div>
      </div>
      <div className="h-12" />
    </div>
  );
};

export default AboutMePage;
