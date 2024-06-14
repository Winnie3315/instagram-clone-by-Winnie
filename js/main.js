  fetch('https://jsonplaceholder.typicode.com/photos?_start=0&_limit=100')
        .then(response => response.json())
        .then(response => {
            reload(response, postsContainer);
            reloadStories(response, storyContainer)
            reloadSuggestion(response, suggestContainer)
        })

const postsContainer = document.querySelector('.posts')
const storyContainer = document.querySelector('.story-container')
const suggestContainer = document.querySelector('.suggestions-container')
const modal = document.querySelector("#storyModal")
const closeModal = document.querySelector(".close")
const storyImage = document.querySelector("#storyImage")
// const modalOverlay = document.querySelector('#commentModalOverlay');
// const closeBtn = modalOverlay.querySelector('.close');



    
function reload(arr, place) {
    place.innerHTML = ''
    arr.forEach((post) => {
        const postDiv = document.createElement('div')
        postDiv.classList.add('instagram-post')

        const postHeader = document.createElement('div')
        postHeader.classList.add('post-header')

        const postRight = document.createElement('div')
        postRight.classList.add('post-right')
        const profilePicture = document.createElement('div')
        profilePicture.classList.add('profile-picture')
        const profileImg = document.createElement('img')
        profileImg.src = post.thumbnailUrl
        profileImg.alt = 'Profile Picture'
        profilePicture.append(profileImg)
        const profileInfo = document.createElement('div')
        const username = document.createElement('h4')
        username.classList.add('username')
        username.innerHTML = 'nickname'
        const location = document.createElement('p')
        location.classList.add('location')
        location.innerHTML = 'City, Country'
        profileInfo.append(username, location)
        postRight.append(profilePicture, profileInfo)
        const postLeft = document.createElement('div')
        postLeft.classList.add('post-left')
        const spredImg = document.createElement('img')
        spredImg.src = './img/spred.svg'
        spredImg.alt = 'spred'
        postLeft.append(spredImg)
        postHeader.append(postRight, postLeft)
        const postImageDiv = document.createElement('div')
        postImageDiv.classList.add('post-image')
        const postImage = document.createElement('img')
        postImage.src = post.url
        postImage.alt = 'Post Image'
        postImageDiv.append(postImage)
        const postContent = document.createElement('div')
        postContent.classList.add('post-content')
        const postInfo = document.createElement('div')
        postInfo.classList.add('post-info')
        const postInfoBox = document.createElement('div')
        postInfoBox.classList.add('post-info-box')

        const postLike = document.createElement('div')
        postLike.classList.add('post-like')
        const likeImg = document.createElement('img')
        likeImg.src = './img/notification_black.svg'
        likeImg.alt = 'like'
        postLike.append(likeImg)
        const postComment = document.createElement('div')
        postComment.classList.add('post-comment')
        const commentImg = document.createElement('img')
        commentImg.src = './img/comment.svg'
        commentImg.alt = 'comment'
        postComment.append(commentImg)
        // postComment.onclick = () => {
        //     const modalOverlay = document.querySelector('#commentModalOverlay')
        //     modalOverlay.classList.remove("disable")
        //     modalOverlay.classList.add("active")
        // }
        const postShare = document.createElement('div')
        postShare.classList.add('post-share')
        const shareImg = document.createElement('img')
        shareImg.src = './img/share.svg'
        shareImg.alt = 'share'
        postShare.append(shareImg)
        postInfoBox.append(postLike, postComment, postShare)
        const postFavorite = document.createElement('div')
        postFavorite.classList.add('post-favorite')
        const favoriteImg = document.createElement('img')
        favoriteImg.src = './img/favorite.svg'
        favoriteImg.alt = 'favorite'
        postFavorite.append(favoriteImg)
        postInfo.append(postInfoBox, postFavorite)
        const likes = document.createElement('p')
        likes.classList.add('likes')
        likes.innerHTML = '8,888 likes'
        const description = document.createElement('p')
        description.classList.add('description')
        description.innerHTML = `<span class="username">nickname</span> ${post.title}`
        const viewComments = document.createElement('p')
        viewComments.classList.add('view-comments')
        viewComments.innerHTML = 'View all 33 comments'
        const comments = document.createElement('div')
        comments.classList.add('comments')
        const comment1 = document.createElement('p')
        comment1.classList.add('comment')
        comment1.innerHTML = `<span class="username">nickname</span> Lorem ipsum dolor sit amet`
        const comment2 = document.createElement('p')
        comment2.classList.add('comment')
        comment2.innerHTML = `<span class="username">nickname</span> Lorem ipsum dolor sit amet`
        comments.append(comment1, comment2)
        const timestamp = document.createElement('p')
        timestamp.classList.add('timestamp')
        timestamp.innerHTML = '1 HOUR AGO'
        postContent.append(postInfo, likes, description, viewComments, comments, timestamp)
        const postFooter = document.createElement('div')
        postFooter.classList.add('post-footer')
        const footerProfileImg = document.createElement('img')
        footerProfileImg.src = './img/Avatar.svg'
        footerProfileImg.alt = 'Profile Picture'
        const commentInput = document.createElement('input')
        commentInput.type = 'text'
        commentInput.placeholder = 'Add a comment...'
        const postButton = document.createElement('button')
        postButton.innerHTML = 'Post'
        postFooter.append(footerProfileImg, commentInput, postButton)
        postDiv.append(postHeader, postImageDiv, postContent, postFooter)
        place.append(postDiv)
    })
}

