#### 1. IOS에서는 볼륨조절을 지원하지 않는다.

IOS 운영체제 에서는 다음과 같은 정책이 있다.

- [IOS 음량정책](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html)

```
Volume Control in JavaScript
On the desktop, you can set and read the volume property of an <audio> or <video> element. This allows you to set the element’s audio volume relative to the computer’s current volume setting. A value of 1 plays sound at the normal level. A value of 0 silences the audio. Values between 0 and 1 attenuate the audio.

This volume adjustment can be useful, because it allows the user to mute a game, for example, while still listening to music on the computer.

On iOS devices, the audio level is always under the user’s physical control. The volume property is not settable in JavaScript. Reading the volume property always returns 1.
```

IOS 에서는 자바스크립트로 물리적인 볼륨 조절이 안된다는 정책이다.
<br></br>
하지만 IOS 상에서도 볼륨 조절 기능을 제공하고 싶었다.
따라서 조금 생각을 바꾸어 볼륨을 조절해봤다.

- 기기의 볼륨이 아니라 음원 자체의 볼륨을 조절하면 가능하지 않을까?

따라서 음악의 Gain값을 조절해 음량 조절 기능을 제공한다.

- [GainNode, WebAudioAPI를 이용한 음량 조절](https://github.com/LEEGURTS/MKBNEWWEB/blob/master/src/components/MusicPlay/MusicPlayer.tsx#L389)

#### 2. 매번 음원을 로딩하는건 큰 부담이다.

음원 하나당 용량이 5mb 쯤 한다. 이렇게 큰 음원은 로딩을 자주할수록 결국 비용과 직결된다.
<br></br>
그러나 localstorage에 저장하기엔 용량지원이 5mb 뿐이고 string 밖에 저장을 지원하지 않는다.
따라서 indexDB에 blob 형태로 저장해두어 재접속시 이를 이용해 재생한다.

- [음원파일을 받아 blob 형태로 저장, 이미 있을시에는 이를 통해 재생](https://github.com/LEEGURTS/MKBNEWWEB/blob/master/src/components/MusicPlay/MusicPlayer.tsx#L195C9-L195C25)
