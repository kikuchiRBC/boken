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
        text:"カワウソ：ペンギン！ そんなにいそいでどこへ<ruby>行<rt>い</rt></ruby>くの？"
    },
    {
        img:"img/penguin.png",
        text:"ペンギン：<ruby>伝説<rt>でんせつ</rt></ruby>のおさかなを<ruby>探<rt>さが</rt></ruby>しに<ruby>旅<rt>たび</rt></ruby>へ<ruby>行<rt>い</rt></ruby>くんだ。<ruby>魔王<rt>まおう</rt></ruby>に<ruby>支配<rt>しはい</rt></ruby>された<ruby>町<rt>まち</rt></ruby>を<ruby>救<rt>すく</rt></ruby>うためにね。"
    },
    {
        img:"img/otter.png",
        text:"カワウソ：そうだったのか！ ぼくも<ruby>町<rt>まち</rt></ruby>のみんなを<ruby>助<rt>たす</rt></ruby>けたい！ いっしょに<ruby>連<rt>つ</rt></ruby>れていってよ！"
    },
    {
        img:"img/penguin.png",
        text:"ペンギン：もちろん！ <ruby>仲間<rt>なかま</rt></ruby>がいると<ruby>心強<rt>こころづよ</rt></ruby>いよ。"
    },
    {
        img:"img/otter.png",
        text:"カワウソ：よーし！ みんなのためにがんばるぞ！"
    },
    {
        img:"img/penguin.png",
        text:"ペンギン・カワウソ：おー！"
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
    img:"img/otter.png",
    text:"カワウソ：ペンギン、そろそろおなかがすいてきたね。"
},
{
    img:"img/penguin.png",
    text:"ペンギン：うん…。<ruby>伝説<rt>でんせつ</rt></ruby>のおさかなを<ruby>探<rt>さが</rt></ruby>す<ruby>旅<rt>たび</rt></ruby>は、なかなかたいへんだな。"
},
{
    img:"img/orca.png",
    text:"シャチ：やあ！ きみたち、どうしたの？"
},
{
    img:"img/penguin.png",
    text:"ペンギン：ぼくたちは<ruby>魔王<rt>まおう</rt></ruby>に<ruby>支配<rt>しはい</rt></ruby>された<ruby>町<rt>まち</rt></ruby>を<ruby>救<rt>すく</rt></ruby>うために、<ruby>伝説<rt>でんせつ</rt></ruby>のおさかなを<ruby>探<rt>さが</rt></ruby>しているんだ。"
},
{
    img:"img/orca.png",
    text:"それはたいへんだね！ まずはこれを<ruby>食<rt>た</rt></ruby>べて<ruby>元気<rt>げんき</rt></ruby>をだしてよ。"
},
{
    img:"img/otter.png",
    text:"うわー！ おいしそう！"
},
{
    img:"img/penguin.png",
    text:"ありがとう！ これでまた<ruby>頑張<rt>がんば</rt></ruby>れそうだよ。"
},
{
    img:"img/orca.png",
    text:"みんなのために<ruby>旅<rt>たび</rt></ruby>をしているなんて、すごいね。"
},
{
    img:"img/orca.png",
    text:"よかったら、ぼくもいっしょに<ruby>戦<rt>たたか</rt></ruby>わせてくれない？"
},
{
    img:"img/penguin.png",
    text:"もちろん！ <ruby>仲間<rt>なかま</rt></ruby>がふえるのはとてもうれしいよ！"
},
{
    img:"img/otter.png",
    text:"これで<ruby>伝説<rt>でんせつ</rt></ruby>のおさかなにもっと<ruby>近<rt>ちか</rt></ruby>づけるね！"
},
{
    img:"img/orca.png",
    text:"よーし！ みんなで<ruby>町<rt>まち</rt></ruby>を<ruby>救<rt>すく</rt></ruby>おう！"
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
    img:"img/otter.png",
    text:"カワウソ：そのおさかなを<ruby>見<rt>み</rt></ruby>つけると、どんな<ruby>願<rt>ねが</rt></ruby>いもかなうって<ruby>言<rt>い</rt></ruby>われているんだよ。"
},
{
    img:"img/dolphin.png",
    text:"イルカ：<ruby>伝説<rt>でんせつ</rt></ruby>のおさかな！？ それはすごいね！"
},
{
    img:"img/orca.png",
    text:"シャチ：ぼくたちは、みんなを<ruby>助<rt>たす</rt></ruby>けるために<ruby>旅<rt>たび</rt></ruby>をしているんだ。"
},
{
    img:"img/dolphin.png",
    text:"イルカ：<ruby>実<rt>じつ</rt></ruby>はぼくも、そのうわさを<ruby>聞<rt>き</rt></ruby>いたことがあるよ。"
},
{
    img:"img/dolphin.png",
    text:"イルカ：ひとりで<ruby>探<rt>さが</rt></ruby>していたんだけど、なかなか<ruby>見<rt>み</rt></ruby>つからなくてね。"
},
{
    img:"img/penguin.png",
    text:"ペンギン：それなら、ぼくたちと<ruby>一緒<rt>いっしょ</rt></ruby>に<ruby>探<rt>さが</rt></ruby>さない？"
},
{
    img:"img/otter.png",
    text:"カワウソ：<ruby>仲間<rt>なかま</rt></ruby>が<ruby>増<rt>ふ</rt></ruby>えれば、きっと<ruby>見<rt>み</rt></ruby>つけられるよ！"
},
{
    img:"img/dolphin.png",
    text:"イルカ：<ruby>本当<rt>ほんとう</rt></ruby>かい！？ ぜひ<ruby>仲間<rt>なかま</rt></ruby>にしてほしい！"
},
{
    img:"img/orca.png",
    text:"シャチ：もちろんだ！"
},
{
    img:"img/penguin.png",
    text:"ペンギン：みんなで<ruby>力<rt>ちから</rt></ruby>を<ruby>合<rt>あ</rt></ruby>わせて、<ruby>町<rt>まち</rt></ruby>を<ruby>救<rt>すく</rt></ruby>おう！"
},
{
    img:"img/dolphin.png",
    text:"イルカ：よーし！ <ruby>伝説<rt>でんせつ</rt></ruby>のおさかなを<ruby>見<rt>み</rt></ruby>つけるぞ！"
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
    text:"<ruby>神殿<rt>しんでん</rt></ruby>の<ruby>奥<rt>おく</rt></ruby>から強大な<ruby>気配<rt>けはい</rt></rubyを感じる…。"
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
            text:"シャチ：<ruby>神殿<rt>しんでん</rt></ruby>の<ruby>奥<rt>おく</rt></ruby>にだれかいる！"
        },
        {
            img:"BOSS.png",
            text:"ガーディアン：そこで止まれ。"
        },
        {
            img:"BOSS.png",
            text:"私は<ruby>伝説<rt>でんせつ</rt></ruby>のおさかなを<ruby>守<rt>まも</rt></ruby>るガーディアンだ。"
        },
        {
            img:"BOSS.png",
            text:"<ruby>伝説<rt>でんせつ</rt></ruby>のおさかなを手にする<ruby>資格<rt>しかく</rt></ruby>があるか<ruby>試<rt>ため</rt></ruby>してやろう！"
        }
    ]);
}
