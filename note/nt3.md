---
layout: note
title: AI稀羽制作日記#01
firstedit: 2022/06/12
finaledit: 2022/06/14
headimg: AIusuwaProject.png
---

# AI稀羽制作日記 #01
## なにを目論んでいるのか
これは、ある時ふと *「稀羽すうを歌うAIにしたい」*  
と思ってしまった男の物語——  



　ただし日記の名の通り、この計画は *進行中* であり、
### 完成の目途も立っていない
ひどい話である  



　それでもこうして世にこれを公開するというのは、  
機械学習に関する*備忘録*であったり、自らを*戒め*の意味があるのだ  
ずんだもんなのだ  



こんなことを書き連ねても仕方がないのでさっさと本題に入りたい
- - -
## 早速制作に取り掛から...ない
というのも、機械学習はからっきし。  
画像認識をちょびっと齧った程度なので、  
 - やりたいことを整理  
 - 必要な知識を蓄える  
  
ここから始めたい  



## 作るもの  
#### 楽譜を渡すと歌ってくれるやつ  
類似のものに、  
 - NEUTRINO  
 - CeVIO AI  
  
などがあるので参考にしたい

#### 学習データについて
これはこのプロジェクトを始めたきっかけにも繋がる話で、  
以前やっていた*アカペラ配信*これが学習データとして使えるのではないかと考えた  
<blockquote class="twitter-tweet"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/%E3%81%9F%E3%81%A0%E3%81%84%E3%81%BE%E3%81%86%E3%81%99%E3%82%8F?src=hash&amp;ref_src=twsrc%5Etfw">#ただいまうすわ</a><br>歌声の後ろに音が入ってないから<br>このデータ　AIとかに学習させやすそう<br>『シングAI稀羽』←欲しい</p>&mdash; にものさん@三点倒立四天王,ハッカ油 (@2mon00) <a href="https://twitter.com/2mon00/status/1525807036885532672?ref_src=twsrc%5Etfw">May 15, 2022</a></blockquote>
↑すべての元凶  


　しかし-もしも-最近の技術で、普段の歌枠からもキレイにボーカル抽出ができるなら  
学習データには困らないだろう  
てかできそう...科学の力って(ry  


でも結局あの娘、歌ってる途中にコールとか要求してきて  
VTuberとして最高だけど歌唱データに向かないんだよねかわいい  


　とにかく、始めはちゃんとしたデータで学習させたほうがいいので(楽譜データもないといけないし...)  
しばらく[きりたんのデータ](https://zunko.jp/kiridev/login.php "きりたん歌唱データベース")に頑張ってもらう  



## 足りない知識
 - 学習手法 ...GANだとかRNNだとか
 - フレームワーク ...Kerasは少し使った。PyTorch, Chainerは分からない
 - 音声学 ...人の声を合成するので要る  
  
などなど


これを計画するにあたってChainer公式の「機械学習に必要な知識」みたいなページは読んだ。ためになった  
音声学に関しては、以前から気になって調べていて(というか最近流行ったのかも)、  
知らないよりはちょっといいかもしれない(希望的観測)  



## 音の学習について(妄想)
「なんか既存の音声合成だと音素のデータを *"p"* とか *"た"* とか  
　非連続でバラバラのデータとして扱って学習に使ってるイメージだから、  
　これを *"無声両唇破裂音"* みたいな 他と繋がってる要素として扱ってみたいなぁ」  
 
 
とか適当なこと考えてます  


つまり、音素ごとに\[p, s, t, ...]=\[0, 1, 2, ...] と IDを振るような形でなく  
\[p, s, t, ...] = \[\[無声, 両唇, 破裂], \[無声, 歯茎, 摩擦], ...]というデータ  
もっと言えば、これを表す音素ベクトルを用いて学習したいな、と  


｡oO(でも常識的に考えて、IDを振る手法ってデメリットだらけだし、  
　　　ほかの人らが既にもっと良いことを考えているのでは？)  
まあ頑張っていきたい  


今取り掛かるできもの①は、この「音素ベクトル」の設計ってことで。  
進展があれば次回にでも報告したい　　


## Pythonで機械学習(難所)
*まるっきりわかんない*  
とりあえずNEUTRINOさんがこんなこと言ってるのを見つけた  
<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">使用しているフレームワークはこちらになります。<br>Sinsy（<a href="https://t.co/IuD9qckaLH">https://t.co/IuD9qckaLH</a>）<br>WORLD（<a href="https://t.co/dTuF9I5LpQ">https://t.co/dTuF9I5LpQ</a>）<br>chainer（<a href="https://t.co/fTzAzimgja">https://t.co/fTzAzimgja</a>）<br>NSF（<a href="https://t.co/N4nataVL5l">https://t.co/N4nataVL5l</a>）</p>&mdash; NEUTRINO（歌声シンセサイザー）公式 (@SHACHI_NEUTRINO) <a href="https://twitter.com/SHACHI_NEUTRINO/status/1201856414844641280?ref_src=twsrc%5Etfw">December 3, 2019</a></blockquote>  
Chainer, WORLDのことを少し調べる。  
(WORLDのことを調べるうちに、Pythonでのwavファイル操作の経験がないことに気づき齧る)  


さてさて、成功例から*道具を学んだ*ので、あとは学習手法か何かの勉強に入りたいところ  
多分ニューラルネットワーク(NN)を*ごちゃごちゃやればいい*  


個人的に分からないのが、今のように入出力が可変長の場合の処理  
ググってすぐに引っかかるのはLSTM？とか  


[ここ](https://www.youtube.com/c/NeuralNetworkConsole "Neural Network Console - YouTube")が参考になりそうなので  
ちゃんと履修しておこう  


* * *
今回はここら辺にして、また次回に回したい  
さっさと*きりたんを使ったサンプル*を作れるところまでは行きたい所存  

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
