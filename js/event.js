function startEvent(messages, friend=null){
document.getElementById("area-name").style.display = "none";
 // 他のBGM停止
 
 shopBgm.pause();
shopBgm.currentTime = 0;
 fieldBgm.pause(); 
 battleBgm.pause(); 
 bossBgm.pause();
// 城の中以外では城BGMを止める
if(!castleMode){
    castleBgm.pause();
}

if(
    !openingEvent &&
    !innEvent &&
    !castleMode &&
    !guardianEvent &&
    !templeEvent
){
    eventBgm.currentTime = 0;
    eventBgm.play();
}

document.querySelector(".crossKey").style.display = "none";
    eventMode = true;
document.getElementById("skillButtons").style.display = "none";
document.getElementById("iceBtn").style.display = "none";
    eventMessages = messages;
    eventIndex = 0;

    joinFriend = friend;

    document.getElementById("field-screen").style.display = "none";
    document.getElementById("game-container").style.display = "block";

    document.getElementById("options").style.display = "none";

    showEventMessage();

}
function showEventMessage(){

    const msg = eventMessages[eventIndex];

    if(openingEvent || fullScreenEvent){

        document.getElementById("monster-img").style.display = "none";

        document.getElementById("monster-area").style.backgroundImage =
            `url('${msg.img}')`;

}else{

    if(castleMode){
        monsterArea.style.backgroundImage =
        "url('img/castle_bg.jpg')";
    }
    else if(currentMapIndex === 29){
        monsterArea.style.backgroundImage =
        "url('img/bg_boss.jpg')";
    }
    else{
        updateMonsterBackground();
    }

    document.getElementById("monster-img").style.display = "block";
    document.getElementById("monster-img").src = msg.img;
}

    textEl.innerHTML = msg.text;
}

function closeEvent(){
        // オープニング終了後
    if(openingEvent){
        document.querySelector(".crossKey").style.display = "flex";
        document.querySelector(".actionButtons").style.display = "flex";
    }
    eventBgm.pause();
    eventBgm.currentTime = 0;

    innBgm.pause();
    innBgm.currentTime = 0;
document.getElementById("iceBtn").style.display = "none";

// 宿イベント終了後に20％でうわさイベント
if(
    innEvent &&
    Math.random() < 0.2 &&
    !eventDone["innRumor"]
){
    eventDone["innRumor"] = true;

    innEvent = false;

    startInnRumorEvent();
    return;
}

    innEvent = false;

    winBgm.pause();
    winBgm.currentTime = 0;
    eventMode = false;


if(joinFriend && party.length < friendSets.length){

    party.push({
        x: player.x,
        y: player.y
    });

    if(joinFriend === "otter"){
        healCount = 1;
    }

    if(joinFriend === "orca"){
        changeCount = 1;
    }

if(joinFriend === "dolphin"){
    hintCount = 1;
}
if(joinFriend === "buncho"){
    hasBunchoMage = true;
}
    joinFriend = null;
}

    // 最終イベント後ならボス戦
if(startBossAfterEvent){

guardianBgm.pause();
fieldBgm.pause();
castleBgm.pause();   // ←追加

fieldBgm.currentTime = 0;
castleBgm.currentTime = 0;

bossBgm.currentTime = 0;
bossBgm.play();

    startBossAfterEvent = false;
     inBattle = true; 
    bossBattle = true;
    bossStreak = 0;

    updateMonsterBackground();  

    document.getElementById("field-screen").style.display = "none";
    document.getElementById("game-container").style.display = "block";

    document.getElementById("skillButtons").style.display = "flex";

    document.getElementById("healBtn").style.display =
        party.length >= 1 ? "block" : "none";

    document.getElementById("changeBtn").style.display =
        party.length >= 2 ? "block" : "none";

    document.getElementById("hintBtn").style.display =
        party.length >= 3 ? "block" : "none";

    document.getElementById("healBtn").disabled = false;
    document.getElementById("changeBtn").disabled = false;
    document.getElementById("hintBtn").disabled = false;

    document.getElementById("healBtn").innerHTML = "🦦 回復";
    document.getElementById("changeBtn").innerHTML = "🐋 問題変更";
    document.getElementById("hintBtn").innerHTML = "🐬 2択ヒント";

    document.getElementById("options").style.display = "grid";

    loadQuestion();

    return;
}
    document.getElementById("options").style.display = "grid";
    document.getElementById("skillButtons").style.display = "flex"
document.querySelector(".crossKey").style.display = "flex";
    document.getElementById("game-container").style.display = "none";
    document.getElementById("field-screen").style.display = "block";
   // フィールドへ戻ったらBGM再生
if(!castleMode && !bossBattle && !templeEvent){
    fieldBgm.currentTime = 0;
    fieldBgm.play();
}

if(openingEvent){
    openingEvent = false;

    openingBgm.pause();
    openingBgm.currentTime = 0;

    startCastle();
    return;
}
// 神殿到達イベント後は無音にする
if(currentMapIndex === 29){
    guardianBgm.pause();
    guardianBgm.currentTime = 0;
    fieldBgm.pause();
    fieldBgm.currentTime = 0;
}
document.getElementById("monster-img").style.display = "block";

updateMapTiles();
updateMonsterBackground();
if(!startBossAfterEvent){
    guardianEvent = false;
}
fullScreenEvent = false;
templeEvent = false;

document.getElementById("area-name").style.display = "block";


updateFieldStatus();

draw();


}

