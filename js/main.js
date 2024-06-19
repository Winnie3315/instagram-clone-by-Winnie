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
        const likeImg = document.createElement('img');
        likeImg.src = './img/notification_black.svg';
        likeImg.alt = 'like';
        likeBtn.append(likeImg);
        postLike.append(likeBtn);

        const postComment = document.createElement('div');
        postComment.classList.add('post-comment');
        const commentBtn = document.createElement('button');
        commentBtn.classList.add('comment-btn');
        const commentImg = document.createElement('img');
        commentImg.src = './img/comment.svg';
        commentImg.alt = 'comment';
        commentBtn.append(commentImg);
        postComment.append(commentBtn);

        const postShare = document.createElement('div');
        postShare.classList.add('post-share');
        const shareBtn = document.createElement('button');
        shareBtn.classList.add('share-btn');
        const shareImg = document.createElement('img');
        shareImg.src = './img/share.svg';
        shareImg.alt = 'share';
        shareBtn.append(shareImg);
        postShare.append(shareBtn);
        postInfoBox.append(postLike, postComment, postShare);

        const postFavorite = document.createElement('div');
        postFavorite.classList.add('post-favorite');
        const favoriteBtn = document.createElement('button');
        favoriteBtn.classList.add('favorite-btn');
        const favoriteImg = document.createElement('img');
        favoriteImg.src = './img/favorite.svg';
        favoriteImg.alt = 'favorite';
        favoriteBtn.append(favoriteImg);
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
