const imageContainer = document.getElementById('img-container')
const loader = document.getElementById('loader')
const grid = document.querySelector('.grid')
const gridBtn = document.querySelector('.gridBtn')
const listBtn = document.querySelector('.listBtn')
const lightbox = document.createElement('div')

lightbox.id = 'lightbox'
document.body.appendChild(lightbox)

let imagesLoaded = 0
let ready = false
let totalImages = 0
let photosArray = []

// API
const count = 10
const apiKey = 'b6-ERUzcZwYSUVf7wAmCb_G5KvUGD4Qkz8LLWXIusRc'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++
  if (imagesLoaded === totalImages) {
    ready = true
    loader.hidden = true
  }
}

// grid view
gridBtn.addEventListener('click', function gridView() {
  imageContainer.classList.add('grid')
  imageContainer.classList.remove('list')
})

//list view
listBtn.addEventListener('click', function listView() {
  imageContainer.classList.add('list')
  imageContainer.classList.remove('grid')
})

//display
function displayPhotos() {
  imagesLoaded = 0
  totalImages = photosArray.length
  photosArray.forEach((photo) => {
    const item = document.createElement('div')
    // item.setAttribute('href', photo.links.html)
    // item.setAttribute('target', '_blank')

    const img = document.createElement('img')
    img.setAttribute('src', photo.urls.regular)
    img.setAttribute('href', photo.links.html)
    img.setAttribute('alt', photo.alt_description)
    img.setAttribute('title', photo.alt_description)

    img.addEventListener('click', () => {
      img.classList.add('lightbox')
      lightbox.classList.add('active')
      while (lightbox.firstChild) {
        lightbox.removeChild(lightbox.firstChild)
      }

      lightbox.appendChild(img)

      const picEL = document.createElement('div')

      photosArray.forEach((e) => {
        if (e.likes) {
          picEL.innerHTML = ` <div class="pic_info"
          <span>DESCRIPTION:${e.alt_description}</span>
          <span>LIKES:${e.likes}</span>
          <span>DOWNLOADS: ${e.downloads}</span>
          <span>INSTAGRAM:${e.user.instagram_username}</span>      
          <span><a>PROFILE: ${e.links.self}</a></span>
          <span>LINK: ${e.links.html}</span>
          <span>USERNAME: ${e.user.username}</span>
        </div>`
          lightbox.appendChild(picEL)
        }
      })

      // img.appendChild('lightbox')
    })

    img.addEventListener('load', imageLoaded)
    item.appendChild(img)
    imageContainer.appendChild(item)
  })
}

lightbox.addEventListener('click', (e) => {
  if (e.target !== e.currentTarget) {
    return
  }
  lightbox.classList.remove('active')
})

// GET
async function getPhotos() {
  try {
    const response = await fetch(apiUrl)
    photosArray = await response.json()
    console.log(photosArray)
    displayPhotos()
  } catch (error) {}
}

window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false
    getPhotos()
  }
})

// On Load
getPhotos()