function triggerAreaEvent(){

    // 同じイベントを何回も出さない
    if(eventDone[currentMapIndex]) return;

    switch(currentMapIndex){

        case 6:

            eventDone[currentMapIndex] = true;
startEvent([
    {
        img:"img/otter.png",
        text:"カワウソ：ペンギン！そんなにいそいでどこへ<ruby>行<rt>い</rt></ruby>くの？"
    },
    {
        img:"img/penguin.png",
        text:"ペンギン：<ruby>伝説<rt>でんせつ</rt></ruby>のおさかなを<ruby>探<rt>さが</rt></ruby>しに<ruby>旅<rt>たび</rt></ruby>へ<ruby>行<rt>い</rt></ruby>くんだ。<ruby>魔王<rt>まおう</rt></ruby>に<ruby>支配<rt>しはい</rt></ruby>された<ruby>町<rt>まち</rt></ruby>を<ruby>救<rt>すく</rt></ruby>うためにね。"
    },
    {
        img:"img/otter.png",
        text:"カワウソ：<ruby>伝説<rt>でんせつ</rt></ruby>のおさかな……。本当にどんな願いでも<ruby>叶<rt>かな</rt></ruby>えてくれるの？"
    },
    {
        img:"img/penguin.png",
        text:"ペンギン：うん。そう言われているよ。"
    },
    {
        img:"img/otter.png",
        text:"カワウソ：<ruby>実<rt>じつ</rt></ruby>はぼくの<ruby>妹<rt>いもうと</rt></ruby>が<ruby>病気<rt>びょうき</rt></ruby>なんだ"
    },
{
    img:"img/penguin.png",
    text:"そうだったのか……。"
},
{
    img:"img/otter.png",
    text:"ぼくも<ruby>伝説<rt>でんせつ</rt></ruby>のおさかなに会いたい！ 妹を<ruby>助<rt>たす</rt></ruby>けたいんだ！"
},
{
    img:"img/penguin.png",
    text:"もちろん<ruby>一緒<rt>いっしょ</rt></ruby>に行こう！"
},
{
    img:"img/otter.png",
    text:"ありがとう！<ruby>妹<rt>いもうと</rt></ruby>のためにも<ruby>頑張<rt>がんば</rt></ruby>るよ！"
},
 {
        img:"img/otterpenguin.png",
        text:"♪カワウソが<ruby>仲間<rt>なかま</rt></ruby>になった！"
    }
],"otter");
            break;

        case 12:

            eventDone[currentMapIndex] = true;

          startEvent([
{
    img:"img/orca.png",
    text:"シャチ：やあ、<ruby>旅人<rt>たびびと</rt></ruby>たち。ずいぶん<ruby>疲<rt>つか</rt></ruby>れているみたいだね。"
},
{
    img:"img/penguin.png",
    text:"ぼくたちは<ruby>伝説<rt>でんせつ</rt></ruby>のおさかなを<ruby>探<rt>さが</rt></ruby>しているんだ。"
},
{
    img:"img/orca.png",
    text:"やっぱりか……。"
},
{
    img:"img/otter.png",
    text:"えっ？"
},
{
    img:"img/orca.png",
    text:"<ruby>昔<rt>むかし</rt></ruby>は<ruby>海<rt>うみ</rt></ruby>も<ruby>今<rt>いま</rt></ruby>よりずっときれいだったんだ。"
},
{
    img:"img/orca.png",
    text:"でも<ruby>魔王<rt>まおう</rt></ruby>が<ruby>現<rt>あらわ</rt></ruby>れてから<ruby>海<rt>うみ</rt></ruby>は<ruby>荒<rt>あ</rt></ruby>れ、<ruby>多<rt>おお</rt></ruby>くの生き物が<ruby>住<rt>す</rt></ruby>めなくなってしまった。"
},
{
    img:"img/penguin.png",
    text:"そんなことが……。"
},
{
    img:"img/orca.png",
    text:"ぼくの<ruby>願<rt>ねが</rt></ruby>いはただひとつ。<ruby>昔<rt>むかし</rt></ruby>みたいな美しい<ruby>海<rt>うみ</rt></ruby>を<ruby>取<rt>と</rt></ruby>り<ruby>戻<rt>もど</rt></ruby>すことなんだ。"
},
{
    img:"img/orca.png",
    text:"<ruby>伝説<rt>でんせつ</rt></ruby>のおさかなを<ruby>探<rt>さが</rt></ruby>すなら、ぼくも<ruby>協力<rt>きょうりょく</rt></ruby>させてほしい！"
},
{
    img:"img/penguin.png",
    text:"もちろん！<ruby>仲間<rt>なかま</rt></ruby>が<ruby>増<rt>ふ</rt></ruby>えるのは<ruby>心強<rt>こころづよ</rt></ruby>いよ！"
},
{
    img:"img/otter.png",
    text:"みんなの願いを<ruby>叶<rt>かな</rt></ruby>えるためにも<ruby>頑張<rt>がんば</rt></ruby>ろう！"
},
{
    img:"img/orca.png",
    text:"よし！ この<ruby>海<rt>うみ</rt></ruby>を<ruby>必<rt>かなら</rt></ruby>ず<ruby>元<rt>もと</rt></ruby>に<ruby>戻<rt>もど</rt></ruby>そう！"
},
{
    img:"img/orca.png",
    text:"♪シャチが<ruby>仲間<rt>なかま</rt></ruby>になった！"
}
],"orca");
            break;

        case 18:

            eventDone[currentMapIndex] = true;
  startEvent([
{
    img:"img/dolphin.png",
    text:"イルカ：やあ！ <ruby>君<rt>きみ</rt></ruby>たち、どこへ<ruby>行<rt>い</rt></ruby>くんだい？"
},
{
    img:"img/penguin.png",
    text:"ペンギン：ぼくたちは<ruby>魔王<rt>まおう</rt></ruby>に<ruby>支配<rt>しはい</rt></ruby>された<ruby>町<rt>まち</rt></ruby>を<ruby>救<rt>すく</rt></ruby>うために、<ruby>伝説<rt>でんせつ</rt></ruby>のおさかなを<ruby>探<rt>さが</rt></ruby>しているんだ！"
},
{
    img:"img/dolphin.png",
    text:"イルカ：<ruby>伝説<rt>でんせつ</rt></ruby>のおさかな……。そうだったのか。"
},
{
    img:"img/dolphin.png",
    text:"イルカ：<ruby>実<rt>じつ</rt></ruby>はぼくにも、どうしても<ruby>叶<rt>かな</rt></ruby>えたい<ruby>願<rt>ねが</rt></ruby>いがあるんだ。"
},
{
    img:"img/penguin.png",
    text:"ペンギン：どんな<ruby>願<rt>ねが</rt></ruby>いなの？"
},
{
    img:"img/dolphin.png",
    text:"イルカ：この<ruby>海<rt>うみ</rt></ruby>には、<ruby>昔<rt>むかし</rt></ruby>とても<ruby>大<rt>おお</rt></ruby>きな<ruby>図書館<rt>としょかん</rt></ruby>があったんだ。"
},
{
    img:"img/dolphin.png",
    text:"イルカ：そこには<ruby>海<rt>うみ</rt></ruby>の<ruby>生<rt>い</rt></ruby>き<ruby>物<rt>もの</rt></ruby>たちの<ruby>歴史<rt>れきし</rt></ruby>や、<ruby>昔<rt>むかし</rt></ruby>の<ruby>知識<rt>ちしき</rt></ruby>がたくさん<ruby>残<rt>のこ</rt></ruby>されていたんだ。"
},
{
    img:"img/orca.png",
    text:"シャチ：そんな<ruby>図書館<rt>としょかん</rt></ruby>があったのか！"
},
{
    img:"img/dolphin.png",
    text:"イルカ：でも、<ruby>魔王<rt>まおう</rt></ruby>が<ruby>現<rt>あらわ</rt></ruby>れてから、図書館は<ruby>荒<rt>あ</rt></ruby>らされてしまった。"
},
{
    img:"img/dolphin.png",
    text:"イルカ：<ruby>本<rt>ほん</rt></ruby>は<ruby>散<rt>ち</rt></ruby>らばり、<ruby>建物<rt>たてもの</rt></ruby>も<ruby>壊<rt>こわ</rt></ruby>れてしまったんだ……。"
},
{
    img:"img/penguin.png",
    text:"ペンギン：それは<ruby>悲<rt>かな</rt></ruby>しいね……。"
},
{
    img:"img/dolphin.png",
    text:"イルカ：ぼくは、もう<ruby>一度<rt>いちど</rt></ruby>あの<ruby>図書館<rt>としょかん</rt></ruby>を<ruby>復活<rt>ふっかつ</rt></ruby>させたいんだ！"
},
{
    img:"img/dolphin.png",
    text:"イルカ：<ruby>失<rt>うしな</rt></ruby>われた<ruby>本<rt>ほん</rt></ruby>や<ruby>知識<rt>ちしき</rt></ruby>を<ruby>取<rt>と</rt></ruby>り<ruby>戻<rt>もど</rt></ruby>して、みんなが<ruby>学<rt>まな</rt></ruby>べる<ruby>場所<rt>ばしょ</rt></ruby>を<ruby>作<rt>つく</rt></ruby>りたい！"
},
{
    img:"img/otter.png",
    text:"カワウソ：それなら、ぼくたちも<ruby>手伝<rt>てつだ</rt></ruby>うよ！"
},
{
    img:"img/penguin.png",
    text:"ペンギン：うん！ <ruby>魔王<rt>まおう</rt></ruby>を<ruby>倒<rt>たお</rt></ruby>せば、図書館を<ruby>復活<rt>ふっかつ</rt></ruby>させることもできるかもしれない！"
},
{
    img:"img/dolphin.png",
    text:"イルカ：<ruby>本当<rt>ほんとう</rt></ruby>かい！？ それなら、ぼくも<ruby>一緒<rt>いっしょ</rt></ruby>に<ruby>旅<rt>たび</rt></ruby>をさせてほしい！"
},
{
    img:"img/orca.png",
    text:"シャチ：もちろんだ！ <ruby>仲間<rt>なかま</rt></ruby>が<ruby>多<rt>おお</rt></ruby>いほど<ruby>心強<rt>こころづよ</rt></ruby>い！"
},
{
    img:"img/penguin.png",
    text:"ペンギン：みんなで<ruby>力<rt>ちから</rt></ruby>を<ruby>合<rt>あ</rt></ruby>わせて、<ruby>町<rt>まち</rt></ruby>も<ruby>図書館<rt>としょかん</rt></ruby>も<ruby>救<rt>すく</rt></ruby>おう！"
},
{
    img:"img/dolphin.png",
    text:"イルカ：ありがとう！ <ruby>失<rt>うしな</rt></ruby>われた<ruby>図書館<rt>としょかん</rt></ruby>を、もう<ruby>一度<rt>いちど</rt></ruby>よみがえらせるぞ！"
},
{
    img:"img/dolphin.png",
    text:"♪イルカが<ruby>仲間<rt>なかま</rt></ruby>になった！"
}
],"dolphin");
            break;
case 24:

    eventDone[currentMapIndex] = true;

    startEvent([
    {
    img:"img/orca.png",
    text:"シャチ：あれを見て！ <ruby>火山<rt>かざん</rt></ruby>がふんかしている！"
},
{
    img:"img/dolphin.png",
    text:"イルカ：<ruby>熱気<rt>ねっき</rt></ruby>がすごい…。ぼくたち、ここまで来たんだね。"
},
{
    img:"img/penguin.png",
    text:"ペンギン：きっと<ruby>伝説<rt>でんせつ</rt></ruby>のおさかなは、この<ruby>先<rt>さき</rt></ruby>にいる！"
},
{
    img:"img/allfriends.png",
    text:"みんなで<ruby>最後<rt>さいご</rt></ruby>の<ruby>冒険<rt>ぼうけん</rt></ruby>へ！"
},
    {
        img:"img/allfriends.png",
        text:"みんな：おー！！"
    }
    ]);

    break;

case 29:

eventDone[currentMapIndex] = true;
templeEvent = true;

fieldBgm.pause();
fieldBgm.currentTime = 0;

guardianBgm.currentTime = 0;
guardianBgm.play();

fullScreenEvent = true;
startEvent([
{
    img:"img/temple_event.jpg",
    text:"<ruby>伝説<rt>でんせつ</rt></ruby>のおさかなが<ruby>眠<rt>ねむ</rt></ruby>る<ruby>神殿<rt>しんでん</rt></ruby>に<ruby>到着<rt>とうちゃく</rt></ruby>した。"
},
{
    img:"img/temple_event.jpg",
    text:"<ruby>神殿<rt>しんでん</rt></ruby>の<ruby>奥<rt>おく</rt></ruby>から強大な<ruby>気配<rt>けはい</rt></ruby>を感じる…。"
}
]);

break;
}
}
function getIceSword(){

    if(hasIceSword) return;

    hasIceSword = true;
    freezeCount = 1;
fullScreenEvent = true;
startEvent([
    {
        img:"img/ice_temple.jpg",
        text:"<ruby>吹雪<rt>ふぶき</rt></ruby>の<ruby>中<rt>なか</rt></ruby>で<ruby>古代<rt>こだい</rt></ruby>の<ruby>氷<rt>こおり</rt></ruby>の<ruby>神殿<rt>しんでん</rt></ruby>を<ruby>発見<rt>はっけん</rt></ruby>した。"
    },
    {
        img:"img/ice_sword1.jpg",
        text:"<ruby>青<rt>あお</rt></ruby>く<ruby>輝<rt>かがや</rt></ruby>く<ruby>剣<rt>けん</rt></ruby>が<ruby>祭壇<rt>さいだん</rt></ruby>に<ruby>刺<rt>さ</rt></ruby>さっている。"
    },
    {
        img:"img/ice_sword.jpg",
        text:"ペンギンはアイスソードを<ruby>抜<rt>ぬ</rt></ruby>いた！"
    },
    {
        img:"img/ice_sword2.jpg",
        text:"❄️ アイスソードを<ruby>手<rt>て</rt></ruby>に<ruby>入<rt>い</rt></ruby>れた！"
    },
    {
        img:"img/ice_sword2.jpg",
        text:"<ruby>戦闘中<rt>せんとうちゅう</rt></ruby>に1<ruby>回<rt>かい</rt></ruby>だけ『フリーズストーム』が<ruby>使<rt>つか</rt></ruby>えるようになった！"
    }
]);
}

