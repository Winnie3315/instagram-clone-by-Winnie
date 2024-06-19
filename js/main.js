const postsContainer = document.querySelector('.posts');
const storyContainer = document.querySelector('.story-container');
const suggestContainer = document.querySelector('.suggestions-container');
const modal = document.querySelector("#storyModal");
const closeModal = document.querySelector(".close");
const storyImage = document.querySelector("#storyImage");
const commentModal = document.querySelector(".modal-comment");
const commentCloseModal = document.getElementById('closeModal');
const postCommentScrollbar = document.querySelector(".post-comment-scrollbar");
const commentContainer = document.querySelector(".commentContainer")
const switchButton = document.querySelector(".switch button")
const body = document.querySelector("body")


fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(users => fetchPosts(users));

function fetchPosts(users) {
    fetch('https://jsonplaceholder.typicode.com/photos?_start=0&_limit=10')
        .then(response => response.json())
        .then(posts => {
            posts.forEach((post, idx) => {
                reload(posts, users, postsContainer);
                reloadStories(posts, storyContainer, users);
                reloadSuggestion(posts, suggestContainer, users);
            });
        });
}

function reload(posts, users, place) {
    place.innerHTML = '';
    posts.forEach((post, idx) => {
        let user = users[idx];

        const postDiv = document.createElement('div');
        postDiv.classList.add('instagram-post');

        const postHeader = document.createElement('div');
        postHeader.classList.add('post-header');

        const postRight = document.createElement('div');
        postRight.classList.add('post-right');
        const profilePicture = document.createElement('div');
        profilePicture.classList.add('profile-picture');
        const profileImg = document.createElement('img');
        profileImg.src = post.thumbnailUrl;
        profileImg.alt = 'Profile Picture';
        profilePicture.append(profileImg);
        const profileInfo = document.createElement('div');
        const username = document.createElement('h4');
        username.classList.add('username');
        username.innerHTML = user.username;
        const location = document.createElement('p');
        location.classList.add('location');
        location.innerHTML = `${user.address.city}, ${user.address.street}`;
        profileInfo.append(username, location);
        postRight.append(profilePicture, profileInfo);

        const postLeft = document.createElement('div');
        postLeft.classList.add('post-left');
        const spredImg = document.createElement('img');
        spredImg.src = './img/spred.svg';
        spredImg.alt = 'spread';
        postLeft.append(spredImg);
        postHeader.append(postRight, postLeft);

        const postImageDiv = document.createElement('div');
        postImageDiv.classList.add('post-image');
        const postImage = document.createElement('img');
        postImage.src = post.url;
        postImage.alt = 'Post Image';
        postImageDiv.append(postImage);

        const postContent = document.createElement('div');
        postContent.classList.add('post-content');
        const postInfo = document.createElement('div');
        postInfo.classList.add('post-info');
        const postInfoBox = document.createElement('div');
        postInfoBox.classList.add('post-info-box');

        const postLike = document.createElement('div');
        postLike.classList.add('post-like');
        const likeBtn = document.createElement('button');
        likeBtn.classList.add('like-btn');
        likeBtn.innerHTML = `<svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.3 2.05002C20.15 2.05002 22.5 4.65002 22.5 7.80002C22.5 11.2 19.55 13.3 16.75 15.8C13.95 18.3 12.5 19.65 12 19.95C11.45 19.6 9.65 17.95 7.25 15.8C4.4 13.3 1.5 11.2 1.5 7.80002C1.5 4.65002 3.85 2.05002 6.7 2.05002C8.8 2.05002 9.95 3.05002 10.75 4.20002C11.7 5.50002 11.85 6.15002 12 6.15002C12.15 6.15002 12.3 5.50002 13.25 4.20002C14.05 3.05002 15.2 2.05002 17.3 2.05002ZM17.3 0.550018C15.05 0.550018 13.35 1.45002 12 3.35002C10.65 1.50002 8.95 0.600018 6.7 0.600018C3 0.550018 0 3.80002 0 7.80002C0 11.45 2.7 13.8 5.3 16.05C5.6 16.3 5.95 16.6 6.25 16.9L7.4 17.9C9.6 19.85 10.7 20.85 11.2 21.15C11.45 21.3 11.75 21.4 12 21.4C12.3 21.4 12.55 21.3 12.8 21.15C13.3 20.85 14.2 20.05 16.7 17.75L17.7 16.85C18.05 16.55 18.35 16.25 18.7 16C21.35 13.8 24 11.5 24 7.80002C24 3.80002 21 0.550018 17.3 0.550018Z" fill="var(--color-switcher)"/>
</svg>
                            `
        postLike.append(likeBtn);

        const postComment = document.createElement('div');
        postComment.classList.add('post-comment');
        const commentBtn = document.createElement('button');
        commentBtn.classList.add('comment-btn');
        commentBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_2_1652)">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M23.75 23.05L22.35 17.55C23.25 15.9 23.75 14 23.75 12C23.75 5.5 18.5 0.25 12 0.25C5.5 0.25 0.25 5.5 0.25 12C0.25 18.5 5.5 23.75 12 23.75C14 23.75 15.9 23.25 17.55 22.35L23.05 23.75C23.45 23.85 23.85 23.45 23.75 23.05ZM22.25 12C22.25 14 21.75 15.5 20.95 17C20.85 17.2 20.8 17.45 20.85 17.7L21.9 21.9L17.75 20.85C17.5 20.8 17.25 20.8 17.05 20.95C16.15 21.45 14.45 22.25 12.05 22.25C6.35 22.25 1.75 17.65 1.75 12C1.75 6.35 6.35 1.75 12 1.75C17.65 1.75 22.25 6.35 22.25 12Z" fill="white"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_2_1652">
                                <rect width="24" height="24" fill="white"/>
                                </clipPath>
                                </defs>
                                </svg>
                            `

        postComment.append(commentBtn);

        const postShare = document.createElement('div');
        postShare.classList.add('post-share');
        const shareBtn = document.createElement('button');
        shareBtn.classList.add('share-btn');
        shareBtn.innerHTML = `<svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M23.9 0.9C23.75 0.65 23.5 0.5 23.25 0.5H0.75C0.45 0.55 0.15 0.75 0.05 1C-0.05 1.25 0 1.6 0.2 1.85L8.15 9.65L10.9 20.95C10.95 21.25 11.2 21.45 11.5 21.5H11.6C11.85 21.5 12.1 21.35 12.25 21.15L23.85 1.65C24.05 1.45 24.05 1.15 23.9 0.9ZM2.6 2.05H20.35L9 8.35L2.6 2.05ZM11.95 18.85L9.75 9.65L21.2 3.3L11.95 18.85Z" fill="white"/>
</svg>`
        postShare.append(shareBtn);
        postInfoBox.append(postLike, postComment, postShare);

        const postFavorite = document.createElement('div');
        postFavorite.classList.add('post-favorite');
        const favoriteBtn = document.createElement('button');
        favoriteBtn.classList.add('favorite-btn');
        favoriteBtn.innerHTML = `<svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.75 24C20.55 24 20.35 23.9 20.2 23.8L11 14.5L1.8 23.8C1.6 24 1.25 24.1 1 23.95C0.7 23.85 0.5 23.55 0.5 23.25V0.75C0.5 0.35 0.85 0 1.25 0H20.75C21.15 0 21.5 0.35 21.5 0.75V23.25C21.5 23.55 21.3 23.85 21.05 23.95C20.95 24 20.85 24 20.75 24ZM11 13C11.4 13 11.8 13.15 12.1 13.45L20 21.45V1.5H2V21.45L9.9 13.45C10.2 13.15 10.6 13 11 13Z" fill="white"/>
</svg>`
        postFavorite.append(favoriteBtn);
        postInfo.append(postInfoBox, postFavorite);

        const likes = document.createElement('p');
        likes.classList.add('likes');
        likes.innerHTML = '8,888 likes';
        const description = document.createElement('p');
        description.classList.add('description');
        description.innerHTML = `<span class="username"> <b>${user.username}</b></span> ${post.title}`;
        const viewComments = document.createElement('p');
        viewComments.classList.add('view-comments');
        viewComments.innerHTML = 'View all comments';
        const timestamp = document.createElement('p');
        timestamp.classList.add('timestamp');
        timestamp.innerHTML = '1 HOUR AGO';

        postContent.append(postInfo, likes, description, viewComments, timestamp);

        const postFooter = document.createElement('div');
        postFooter.classList.add('post-footer');
        const footerProfileImg = document.createElement('img');
        footerProfileImg.src = './img/Avatar.svg';
        footerProfileImg.alt = 'Profile Picture';
        const commentInput = document.createElement('input');
        commentInput.type = 'text';
        commentInput.placeholder = 'Add a comment...';
        const postButton = document.createElement('button');
        postButton.innerHTML = 'Post';
        postFooter.append(footerProfileImg, commentInput, postButton);

        postDiv.append(postHeader, postImageDiv, postContent, postFooter);
        place.append(postDiv);

        commentBtn.onclick = () => {
            const mainPhoto = document.querySelector("#mainPhoto")
            mainPhoto.src = post.url
            const commentAutorProfile = document.querySelector('.comment-autor-profile')
            const commentAutorProfileImg = document.querySelector('.comment-autor-profile img')
            commentAutorProfileImg.src = post.thumbnailUrl
            const commentAutorProfileNickname = document.querySelector('.comment-autor-profile span')
            commentAutorProfileNickname.innerHTML = user.username

            fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`)
                .then(res => res.json())
                .then(comments => {
                    reloadComments(comments, users, post.url, postCommentScrollbar);
                    commentModal.classList.remove("disable");
                    commentModal.classList.add("active");
                });
        };
        commentCloseModal.onclick = () => {
            commentModal.classList.add("disable");
            commentModal.classList.remove("active");
        }
    });
}

