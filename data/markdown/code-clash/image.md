# 정적 이미지는 어떻게 관리할까?

# 아바타

![0b034b92d2ce3f3280a4516002540abd4f23298e](https://github.com/boostcampwm2023/web06-CodeClash/assets/79559361/bd1995fb-be8f-4d5b-94e5-461e1cb111d3)

게임의 디자인을 좀 더 귀엽게 보이고자 아바타를 삽입해주려 했다. 그러나 문제가 발생한다.
애매하게 아바타 이미지의 총 용량이 10mb 쯤 했다. FE public에 다 실어주기에는 많은거 같고, BE에 맞기기에는 굳이? 라는 느낌이 들었다.

# AWS S3

정적 파일 호스팅 서비스 중 하나. 이미지 영상등 정적인 파일을 전송해주는 서비스이다.
그래서 사용할까? 했으나…

# Webp

구글이 적극 권장하고 무료로 배포해버린 이미지 파일 포멧 중 하나. 무손실, 손실 압축 둘다 지원하고 기존 이미지에 비해 무려 수배로 압축이 가능하다.(랜덤, 이미지가 너무 크면 의미 x)
심지어 투명 배경도 지원한다고 한다.

압축 결과
![image](https://github.com/boostcampwm2023/web06-CodeClash/assets/79559361/7a1e4178-0a93-495d-b09e-6c5c675637d7)
![image](https://github.com/boostcampwm2023/web06-CodeClash/assets/79559361/aeb507d5-96a2-4e2b-9a5c-5c05a0424c77)
![image](https://github.com/boostcampwm2023/web06-CodeClash/assets/79559361/8819ede4-7514-43d1-9f0f-9c3b29285d3a)

10mb → 2.5mb 로 팍 줄어버렸다!
손실 압축이긴 하다. 그러나 아이콘으로 사용할 예정이라 이정도 크기만 해도 매우 충분하다.

# dynamic import

하지만 이미지 파일은 하나가 아니다.
이걸 아래처럼 import 해버리면 끔찍한 코드가 되고 말 것이다.

```javascript
import avatar0 from "../../assets/avatar/0.webp"
import avatar1 from "../../assets/avatar/1.webp"
...
import avatar20 from "../../assets/avatar/20.webp
```

"import" 구문만 20줄이 될 뿐더러 로딩하지도 않는 이미지를 다 불러와야한다.

따라서 dynamic import를 통해 필요한 webp만 클라이언트 단에서 로딩하도록 적용했다.

```javascript
const [avatar, setAvatar] = useState < string > "";

useEffect(() => {
  if (userName) {
    import(`../../assets/avatar/${hashAvatarIdx(userName)}.webp`).then(
      (res) => {
        setAvatar(res.default);
      }
    );
  }
}, [userName]);
```

userName이 존재하면 이걸 가져와서 간단한 해쉬 함수를 거친다. 그 결과로 나온 Idx순서로 webp 파일을 적용시킨다.

# 더 하면 좋은것

과연 1366*768 정도의 작은 모니터에도 768*768 정도의 아바타가 필요할까? 사실 아니다. 정말 극한의 해상도인 5k를 고려해서 아바타를 극적으로 크게 생성했다. 그러나 작은 모니터에서는 저렇게 클 필요가 없다. 그러면 어떤걸 적용하는게 좋을까?

## img loading="lazy"

보이지 않는 곳에 img 태그가 존재하면 로딩하지 않아도 된다는 뜻. 화면에 보이기 시작해야 로딩을 한다.
그러나 이 방법은 현재 프로젝트에 적용 불가능하다. 스크롤 자체가 존재하지 않아서 보이지 않는 부분은 존재하지 않기 때문이다.

## img srcset=""

해상도에 따라서 다른 이미지를 선택할 수 있게 한다. 소스 셋이기 때문에 width에 따른 여러 이미지를 삽입해 줄 수 있다. 단점이라고 하면 webp가 안된다 .

```
<img
  srcset="
    /image.png?width=100 100w,
    /image.png?width=200 200w,
    /image.png?width=400 400w,
    /image.png?width=800 800w
  "
>
```

## picture and source

webp를 사용하기 위해 이를 이용한다.

```
<picture>
  <source
    type="image/webp"
    srcset="
      /image.webp?width=100 100w,
      /image.webp?width=200 200w,
      /image.webp?width=400 400w,
      /image.webp?width=800 800w
    " />
  <img ... />
</picture>
```

사용 방법은 이와 같고 img 태그는 picture 태그가 동작하지 않는 브라우저에서 대체제를 위해 삽입한 것이다.