function startBossEvent(){
guardianEvent = true;
    if(eventDone["guardian"]) return;

    eventDone["guardian"] = true;

     eventBgm.pause();
    eventBgm.currentTime = 0;
    startBossAfterEvent = true;
    fieldBgm.pause(); 
    fieldBgm.currentTime = 0;

    guardianBgm.currentTime = 0;
    guardianBgm.play();

   startEvent([
        {
            img:"img/orca.png",
            text:"シャチ：ん？ みんな、あそこを見て！"
        },
        {
            img:"img/otter.png",
            text:"カワウソ：どうしたの？"
        },
        {
            img:"img/orca.png",
            text:"シャチ：<ruby>神殿<rt>しんでん</rt></ruby>の<ruby>奥<rt>おく</rt></ruby>に、だれかいる！"
        },
        {
            img:"BOSS.png",
            text:"ガーディアン：……よくここまで<ruby>来<rt>き</rt></ruby>たな。"
        },
        {
            img:"img/penguin.png",
            text:"ペンギン：あなたは……だれ？"
        },
        {
            img:"BOSS.png",
            text:"ガーディアン：私は、この<ruby>神殿<rt>しんでん</rt></ruby>を<ruby>守<rt>まも</rt></ruby>るガーディアン。"
        },
        {
            img:"BOSS.png",
            text:"ガーディアン：ここには、これまで<ruby>多<rt>おお</rt></ruby>くの<ruby>挑戦者<rt>ちょうせんしゃ</rt></ruby>が<ruby>訪<rt>おとず</rt></ruby>れた。"
        },
        {
            img:"img/dolphin.png",
            text:"イルカ：<ruby>多<rt>おお</rt></ruby>くの挑戦者……？"
        },
        {
            img:"BOSS.png",
            text:"ガーディアン：ああ。<ruby>魔王<rt>まおう</rt></ruby>も、<ruby>王様<rt>おうさま</rt></ruby>も、そして<ruby>昔<rt>むかし</rt></ruby>の<ruby>勇者<rt>ゆうしゃ</rt></ruby>も、かつてここへ<ruby>来<rt>き</rt></ruby>た。"
        },
        {
            img:"img/penguin.png",
            text:"ペンギン：魔王まで……！？"
        },
        {
            img:"BOSS.png",
            text:"ガーディアン：みな、<ruby>伝説<rt>でんせつ</rt></ruby>のおさかなの<ruby>力<rt>ちから</rt></ruby>を<ruby>求<rt>もと</rt></ruby>めていた。"
        },
        {
            img:"BOSS.png",
            text:"ガーディアン：しかし、その<ruby>力<rt>ちから</rt></ruby>を<ruby>手<rt>て</rt></ruby>にするには、<ruby>試練<rt>しれん</rt></ruby>を<ruby>乗<rt>の</rt></ruby>り<ruby>越<rt>こ</rt></ruby>なければならない。"
        },
        {
            img:"img/orca.png",
            text:"シャチ：その<ruby>試練<rt>しれん</rt></ruby>っていうのは……？"
        },
        {
            img:"BOSS.png",
            text:"ガーディアン：<ruby>力<rt>ちから</rt></ruby>だけではない。お前たちが<ruby>何<rt>なに</rt></ruby>を<ruby>大切<rt>たいせつ</rt></ruby>にしているのか、それを見せてもらう。"
        },
        {
            img:"img/penguin.png",
            text:"ペンギン：ぼくたちは、みんなを<ruby>救<rt>すく</rt></ruby>うためにここまで来た。"
        },
        {
            img:"BOSS.png",
            text:"ガーディアン：ならば、その<ruby>覚悟<rt>かくご</rt></ruby>を<ruby>証明<rt>しょうめい</rt></ruby>してみろ。"
        },
        {
            img:"BOSS.png",
            text:"ガーディアン：さあ、<ruby>最後<rt>さいご</rt></ruby>の<ruby>試練<rt>しれん</rt></ruby>を<ruby>始<rt>はじ</rt></ruby>めよう！"
        }
    ]);
}