function reloadStories(arr, place) {
    place.innerHTML = '';
    arr.forEach((story) => {
        const profileDiv = document.createElement('div')
        profileDiv.classList.add('profile')

        const profileImgDiv = document.createElement('div')
        profileImgDiv.classList.add('profile-img')
        const profileImg = document.createElement('img')
        profileImg.src = story.thumbnailUrl
        profileImg.alt = 'story-avatar'
        profileImgDiv.append(profileImg)

        const profileName = document.createElement('h4')
        profileName.classList.add('profile-name')
        profileName.innerHTML = 'nickname'

        profileDiv.append(profileImgDiv, profileName)
        place.append(profileDiv)

        profileDiv.onclick = () => {
            storyImage.src = story.thumbnailUrl
            modal.classList.add("active")
            modal.classList.remove("disable")
        }
        closeModal.onclick = () => {
            modal.classList.add("disable")
            modal.classList.remove("active")
        }
    })

    
}

function reloadSuggestion(arr, place) {
    place.innerHTML = ""
    arr.forEach((user) => {

        const userDiv = document.createElement('div')
        userDiv.classList.add('user')

        const userLeftDiv = document.createElement('div')
        userLeftDiv.classList.add('user-left')

        const userAvatarDiv = document.createElement('div')
        userAvatarDiv.classList.add('user-avatar-suggest')
        const userAvatarImg = document.createElement('img')
        userAvatarImg.src = user.thumbnailUrl
        userAvatarImg.alt = 'avatar'
        userAvatarDiv.append(userAvatarImg)

        const userInfoDiv = document.createElement('div')
        userInfoDiv.classList.add('user-info')

        const userNickDiv = document.createElement('div')
        userNickDiv.classList.add('user-nick')
        const userNickName = document.createElement('h4')
        userNickName.innerHTML = 'nickname'
        userNickDiv.append(userNickName)

        const suggestionDiv = document.createElement('div')
        suggestionDiv.classList.add('suggestion')
        const suggestionText = document.createElement('p')
        suggestionText.innerHTML = 'Suggestions For You'
        suggestionDiv.append(suggestionText)

        userInfoDiv.append(userNickDiv, suggestionDiv)
        userLeftDiv.append(userAvatarDiv, userInfoDiv)

        const followDiv = document.createElement('div')
        followDiv.classList.add('follow')
        const followButton = document.createElement('button')
        followButton.classList.add('follow')
        followButton.innerHTML = 'Follow'
        followDiv.append(followButton)

        userDiv.append(userLeftDiv, followDiv)
        place.append(userDiv)
    })
}