const videoCardContainer = document.querySelector(".video-container");


let api_key = "AIzaSyCRjuKfEY9LbC2nt0M3hrW-NNFceODfBFk";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http ="https://www.googleapis.com/youtube/v3/channels?";
let search = "https://www.googleapis.com/youtube/v3/search?";


document.getElementById("search-btn").addEventListener("click",function(){
    const searchbtn =document.getElementById("searchbar");
    console.log("Search", searchbtn.value)
    fetch(search+new URLSearchParams({
        key:api_key,
        part:'snippet',
        chart:'mostPopular',
        maxResults:101,
        regionCode:'IN'
    })).then(function(searchResult){
        console.log(searchResult)
    }).catch(function(searchError){

    })

});



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