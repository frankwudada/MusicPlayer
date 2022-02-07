const $Playing = $(".icon-Playing")
const $Backward = $(".icon-Backward")
const $Forward = $(".icon-Forward")
let musicList = []


// 获取 JSON 数据，并转换为数组
// fetch() 方法返回 response 对象，需使用 json() 方法转换为 promise 对象
// fetch('./data.json').then(response => response.json()).then(data => {
//     musicList = data
// })


// 不能直接使用 fs
const fs = require("fs")
const data = fs.readFileSync("./data.json")
console.log(data)

let index = 0
let audioObject = $("#music")[0]
let title = $(".title h3")[0]
let author = $(".title p")[0]
function setMusic() {
    let currentMusic = musicList[index]
    audioObject.src = currentMusic.src
    $Playing.removeClass("icon-Playing")
    $Playing.addClass("icon-Pause")
    title.innerText = currentMusic.title
    author.innerText = currentMusic.author
    // url 不能有空格
    $(".cover").css("background-image", "url(" + currentMusic.img + ")")
    audioObject.play()
}
$Playing.on("click", () => {
    if ($Playing.hasClass("icon-Playing")) {
        setMusic()
    } else if ($Playing.hasClass("icon-Pause")) {
        $Playing.removeClass("icon-Pause")
        $Playing.addClass("icon-Playing")
        audioObject.pause()
    }
})
$Backward.on("click", () => {
    index--
    index = (index + musicList.length) % musicList.length
    setMusic()
})
$Forward.on("click", () => {
    index++
    index = index % musicList.length
    setMusic()
})




