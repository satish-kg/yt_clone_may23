const videoCardContainer = document.querySelector(".video-container");



let api_key = ""; //USE YOUR API KEY HERE
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http ="https://www.googleapis.com/youtube/v3/channels?";
let search = "https://www.googleapis.com/youtube/v3/search?";



const searchInput = document.getElementById("searchbar");
function searchVideos(){
    alert("button clicked");
//    video-container
    let videoContainer = document.getElementsByClassName("video-container");
    videoContainer.innerHTML = "";
    let searchValue = searchInput.value;
    fetchVideos(searchValue);
}

async function fetchVideos(searchValue){
    let endpoint = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${searchValue}&key=${api_key}`;
    try{
        let response = await fetch(endpoint);
        let result = await response.json();
        showThumbnails(result.items);
        console.log(result);
    }
    catch(error){
        alert("something went wrong");
        alert(error.message);
    }
}

function showThumbnails(items){
    for(let i = 0; i < items.length; i++){
        let videoItem = items[i];
        let imageUrl = videoItem.snippet.thumbnails.high.url;
//        let imageElement = document.createElement("img");
//        imageElement.src = imageUrl;
//        imageElement.height = 240;
//        imageElement.width = 135;
//        document.body.append(imageElement);
        let videoElement = document.createElement("div");
        videoElement.id = videoItem.id.videoId;
//        videoElement.style.background = `url(${imageUrl})`;
        videoElement.innerHTML = `<p class="videoTitle">${videoItem.snippet.title}</p>`;
        let searchContainer = document.getElementsByClassName("searchResultsDiv");
//        searchResultsDiv.appendChild(videoElement);
        video-container
        document.body.append
    }
}

//document.getElementById("search-btn").addEventListener("click",function(){
//    const searchbtn =document.getElementById("searchbar");
//    console.log("Search", searchbtn.value);
//    const searchItem = searchbtn.value;
//    console.log(searchItem);
//    fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=searchbtn.value&key=AIzaSyCRjuKfEY9LbC2nt0M3hrW-NNFceODfBFk`)
//    .then(function(searchResult){console.log(searchResult)})
//    .catch(function(searchError){})
////    fetch(search+new URLSearchParams({
////        key:api_key,
////        part:'snippet',
////        chart:'mostPopular',
////        maxResults:101,
////        regionCode:'IN'
////    })).then(function(searchResult){
////        console.log(searchResult)
////    }).catch(function(searchError){
////
////    })
//
//});



fetch(video_http + new URLSearchParams({
    key:api_key,
    part:'snippet',
    chart:'mostPopular',
    maxResults:101,
    regionCode:'IN'
}))
.then(res =>res.json())
.then(data=>{
// console.log(data);
    data.items.forEach(item=>{
        getChanelIcon(item);
    })


}).catch(err=>{
    console.log(err);
});


const getChanelIcon =(video_data)=>{
    fetch(channel_http + new URLSearchParams({
        key:api_key,
        part:'snippet',
        id:video_data.snippet.channelId

    }))
    .then(res=>res.json())
    .then(data=>{
        // console.log(data)

            video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
            makeVideoCard(video_data);


    })
    .catch(error=>{
        console.log("channel not found")
    })
}

const makeVideoCard = (data)=>{
    videoCardContainer.innerHTML+=`
        <div class="video" onclick="location.href ='https://youtube.com/watch?v=${data.id}'">
            <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
            <div class="content">
                <img src="${data.channelThumbnail}" class="channel-icon" alt="">
                <div class="info">
                    <h4 class="title">${data.snippet.title}</h4>
                    <p class="channel-name">${data.snippet.channelTitle}</p>
                </div>
            </div>
        </div>
    `;
}