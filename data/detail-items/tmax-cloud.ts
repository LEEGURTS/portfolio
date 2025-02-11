import { SiDocker, SiKubernetes, SiLinux, SiMariadb, SiReact, SiSpringboot } from "react-icons/si";
import { DetailDataType } from "../detail";
import thumbnail from "@/assets/img/tmax-cloud/main.jpg";
import { GrVirtualMachine } from "react-icons/gr";
import { CgCloud } from "react-icons/cg";
import { BiCloud } from "react-icons/bi";

export const tmaxCloudData : DetailDataType = {
    id: "tmax-cloud",
    thumbnail:thumbnail,
    mainExplanations: {
        simpleExplanation: "TmaxCloud는 온북, 클라우드 서비스 등 다양한 서비스를 제공합니다.",
        detailExplanation: [
       "TmaxCloud에서 온북 서비스를 담당하며 풀 스택 개발자로서 프론트엔드와 백엔드 개발을 담당했습니다.",
       "React와 Spring을 통해 온북 프로젝트의 관리자 기능을 주로 개발했습니다.",
       "쉘 스크립트를 통해 서버 설치 및 설정 자동화를 진행하며, Helm Chart를 통해 설치를 간편화했습니다.",

        ],
    },
    skills: {
        feSkills:[SiReact],
        beSkills:[SiSpringboot,SiMariadb,SiLinux,SiDocker,SiKubernetes],
    },
    sideInfo: {},
    contributions:[
        {
            title: "TinuxVM 개발",
            subtitle:"2VM 기반의 새로운 온북 서비스",
            Icon:GrVirtualMachine,
            content:[
                "리눅스 스크립트를 통한 인증서 생성, 네트워크 설정 등 서버 설치 자동화",
                "VPN 관리 서버 개발",
                "VPN 관리서버 - VM 관리서버 간의 통신을 통한 VPN 관리 기능 개발",
                "모달, 툴팁, 알람, 토스트 등의 공동 컴포넌트 개발"
            ]
        },{
            title:"구름 GPMS 고도화",
            subtitle:"기존 온북 제품 고도화",
            Icon:CgCloud,
            content:[
                "JSON 기반 로그 저장을 통한 관리자 사용내역 가시성 개선",
                "DB 기반의 모듈 헬스체크 기능 개발",
                "모듈 별 조작/관리 기능 개발"
            ]
        },{
            title:"TmaxGPMS 고도화",
            subtitle:"TmaxGPMS 제품 고도화",
            Icon:BiCloud,
            content:[
                "Electron 기반 리눅스 프로그램 윈도우 버전으로 포팅",
                "윈도우 VM 내부에서 리눅스 Host 참조해서 동작하도록 개발",
                "기존 Docker-compose로 배포하던 서비스를 Helm Chart로 변경"
            ]
        }
    ]
};