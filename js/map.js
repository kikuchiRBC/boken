
function generateMap(index){

    const rows = 13;
    const cols = 13;

    const map = [];

    for(let y=0;y<rows;y++){

        map[y] = [];

        for(let x=0;x<cols;x++){

            if(
                y===0 ||
                y===rows-1 ||
                x===0 ||
                x===cols-1
            ){
                map[y][x] = 1;
            }else{
                map[y][x] = 0;
            }
        }
    }

    // 木配置
    const treeCount =
        Math.floor(Math.random()*10)+20;

    for(let i=0;i<treeCount;i++){

        const x = Math.floor(Math.random()*11)+1;
        const y = Math.floor(Math.random()*11)+1;

        if(!(x===1 && y===1)){

            map[y][x] = 2;
        }
    }

// 階段配置
let sx, sy;

do{
    sx = Math.floor(Math.random()*11)+1;
    sy = Math.floor(Math.random()*11)+1;
}
while(map[sy][sx] !== 0);

map[sy][sx] = 3;

// ショップ配置

if(index < 29 && Math.random() < 0.3){

    let shopX, shopY;

    do{
        shopX = Math.floor(Math.random()*11)+1;
        shopY = Math.floor(Math.random()*11)+1;
    }
    while(map[shopY][shopX] !== 0);

    map[shopY][shopX] = 9;
}
// 宝箱配置
const chestCount =
Math.floor(Math.random() * 3) + 1; // 1～3個

for(let i=0; i<chestCount; i++){

    let cx, cy;

    do{
        cx = Math.floor(Math.random()*11)+1;
        cy = Math.floor(Math.random()*11)+1;
    }
    while(map[cy][cx] !== 0);

    map[cy][cx] = 10;
}
    // 5階ごとに宿配置
    if(
        (index + 1) % 5 === 0 &&
        (index + 1) < 30
    ){

        let ix, iy;

        do{
            ix = Math.floor(Math.random()*11)+1;
            iy = Math.floor(Math.random()*11)+1;
        }
        while(map[iy][ix] !== 0);

        map[iy][ix] = 4;
    }
if(index === 29){

   const bossMap = [

[1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,0,0,0,0,6,6,6,0,0,0,0,1],
[1,0,0,0,0,6,6,6,0,0,0,0,1],
[1,0,0,0,0,6,6,6,0,0,0,0,1],

[1,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,1],

[1,0,0,0,0,0,0,0,0,0,0,0,1],

[1,0,0,0,0,0,0,0,0,0,0,0,1],

[1,0,0,0,0,0,0,0,0,0,0,0,1],

[1,0,0,0,0,0,0,0,0,0,0,0,1],

[1,0,0,0,0,0,0,0,0,0,0,0,1],

[1,0,0,0,0,0,0,0,0,0,0,0,1],

[1,1,1,1,1,1,1,1,1,1,1,1,1]

];

    return bossMap;
}
    


    // スタート周辺を空ける
    map[1][1] = 0;
    map[1][2] = 0;
    map[2][1] = 0;
    map[2][2] = 0;

    return map;
}


function nextArea(){
 inBattle = false
    console.log("次のエリア");

 document.getElementById("game-container").style.display="none";
    document.getElementById("field-screen").style.display="block";

    floor++;
    currentMapIndex++;

// イベント発生



    if(currentMapIndex >= maps.length){
        alert("全30エリアクリア！");
        location.reload();
        return;
    }

    map = maps[currentMapIndex];

    // ボスマップだけ中央下から開始
    if(currentMapIndex === 29){
        player.x = 6;
        player.y = 11;
    }else{
        player.x = 1;
        player.y = 1;
    }

        trail = [];

        for(let i = 0; i < (party.length + 1) * 5;
        i++){
            trail.push({
                x: player.x,
                y: player.y
            });
        }
        party.forEach(friend=>{
            friend.x = player.x;
            friend.y = player.y;
        });
    triggerAreaEvent();
    if(eventMode){
    return;
    }   
    updateMapTiles();
    updateMonsterBackground();



    // trailを初期化
    trail = [];

    for(let i = 0; i < (party.length + 1) * 5; i++){
        trail.push({
            x: player.x,
            y: player.y
        });
    }

    // 仲間も同じ位置へ
    party.forEach(friend=>{
        friend.x = player.x;
        friend.y = player.y;
    });
updateFieldStatus();
    draw();
}


function updateMapTiles(){

    if(currentMapIndex < 6){

        grassImg.src = "img/grass_forest.png";
        treeImg.src = "img/tree_forest.png";
    }
    else if(currentMapIndex < 12){

        grassImg.src = "img/grass_cave.png";
        treeImg.src = "img/rock.png";
    }
    else if(currentMapIndex < 18){

        grassImg.src = "img/grass_desert.png";
        treeImg.src = "img/cactus.png";
    }
    else if(currentMapIndex < 24){

        grassImg.src = "img/snow.png";
        treeImg.src = "img/ice.png";
    }
    else if(currentMapIndex === 29){

        grassImg.src = "img/temple_floor.png";
        treeImg.src = "img/pillar.png";
    }
    else{

        grassImg.src = "img/demonfloor.png";
        treeImg.src = "img/lava.png";
    }
}


