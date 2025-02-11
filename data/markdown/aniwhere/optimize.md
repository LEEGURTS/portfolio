<details>
<summary>폰트 최적화에 관하여</summary>
# 폰트의 용량은 크다

폰트는 포멧이 다양합니다. 그중 ttf,otf,woff,woff2 등 다양한 포멧을 가지고 있습니다.
보통 웹에서는 서버 트래픽을 줄이고자 woff나 woff2를 사용합니다. 둘의 차이는 압축방식의 차이로 gzip 혹은 brotli 라는 압축방식의 차이에서 용량차이가 나옵니다.  
예시로 저희가 사용하던 Pretendard Variant 버전을 보면 2.1Mb가 나옵니다.  
리소스가 폰트,이미지를 제하면 1mb가 안됩니다. 근데 폰트는 이의 두배나 무거운 것입니다.

# 그래도 2.1mb면 얼마 안되는거 아냐?

맞습니다.  
근데 2.1mb도 무거운 상황이 있습니다. 모바일 환경이 대체로 그러합니다. 네트워크 환경이 불안정한 경우도 많고 데이터 무제한 쓰다가 느려지는 경우도 있는 등 예외의 경우가 너무 많습니다. 이는 폰트가 메모리에 캐싱된다는 장점을 고사하더라도 첫 페이지 로딩에 긴 시간이 소요될 것은 분명했습니다.  
실제로 라이트 하우스로 테스트해보면 이러한 결과가 나옵니다.
![image](https://github.com/user-attachments/assets/3ddec68a-be48-4912-9dc8-5164bceb576a)  
물론 실제로 저렇게까지 느리게 보이지 않습니다. 저 값은 폰트가 로드 완료되고 나서 시스템 폰트에서 커스텀 폰트로 swap을 하기까지의 시간입니다. next.js 차원에서도 localfont를 통해 CLS를 방지해주는 swap 옵션을 제공해주고 있습니다.  
그래도 이는 분명 무거운 용량임에는 틀림없고 서버의 트래픽 사용량에도 악영양을 끼칠 것으로 보였습니다.

# 서브셋 폰트

서브셋 폰트는 쉽게 말해서 쓸 글자만 모아놓은 폰트입니다.
예를들어 일상에 쓰지 않는 긲,꿣 이런 단어는 제외하고 정말 실생활에서 자주 쓰는 글자만 모은 폰트입니다.
그리고 이렇게 모은 폰트들을 쪼개어 만들어 필요할 때 가져와 적용하는 방식입니다.

```css
@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css");
```

pretendard에서 제공해주는 서브셋 폰트를 적용했습니다.
그 결과 용량이 아래처럼 바뀌었습니다!

### 이전

![image](https://github.com/user-attachments/assets/b4dc74b5-3fb0-4fbd-8637-c59ff2e22188)

### 이후

![image](https://github.com/user-attachments/assets/e6fb7663-45f3-486d-9f86-ee441081a652)
무려 2.1mb -> 240kb로 10배나 가까이 줄었습니다!

# preload를 적용

![image](https://github.com/user-attachments/assets/2ff07030-ba58-4b2c-ae3d-0681585f3c7c)  
그래서 기존 global.css에 import 했더니 lighthouse에서 이런 결과가 나옵니다.
렌더링 차단 리소스는 현 시점에서 css를 말하는데 import를 하면

global.css 로드 완료 -> 폰트 css 로드

과정을 순차적으로 거쳐야하기 때문입니다.

이를 해결하기 위해 자료를 찾았습니다.  
[Optimize web fonts](https://web.dev/learn/performance/optimize-web-fonts)
구글 개발자들의 한 글입니다.
css 내부에 font-face가 존재한다면 스타일시트가 적용될때까지 폰트는 적용이 안된다는 내용입니다.
그래서 이를 해결하기 위해 미리 로딩을 해 놓으라는 내용이였습니다.  
그래서 이와 같은 방식으로 폰트를 넣었습니다.

```tsx
<html lang="en">
  <head>
    <link
      rel="preload"
      as="style"
      href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
      crossOrigin="anonymous"
    />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
    />
  </head>

  <body className="font-pretendard scrollbar">
    <Header />
    <div id="modal-root" />
    <Provider>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </Provider>
    <Footer />
    {modal}
  </body>
</html>
```

미리 preload 시키고 이를 적용하는 방식을 사용했습니다.  
![image](https://github.com/user-attachments/assets/532c6e8d-80ea-4ef8-81fe-1309064ac9fc)  
해결해야 할 여러 문제중 하나를 없앴습니다.

## 그럼 서브셋 폰트는 최고인가?

당연히 단점이 있습니다. 만약 네트워크 요청결과로 나온 내용이 현재 로드된 폰트에 포함되어 있지 않다면 추가적으로 가져와야 합니다. 또한 Next.js의 함수를 이용하는게 아니기 때문에 CLS가 발생할 수 있습니다. 그래서 결국 새로운 내용이 나와 현재 폰트에 포함이 안되어 있다면, CLS가 발생 할 수 있습니다.

</details>
<details>
<summary>이미지 최적화에 관하여</summary>
# Next.js에는 이미 강력한 도구가 있다!

Next.js에는 image 태그가 있습니다. 이는 다음과 같은 기능을 제공합니다.

- lazy loading
- 이미지 사이즈 최적화
- placeholder 제공

그러나 next.js 서버에서 이미지를 처리해주는데 리소스를 사용한다는 단점이 있습니다.  
이미지가 랜덤성이 짙다면 캐싱하고 리사이징하는데 많은 리소스를 사용 할 수도 있습니다.

그래도 서버 트래픽을 줄여주는 강력한 장점도 있기 때문에 많이 쓰입니다.

# S3랑 쓰면 좋겠는데?

저도 그렇게 생각했습니다.  
그런데 한가지 의문이 들었습니다. Next.js는 EC2에서 동작하는데 결국 EC2 - 클라이언트 간에 이미지 트래픽이 발생하는게 아닌가 하는 의심이 들었습니다.
![image](https://github.com/user-attachments/assets/e25df89c-7dd0-4def-84cb-087eef914782)  
테스트를 위해 vercel 스토리지에 보관하고 있던 이미지를 불러왔습니다.  
요청 url을 보면 놀랍게도 localhost를 거쳐 날아오는 것을 볼 수 있습니다. 즉 vercel blob서비스에서 바로 가져온 것이 아닌, next.js 서버를 통해 가져왔다는 의미가 되고, 이는 정적 호스팅 서비스의 장점을 해치는 결과로 이어집니다.

# 그러면 어떻게 바로 가져오게 해?

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: "default",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "호스트명",
      },
    ],
  },
};

export default nextConfig;
```

기본적으로 next.config.js에 사용할 외부 호스트를 적습니다.

```tsx
"use client";

import cloudfrontImageLoader from "@/component/common/image/cloudfront-image-loader";
import Image, { ImageProps } from "next/image";

const cloudfrontImageLoader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) => {
  const url = new URL(`https://sampleCloudimage${src}`);
  url.searchParams.set("format", "auto");
  url.searchParams.set("width", width.toString());
  url.searchParams.set("quality", (quality || 75).toString());
  return url.href;
};

const CFImage = (props: ImageProps) => {
  return <Image {...props} loader={cloudfrontImageLoader} />;
};

export default CFImage;
```

그리고 이런 컴포넌트를 만들어주었습니다.

이 내용은 즉, 기본적인 이미지 태그를 쓰되, 이미지 로더를 변경하겠다는 뜻입니다.

# 이미지 로더가 뭔데?

next.js가 이미지를 가져올 때, 어떤 url을 사용할 지 정해주는 콜백함수 입니다.  
src url이 인자로 넘어가고, 이를 원하는대로 url을 수정해 서버측에 전달합니다. 즉 이미지 최적화 부분을 s3 혹은 cloudfront로 넘기는 것입니다.

![image](https://github.com/user-attachments/assets/b39d8346-f9dd-4840-9e25-54d0bc1449a7)

테스트 해보니 정적 스토리지에서 잘 가져오는 것을 확인할 수 있었습니다.
저희가 해야 할 남은 일은 cloudFront에 요청시, 원하는 사이즈, 퀄리티, 포멧등을 적어줘 요청하는 것입니다.

그러면 cloudFront에서 이를 받고 lambda,s3와 연계해 원하는 이미지를 전송 할 수 있도록 구축하면 next.js가 직접 이미지를 최적화 하지 않아도 됩니다.

# AWS 이미지 최적화

AWS 이미지 최적화를 어쩌다보니 제가 담당하게 되었습니다.

이미지를 AWS에서 최적화한다는 것은, 요청에 따른 적절한 이미지 리사이징이 이루어진다는 것입니다.
그러면 리사이징이 이루어지는 타이밍은 언제일까요?

- 이미지가 업로드 된 직후
- 이미지 요청이 들어온 직후

초기에 제가 구현한 방식은 이미지가 업로드 된 직후 정해진 사이즈로 리사이징을 자동으로 해주는 것입니다.
람다에서 동작하며 코드는 https://oliveyoung.tech/2023-05-19/aws-lambda-resize/ 를 참고했습니다.

하지만 해당 방식의 장점은 콜드 스타트가 없다는 점이지만, 필요없는 모든 사이즈도 리사이징 해준다는 단점이 있습니다.

그래서 저는 아래 글을 참고하며 aws 서비스를 생성했습니다.
https://aws.amazon.com/ko/blogs/networking-and-content-delivery/image-optimization-using-amazon-cloudfront-and-aws-lambda/
![image](https://github.com/user-attachments/assets/440e73b7-63f6-4749-a39e-cc1f30a74b26)

해당 구조의 플로우는 다음과 같습니다.

1. 이미지 요청이 CF로 들어옴.
   2-1. 이전에 해당 해상도에 최적화된 이력이 있다면 해당 이미지 반환
   2-2-1. 없다면 lambda를 통해 새로운 이미지 s3에 저장
   2-2-2. 생성한 이미지를 사용자에게 반환

해당 플로우는 콜드 스타트의 문제가 있지만, 서버의 사용량을 줄일 수 있다고 판단해 프로젝트성에 적합하다고 판단해서 해당 방법을 채택했습니다.

</details>
<details>
<summary>SSR -> SSG 최적화</summary>
# 어쩌다보니 모든 컴포넌트가 SSR이 되어버렸다!

저번에 jotai의 useHydrateAtoms을 통해 서버에서 얻은 기기타입을 jotai의 초기 상태값으로 지정해주었습니다.
그런데 예상치 못한 문제가 발생했습니다.  
![image](https://github.com/user-attachments/assets/f5ef4073-55ba-48d1-911f-b2799cfd7c9c)  
빌드하고 보니까 모든 컴포넌트가 SSR으로 변해있었습니다!  
서버에서 필요한 값이 하위 컴포넌트에 필요한 모양이라 그런듯 합니다
![image](https://github.com/user-attachments/assets/44114de3-864d-4183-8efe-5b5e2dae51d4)  
이전에는 이랬습니다.

사실 한두명 들어오는 서비스의 사용자 입장에서는 별 상관 없습니다. 로딩해야할 용량이 커진것도 아니고 한두명 서비스하는데 SSR이라고 성능에 문제를 미치지 않을 테니까요. 그러나 만약? 천명이 동시에 사용하는 서비스라면 어떨까요?

k6 를 통해 한번 간단하게 테스트 해보죠.

# k6란?

[참고자료] (https://velog.io/@bubblegum95/TIL-K6%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%9C-%EB%B6%80%ED%95%98%ED%85%8C%EC%8A%A4%ED%8A%B8)

```
k6는 Go로 작성된 성능 및 부하 테스트 도구로, 환경 설정이나 테스트 스크립트를 JavaScript 파일(.js) 형식으로 작성합니다. YAML이나 다른 형식이 아닌, JavaScript를 사용하는 것이 k6의 특징 중 하나입니다. 이를 통해 사용자는 테스트 시나리오를 프로그래밍 방식으로 세밀하게 제어할 수 있으며, 조건부 로직, 변수 사용, 외부 데이터 소스로부터 데이터 가져오기 등 복잡한 테스트 케이스를 구현할 수 있습니다.
```

라고 합니다

## 작성 시나리오

간략하게 동시접속자 1000명을 예시로 테스트해봤습니다.
![image](https://github.com/user-attachments/assets/816df884-03b0-4995-80ea-2755854dc690)
SSR의 경우
![image](https://github.com/user-attachments/assets/5bf7f80e-4988-4ec9-9b42-8d3c2d102580)
SSG의 경우

속도가 어마어마하게 느려졌습니다. 모든 페이지가 SSR인 경우입니다 전반적으로 4배 정도 느려지는 경향이 있습니다.

# SSG가 적용되지 않는다.

저희 팀은 기존에 Next14 버전을 사용하고 있었습니다.

모달을 만들때 Parallel Route와 Intercept Route를 조합해 모달 페이지를 구현했습니다.  
그러나 빌드 후 예상치 못한 문제를 발견했습니다.  
<img width="458" alt="image" src="https://github.com/user-attachments/assets/822717e5-62a6-45d0-8700-68d9acc63e7d" />

현재 로그인 페이지가 모달페이지로 구현되어 있는데, 변화되는 값이 없음에도 불구하고 SSR로 렌더링 되는 문제가 있었습니다.

https://github.com/vercel/next.js/issues/52842

# 해결책은?

같은 문제를 겪는 이슈가 이미 존재했고 이에 대한 해결책은 15버전 업데이트 였습니다.
<img width="458" alt="image" src="https://github.com/user-attachments/assets/22f00965-7b6a-407c-8921-7b56280e370c" />  
15 버전 업데이트 후 정상적으로 모달에 SSG가 적용됨을 알 수 있었습니다.

두번째로 generateStaticParams를 통해 미리 렌더링 되어야 할 페이지를 생성해 주는 것입니다.
미리 들어갈 파라미터를 알려주고 해당 페이지에 대해서는 미리 생성합니다.

# 업데이트 후 사이드 이팩트가 있었는가?

## framer motion 라이브러리가 동작하지 않는다.

framer motion은 react18 버전에 의존하고 있기 때문에 react19 버전을 사용하는 next15와 호환되지 않는 문제가 있습니다. 그러나 현재 framer-motion을 적극적으로 사용하고 있지는 않으므로 이를 대신해줄 다른 라이브러리를 찾아야 할 예정입니다.

## 기존 request API들이 비동기로 변경됨

https://nextjs.org/blog/next-15#async-request-apis-breaking-change  
기존 headers, cookies 같은 함수가 비동기로 변경되었습니다. 이에 따라 동기적으로 동작하던 로직들을 비동기 로직으로 변경해야 합니다.

</details>
