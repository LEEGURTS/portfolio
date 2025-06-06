# 한글 분석법
## 한글 유니코드의 구성
### 한글 유니코드 구성법
단어 = 44032 + (28 * 21 * 초성 인덱스) + (28 * 중성 인덱스) + (종성 인덱스)
### 유니코드 예시

가 44032  
각 44032 + 1  
갂 44032 + 2  
...

개 44032 + 28  
객 44032 + 28 + 1  
갞 44032 + 28 + 2  
...

까 44032 + 28 * 21  
깍 44032 + 28 * 21 + 1  
...  

하 44032 + 28 * 21 * 18  
...  
힣 44032 + 28 * 21 * 18 + 28 * 20 + 27  

## 한글을 영어 타이핑으로 분해
1. 문장을 한 글자씩 순회한다.
2. 한 글자씩 초성, 중성, 종성을 기준으로 토큰을 분리한다.
3. 분리한 토큰의 인덱스를 찾는다.
``` ts
const cho = Math.floor((code - 44032) / 588);
const jung = Math.floor(((code - 44032) / 28) % 21);
const jong = ((code - 44032) % 28) - 1;
```
4. 인덱스를 기반으로 영문으로 재조립한다.
``` ts
const CHO_DATA = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";
const JUNG_DATA = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ";
const JONG_DATA = "ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ";

const korDict: Record<string, string> = {
  ㄱ: "r",
  ㄲ: "R",
  ㄴ: "s",
  ㄷ: "e",
  ㄸ: "E",
  ㄹ: "f",
  ㅁ: "a",
  ㅂ: "q",
  ㅃ: "Q",
  ...
};


result = korDict[CHO_DATA[cho]] +
          korDict[JUNG_DATA[jung]] +
          //종성이 존재하면 korDict을 통해 출력, 없으면 빈 문자열 출력
          (jong >= 0 ? korDict[JONG_DATA[jong]] : "")
```
## 영어를 한글 타이핑으로 조합

1. 영단어를 한 단어씩 For문으로 조회
2. stack에 단어 쌓기. 이 때 한글이 생성될 수 있는 케이스들을 switch문과 if문을 통해 묶음
```ts
export const engToKor = (eng: string) => {
  const engArr = eng.split("");
  let result = "";
  let stack: string[][] = [];
  let cur: string[] = [];

  for (let i = 0; i < engArr.length; i++) {
    const eng = engArr[i];
    if (ENG_KEY.includes(eng)) {
      switch (cur.length) {
        case 0:
          // 초
          // 중
          cur.push(eng);
          break;
        case 1:
          // 초 중
          if (choDict[cur[0]] && jungDict[eng]) {
            cur.push(eng);
          }
          // 중중
          else if (jungDict[cur[0] + eng]) {
            cur.push(eng);
          } else {
            stack.push(cur);
            cur = [eng];
          }
          break;
        case 2:
          // (특이 케이스) 초중 초중
          if (
            choDict[cur[0]] &&
            jungDict[cur[1]] &&
            choDict[eng] &&
            i < engArr.length - 1 &&
            jungDict[engArr[i + 1]]
          ) {
            stack.push(cur);
            cur = [eng];
          }
          // 초 중 종
          else if (choDict[cur[0]] && jungDict[cur[1]] && jongDict[eng]) {
            cur.push(eng);
          }
          // 초 중중
          else if (choDict[cur[0]] && jungDict[cur[1] + eng]) {
            cur.push(eng);
          } else {
            stack.push(cur);
            cur = [eng];
          }
          break;
        case 3:
          //(특이 케이스) 초중종 초중
          if (
            choDict[cur[0]] &&
            jungDict[cur[1]] &&
            jongDict[cur[2]] &&
            i < engArr.length - 1 &&
            choDict[eng] &&
            jungDict[engArr[i + 1]]
          ) {
            stack.push(cur);
            cur = [eng];
          }
          //(특이 케이스) 초 중중 초중
          else if (
            choDict[cur[0]] &&
            jungDict[cur[1]] &&
            jungDict[cur[2]] &&
            i < engArr.length - 1 &&
            choDict[eng] &&
            jungDict[engArr[i + 1]]
          ) {
            stack.push(cur);
            cur = [eng];
          }
          // 초 중 종종
          else if (
            choDict[cur[0]] &&
            jungDict[cur[1]] &&
            jongDict[cur[2] + eng]
          ) {
            cur.push(eng);
          }
          // 초 중중 종
          else if (
            choDict[cur[0]] &&
            jungDict[cur[1] + cur[2]] &&
            jongDict[eng]
          ) {
            cur.push(eng);
          } else {
            stack.push(cur);
            cur = [eng];
          }
          break;
        case 4:
          //(특이케이스) 초중중종 초중
          if (
            choDict[cur[0]] &&
            jungDict[cur[1] + cur[2]] &&
            jongDict[cur[3]] &&
            i < engArr.length - 1 &&
            choDict[eng] &&
            jungDict[engArr[i + 1]]
          ) {
            stack.push(cur);
            cur = [eng];
          }

          // 초 중중 종종
          else if (
            choDict[cur[0]] &&
            jungDict[cur[1] + cur[2]] &&
            jongDict[cur[3] + eng]
          ) {
            cur.push(eng);
          } else {
            stack.push(cur);
            cur = [eng];
          }
          break;
        default:
          stack.push(cur);
          cur = [eng];
      }
    } else {
      stack.push(cur);
      cur = [eng];
    }
  }
  if (cur.length > 0) stack.push(cur);
  stack.forEach((s) => {
    result += stackToKor(s);
  });
  return result;
};
```

3. 큐에 쌓인 영단어를 기반으로 한글로 매핑.
4. 한글은 초성 중성 종성으로 이루어져 있으므로 순서대로 파싱해 새로운 한글 생성 후 병합