function reloadStories(arr, place, users) {
    place.innerHTML = '';
    arr.forEach((story, idx) => {
        let user = users[idx];
        const profileDiv = document.createElement('div');
        profileDiv.classList.add('profile');

        const profileImgDiv = document.createElement('div');
        profileImgDiv.classList.add('profile-img');
        const profileImg = document.createElement('img');
        profileImg.src = story.thumbnailUrl;
        profileImg.alt = 'story-avatar';
        profileImgDiv.append(profileImg);

        const profileName = document.createElement('h4');
        profileName.classList.add('profile-name');
        profileName.innerHTML = user.username;

        profileDiv.append(profileImgDiv, profileName);
        place.append(profileDiv);

        let modalProfileName = document.querySelector(".modal-header h4");
        let modalProfileImg = document.querySelector(".modal-header img");

        profileDiv.onclick = () => {
            storyImage.src = story.thumbnailUrl;
            modal.classList.add("active");
            modal.classList.remove("disable");

            modalProfileImg.src = story.thumbnailUrl;
            modalProfileName.innerHTML = user.username;
        };

        closeModal.onclick = () => {
            modal.classList.add("disable");
            modal.classList.remove("active");
        };
    });
}

function reloadSuggestion(arr, place, users) {
    place.innerHTML = '';
    arr.forEach((suggestion, idx) => {
        let user = users[idx];
        const userDiv = document.createElement('div');
        userDiv.classList.add('user');

        const userLeftDiv = document.createElement('div');
        userLeftDiv.classList.add('user-left');

        const userAvatarDiv = document.createElement('div');
        userAvatarDiv.classList.add('user-avatar-suggest');
        const userAvatarImg = document.createElement('img');
        userAvatarImg.src = suggestion.thumbnailUrl;
        userAvatarImg.alt = 'avatar';
        userAvatarDiv.append(userAvatarImg);

        const userInfoDiv = document.createElement('div');
        userInfoDiv.classList.add('user-info');

        const userNickDiv = document.createElement('div');
        userNickDiv.classList.add('user-nick');
        const userNickName = document.createElement('h4');
        userNickName.innerHTML = user.username;
        userNickDiv.append(userNickName);

        const suggestionDiv = document.createElement('div');
        suggestionDiv.classList.add('suggestion');
        const suggestionText = document.createElement('p');
        suggestionText.innerHTML = 'Suggestions For You';
        suggestionDiv.append(suggestionText);

        userInfoDiv.append(userNickDiv, suggestionDiv);
        userLeftDiv.append(userAvatarDiv, userInfoDiv);

        const followDiv = document.createElement('div');
        followDiv.classList.add('follow');
        const followButton = document.createElement('button');
        followButton.classList.add('follow');
        followButton.innerHTML = 'Follow';
        followDiv.append(followButton);

        userDiv.append(userLeftDiv, followDiv);
        place.append(userDiv);
    });
}