function draw(){

    party.forEach((friend, i) => {

        const pos = trail[i];

        if(pos){
            friend.x = pos.x;
            friend.y = pos.y;
        }
    });

    ctx.clearRect(0,0,canvas.width,canvas.height);

    // 神殿背景
    if(currentMapIndex === 29){

 ctx.drawImage(
    grassImg,
    0,
    0,
    canvas.width,
    canvas.height

        );

    }

    // マップ描画
    for(let y=0; y<map.length; y++){
    for(let x=0; x<map[y].length; x++){

// 城マップ
if(castleMode){

    if(y === 0 && x === 0){
        ctx.drawImage(
            castleBgImg,
            0,
            0,
            canvas.width,
            canvas.height
        );
    }

    // 王様
    if(map[y][x] === 7){
        ctx.drawImage(
            castleKingImg,
            x * tileSize,
            y * tileSize,
            tileSize,
            tileSize
        );
    }

    // 兵士
    if(map[y][x] === 8){
        ctx.drawImage(
            soldierImg,
            x * tileSize,
            y * tileSize,
            tileSize,
            tileSize
        );
    }

    // 階段
    if(map[y][x] === 3){
        ctx.drawImage(
            stairsImg,
            x * tileSize,
            y * tileSize,
            tileSize,
            tileSize
        );
    }

    continue;
}

if(currentMapIndex !== 29){

    if(map[y][x] === 1)
        ctx.drawImage(
            wallImg,
            x*tileSize,
            y*tileSize,
            tileSize,
            tileSize
        );

}
      // 地面を先に描画
      if(currentMapIndex !== 29){
        ctx.drawImage(
            grassImg,
            x * tileSize,
            y * tileSize,
            tileSize,
            tileSize
        );
      }

        // その上にオブジェクト
        if(map[y][x] === 1){
            ctx.drawImage(
                wallImg,
                x * tileSize,
                y * tileSize,
                tileSize,
                tileSize
            );
        }

        if(map[y][x] === 2){
            ctx.drawImage(
                treeImg,
                x * tileSize,
                y * tileSize,
                tileSize,
                tileSize
            );
        }

        if(map[y][x] === 3){
            ctx.drawImage(
                stairsImg,
                x * tileSize,
                y * tileSize,
                tileSize,
                tileSize
            );
        }

        if(map[y][x] === 4){
            ctx.drawImage(
                innImg,
                x * tileSize,
                y * tileSize,
                tileSize,
                tileSize
            );
        }

if(map[y][x] === 5)
    ctx.drawImage(templeImg,x*tileSize,y*tileSize,tileSize,tileSize);

if(map[y][x] === 6){

    // 3×3ブロックの左上だけ描画
    const isTopLeft =
        (y === 0 || map[y-1][x] !== 6) &&
        (x === 0 || map[y][x-1] !== 6);

    if(isTopLeft){
        ctx.drawImage(
            guardianMapImg,
            x * tileSize,
            y * tileSize,
            tileSize * 3,
            tileSize * 3
        );
    }
}
if(map[y][x] === 9)
ctx.drawImage( shopImg, x * tileSize, y * tileSize, tileSize,tileSize 

);
if(map[y][x] === 10){
    ctx.drawImage(
        grassImg,
        x*tileSize,
        y*tileSize,
        tileSize,
        tileSize
    );

    ctx.drawImage(
        chestImg,
        x*tileSize,
        y*tileSize,
        tileSize,
        tileSize
    );
}
}

}

    // 仲間描画
    for(let i=0;i<party.length;i++){

        const pos = trail[(i)];

        if(!pos) continue;

        const friendImage =
            friendSets[i][direction];



if(!friendImage){
    console.log("friend image undefined", i, direction);
    continue;
}

if(
    !friendImage.complete ||
    friendImage.naturalWidth === 0
){
    console.log("friend image load error", friendImage.src);
    continue;
}

ctx.drawImage(
    friendImage,
    pos.x * tileSize,
    pos.y * tileSize,
    tileSize,
    tileSize
);
    }

    // 主人公描画
    let heroImage = heroDown;

    if(direction==="left") heroImage = heroLeft;
    if(direction==="right") heroImage = heroRight;
    if(direction==="up") heroImage = heroUp;
    if(direction==="down") heroImage = heroDown;

if(
    heroImage.complete &&
    heroImage.naturalWidth > 0
){
    ctx.drawImage(
        heroImage,
        player.x * tileSize,
        player.y * tileSize,
        tileSize,
        tileSize
    );
}
}
  