function reloadComments(comments, users, postImage, place) {
    place.innerHTML = '';

    comments.forEach((comment, idx) => {
        const user = users[idx]
        const img = postImage

        const commentDiv = document.createElement("div")
        const commentUserInfo = document.createElement("div")//comment-user-info
        const commentUserInfoImg = document.createElement("Img")//comment-user-info
        const commentUserInfoSpan = document.createElement("span")//comment-user-info
        const commentary = document.createElement("div")//commentary
        const commentaryP = document.createElement("p")//commentary

        commentDiv.classList.add('comment')
        commentUserInfo.classList.add("comment-user-info")
        commentary.classList.add("commentary")

        commentUserInfoImg.src = img
        commentUserInfoImg.alt = "ava"
        commentUserInfoSpan.innerHTML = user.username
        commentaryP.innerHTML = comment.body


        commentary.append(commentaryP)
        commentUserInfo.append(commentUserInfoImg, commentUserInfoSpan)
        commentDiv.append(commentUserInfo, commentary)
        place.append(commentDiv)

    });
}
// const home = document.querySelectorAll("home-icon")
// const like = document.querySelectorAll(".like-btn img")
// const comment = document.querySelectorAll(".comment-btn img")
// const share = document.querySelectorAll(".share-btn img")
// const favorite = document.querySelectorAll(".favorite-btn img")
// const spread = document.querySelectorAll(".post-left img")
let styleMode = localStorage.getItem("styleMode")

switchButton.onclick = () => {
    
    // like.forEach((elem, idx) => {
    //     elem.src="./img/notification_white.svg"  
    //   })
    //   home.forEach(elem => {
    //     elem.src ="./img/home_white.svg"
    //   })
    //   comment.forEach((elem, idx) => {
        
    //   })
    //   share.forEach((elem, idx) => {
  
    //   })
    //   favorite.forEach((elem, idx) => {
  
    //   })
    //   spread.forEach((elem, idx) => {
    //       elem.src = ""
    //   })
    //   logo.forEach((elem, idx) => {
    //       elem.src = "./img/Logo_white.svg"
    //   })
    styleMode = localStorage.getItem("styleMode")
    if(styleMode !== "dark"){
        darkStyle()
    }else{
        lightStyle()
    }
}
function darkStyle() {
    body.classList.add('dark-theme')
    localStorage.setItem("styleMode", "dark")
}

function lightStyle() {
    body.classList.remove('dark-theme')
    localStorage.setItem("styleMode", null)
}
if(styleMode === "dark"){
    darkStyle()
}
    // body.style.backgroundColor = '#000000';
    // const logo = document.querySelectorAll('.logo-icon')
    // const h4Elem = document.querySelectorAll("h4")
    // const pElem = document.querySelectorAll("p")
    // const instagramPost = document.querySelectorAll(".instagram-post")
    // const spans = document.querySelectorAll("span")
    // const like = document.querySelectorAll(".like-btn img")
    // const comment = document.querySelectorAll(".comment-btn img")
    // const share = document.querySelectorAll(".share-btn img")
    // const favorite = document.querySelectorAll(".favorite-btn img")
    // const spread = document.querySelectorAll(".post-left img")
    
    // h4Elem.forEach((elem, idx) => {
    //     elem.style.color = '#ffffff'
    // })
    // pElem.forEach((elem, idx) => {
    //     elem.style.color = '#ffffff'
    // })

    // instagramPost.forEach((elem, idx) => {
    //     elem.style.backgroundColor = "#000000"
    // })
    
    // spans.forEach((elem, idx) => {
    //     elem.style.color = '#ffffff'
    // })
